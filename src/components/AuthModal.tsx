import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithPhoneNumber,
  signInAnonymously,
  RecaptchaVerifier,
  ConfirmationResult
} from 'firebase/auth';
import { auth } from '../firebase';
import { Sparkles, Mail, Lock, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function AuthModal({ isOpen }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [authMode, setAuthMode] = useState<'email' | 'phone'>('email');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInAnonymously(auth);
    } catch (err: any) {
      setError(err.message || 'Guest sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {}
      });
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    setError('');
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-xl p-4 overflow-y-auto">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md bg-slate-900/90 border border-white/15 rounded-[24px] shadow-2xl overflow-hidden backdrop-blur-2xl">
        
        {/* Header */}
        <div className="px-6 pt-8 pb-6 text-center bg-gradient-to-b from-indigo-950/40 via-purple-950/20 to-transparent border-b border-white/10 relative">
          <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-600/30 mb-4 border border-white/20">
            <Sparkles className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Nova AI Power</h2>
          <p className="text-xs text-indigo-300/80 font-medium mt-1">
            Access the Ultimate AI Workspace & Enterprise Digital Toolbox
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex border-b border-white/10 bg-slate-950/40 px-6">
          <button
            type="button"
            onClick={() => { setAuthMode('email'); setError(''); }}
            className={`flex-1 py-3 text-xs font-semibold border-b-2 transition-all ${
              authMode === 'email' 
                ? 'border-indigo-500 text-indigo-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Email & Password
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('phone'); setError(''); }}
            className={`flex-1 py-3 text-xs font-semibold border-b-2 transition-all ${
              authMode === 'phone' 
                ? 'border-indigo-500 text-indigo-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Phone Authentication
          </button>
        </div>

        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 text-xs bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl">
              {error}
            </div>
          )}

          {authMode === 'email' ? (
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/80 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/80 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-50 border border-white/20"
              >
                <span>{isSignUp ? 'Create Workspace Account' : 'Sign In to Workspace'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {!confirmationResult ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone Number (with Country Code)</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 555-019-2834"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-950/80 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div id="recaptcha-container"></div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-50 border border-white/20"
                  >
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Enter 6-digit Code</label>
                    <input
                      type="text"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full px-4 py-2.5 text-center tracking-widest text-lg font-mono bg-slate-950/80 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 text-white placeholder-slate-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center space-x-2 text-sm disabled:opacity-50 border border-white/20"
                  >
                    <span>Verify & Sign In</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}

          {authMode === 'email' && (
            <>
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-mono uppercase tracking-wider">Or continue with</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="py-2.5 px-3 bg-slate-950 hover:bg-slate-900 border border-white/10 hover:border-white/20 rounded-xl text-xs font-semibold text-slate-200 transition-all flex items-center justify-center space-x-2 shadow-md"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span className="truncate">Google Login</span>
                </button>

                <button
                  type="button"
                  onClick={handleAnonymousSignIn}
                  disabled={loading}
                  className="py-2.5 px-3 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/30 hover:border-indigo-400 rounded-xl text-xs font-semibold text-indigo-200 transition-all flex items-center justify-center space-x-2 shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="truncate">Instant Guest Mode</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
                </button>
              </div>
            </>
          )}

          <div className="pt-4 border-t border-white/10 flex items-center justify-center space-x-1.5 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Secured by Firebase Authentication & Firestore</span>
          </div>
        </div>

      </div>
    </div>
  );
}
