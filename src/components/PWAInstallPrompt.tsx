'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt after a small delay
      setTimeout(() => setShowPrompt(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleClose = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[99999] bg-onyx border border-gold/30 rounded-lg p-4 shadow-2xl max-w-sm flex gap-4 animate-in slide-in-from-bottom-5">
      <div className="bg-gold/10 p-3 rounded-full h-fit">
        <Download className="text-gold w-6 h-6" />
      </div>
      <div>
        <h4 className="text-gold font-serif text-sm font-bold mb-1">Install SAM Dossier</h4>
        <p className="text-slate-300 text-xs mb-3">Install this platform to your device for a native app experience and offline capabilities.</p>
        <div className="flex gap-2">
          <button onClick={handleInstallClick} className="bg-gold text-onyx px-4 py-1.5 rounded text-xs font-bold hover:bg-gold-light transition">
            Install App
          </button>
          <button onClick={handleClose} className="text-slate-400 px-4 py-1.5 text-xs hover:text-white transition">
            Not Now
          </button>
        </div>
      </div>
      <button onClick={handleClose} className="absolute top-2 right-2 text-slate-500 hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
