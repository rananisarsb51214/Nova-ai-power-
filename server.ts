import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for Gemini AI Proxy
app.post("/api/ai/generate", async (req, res) => {
  try {
    const { prompt, model = "gemini-2.0-flash", systemInstruction } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Model fallback sequence if rate limit / quota exhausted is encountered
    const candidateModels = [model, "gemini-2.0-flash-lite", "gemini-1.5-flash"].filter((v, i, a) => a.indexOf(v) === i);
    let lastError = null;

    for (const m of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: m,
          contents: prompt,
          config: systemInstruction ? { systemInstruction } : undefined,
        });
        if (response && response.text) {
          return res.json({ text: response.text, modelUsed: m });
        }
      } catch (err: any) {
        lastError = err;
        const isQuota = err.status === 429 || err.message?.includes("RESOURCE_EXHAUSTED") || err.message?.includes("429");
        if (!isQuota) {
          throw err; // throw non-quota errors immediately
        }
        console.warn(`Quota limit on model ${m}, trying next fallback model...`);
      }
    }

    // If all models hit free tier quota, return graceful message with rate limit info
    return res.json({
      text: `⚡ **Google AI Studio Quota Notice**: The free tier request quota limit for model requests has temporarily been reached. Please wait ~30-60 seconds before retrying, or check your Google AI Studio plan quota.\n\n*Your query was:* "${prompt.substring(0, 100)}${prompt.length > 100 ? '...' : ''}"`,
      isRateLimited: true
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    const isRateLimit = error.status === 429 || error.message?.includes("RESOURCE_EXHAUSTED") || error.message?.includes("429");
    const friendlyMsg = isRateLimit 
      ? "Google AI Studio API quota/rate limit reached. Free tier requests are temporarily throttled. Please wait ~1 minute before retrying or check your Google AI Studio plan."
      : (error.message || "Failed to generate AI response");
    res.status(isRateLimit ? 429 : 500).json({ error: friendlyMsg, isRateLimit, details: error.message });
  }
});

// Diagnostic endpoint to test Google AI Studio GEMINI_API_KEY status
app.all("/api/ai/test-key", async (req, res) => {
  const startTime = Date.now();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "MY_GEMINI_API_KEY") {
    return res.status(400).json({
      success: false,
      configured: false,
      message: "GEMINI_API_KEY is missing or set to placeholder in .env / process.env.",
      keyPreview: apiKey ? `${apiKey.substring(0, 4)}...` : "None"
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const modelName = "gemini-2.0-flash";
    
    const response = await ai.models.generateContent({
      model: modelName,
      contents: "Respond with exactly: 'Google AI Studio API Key is active and working perfectly!'",
    });

    const latencyMs = Date.now() - startTime;
    return res.json({
      success: true,
      configured: true,
      modelTested: modelName,
      latencyMs: latencyMs,
      keyPreview: `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`,
      output: response.text?.trim() || "No response text returned",
      message: "Google AI Studio API Key test successful!"
    });
  } catch (error: any) {
    const latencyMs = Date.now() - startTime;
    console.error("API Key Test Failure:", error);
    const isRateLimit = error.status === 429 || error.message?.includes("RESOURCE_EXHAUSTED") || error.message?.includes("429");
    const msg = isRateLimit
      ? "API Key is valid, but the free tier daily/per-minute request quota was reached. Please retry in 1 minute."
      : (error.message || "Failed to authenticate or generate with Gemini API key");
    return res.status(isRateLimit ? 429 : 500).json({
      success: false,
      configured: true,
      latencyMs,
      keyPreview: `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`,
      error: msg,
      isRateLimit,
      details: error.status || error.code || "RESOURCE_EXHAUSTED"
    });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Nova AI Power server running on http://localhost:${PORT}`);
  });
}

startServer();
