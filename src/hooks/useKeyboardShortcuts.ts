import { useEffect } from 'react';
import { TabType } from '../types';

interface UseKeyboardShortcutsOptions {
  onSelectTab: (tab: TabType) => void;
  onToggleSearch?: () => void;
}

/**
 * Custom hook to manage global keyboard shortcuts across the application.
 *
 * Shortcuts:
 * - Ctrl/Cmd + K: Toggle Global Command Palette / Search
 * - Ctrl/Cmd + D (or Alt + D): Switch to 'DevStudio'
 * - Ctrl/Cmd + A (or Alt + A): Switch to 'AgentPlatform' (outside text inputs)
 * - Ctrl/Cmd + H (or Alt + H): Switch to 'MultiModelHub'
 */
export function useKeyboardShortcuts({ onSelectTab, onToggleSearch }: UseKeyboardShortcutsOptions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModifier = e.metaKey || e.ctrlKey || e.altKey;
      if (!isModifier) return;

      const target = e.target as HTMLElement | null;
      const isInputFocused =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      const key = e.key.toLowerCase();

      // Ctrl/Cmd + K: Command Palette
      if ((e.metaKey || e.ctrlKey) && key === 'k') {
        e.preventDefault();
        onToggleSearch?.();
        return;
      }

      // Ctrl/Cmd + D or Alt + D: DevStudio
      if (key === 'd' && (e.altKey || (!isInputFocused && (e.metaKey || e.ctrlKey)))) {
        e.preventDefault();
        onSelectTab('dev');
        return;
      }

      // Ctrl/Cmd + A or Alt + A: AgentPlatform
      // (When inside an input field, preserve standard Ctrl+A "Select All" behavior)
      if (key === 'a' && (e.altKey || (!isInputFocused && (e.metaKey || e.ctrlKey)))) {
        e.preventDefault();
        onSelectTab('agents');
        return;
      }

      // Ctrl/Cmd + H or Alt + H: MultiModelHub
      if (key === 'h' && (e.altKey || (!isInputFocused && (e.metaKey || e.ctrlKey)))) {
        e.preventDefault();
        onSelectTab('hub');
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectTab, onToggleSearch]);
}
