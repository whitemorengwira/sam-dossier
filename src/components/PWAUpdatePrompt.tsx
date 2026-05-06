'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, X } from 'lucide-react';

export default function PWAUpdatePrompt() {
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Check if there's already a waiting service worker
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (!reg) return;

        if (reg.waiting) {
          setWaitingWorker(reg.waiting);
          setShowReload(true);
        }

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // A new service worker is installed and waiting to take over
              setWaitingWorker(newWorker);
              setShowReload(true);
            }
          });
        });
      });

      // Handle the reload when skipWaiting is done
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    } else {
      // Fallback just reload
      window.location.reload();
    }
    setShowReload(false);
  };

  const handleClose = () => {
    setShowReload(false);
  };

  if (!showReload) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[99999] bg-onyx border border-gold/30 rounded-lg p-4 shadow-2xl max-w-sm flex gap-4 animate-in slide-in-from-bottom-5">
      <div className="bg-gold/10 p-3 rounded-full h-fit">
        <RefreshCw className="text-gold w-6 h-6 animate-spin-slow" />
      </div>
      <div>
        <h4 className="text-gold font-serif text-sm font-bold mb-1">Update Available</h4>
        <p className="text-slate-300 text-xs mb-3">A new version of SAM Dossier is available. Update now to see the latest changes.</p>
        <div className="flex gap-2">
          <button onClick={handleUpdate} className="bg-gold text-onyx px-4 py-1.5 rounded text-xs font-bold hover:bg-gold-light transition flex items-center gap-2">
            <RefreshCw className="w-3 h-3" /> Update Now
          </button>
          <button onClick={handleClose} className="text-slate-400 px-4 py-1.5 text-xs hover:text-white transition">
            Later
          </button>
        </div>
      </div>
      <button onClick={handleClose} className="absolute top-2 right-2 text-slate-500 hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
