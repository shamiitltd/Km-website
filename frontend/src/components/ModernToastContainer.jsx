import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModernToastContainer() {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const handleAddToast = (e) => {
      const newToast = e.detail;
      if (!newToast) return;

      setToasts((prev) => {
        // Keep at most 3 simultaneous toasts to prevent screen clutter
        const filtered = prev.filter((t) => t.id !== newToast.id);
        return [newToast, ...filtered].slice(0, 3);
      });

      if (newToast.duration > 0) {
        setTimeout(() => {
          removeToast(newToast.id);
        }, newToast.duration);
      }
    };

    window.addEventListener('km:show-toast', handleAddToast);
    return () => window.removeEventListener('km:show-toast', handleAddToast);
  }, [removeToast]);

  return (
    <aside aria-label="Notifications" className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[999999] flex flex-col items-center gap-3 w-full max-w-lg px-4 pointer-events-none">
      <AnimatePresence mode="sync">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: -24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            className={`pointer-events-auto w-full relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-2xl border transition-all ${
              toast.type === 'success'
                ? 'bg-gradient-to-r from-gray-950/95 via-emerald-950/95 to-gray-950/95 border-emerald-500/40 text-white shadow-emerald-950/40'
                : toast.type === 'audio'
                ? 'bg-gradient-to-r from-gray-950/95 via-emerald-950/95 to-[#1a3826]/95 border-[#D4AF37]/50 text-white shadow-emerald-950/40'
                : toast.type === 'voice'
                ? 'bg-gradient-to-r from-gray-950/95 via-[#1b3b28]/95 to-gray-950/95 border-emerald-400/40 text-white shadow-emerald-950/40'
                : toast.type === 'error'
                ? 'bg-gradient-to-r from-gray-950/95 via-rose-950/95 to-gray-950/95 border-rose-500/40 text-white shadow-rose-950/40'
                : toast.type === 'warning'
                ? 'bg-gradient-to-r from-gray-950/95 via-amber-950/95 to-gray-950/95 border-amber-500/40 text-white shadow-amber-950/40'
                : 'bg-gradient-to-r from-gray-950/95 via-gray-900/95 to-gray-950/95 border-gray-700/50 text-white'
            }`}
          >
            {/* Ambient Background Glow */}
            <div
              className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-2xl pointer-events-none ${
                toast.type === 'success' || toast.type === 'audio' || toast.type === 'voice'
                  ? 'bg-emerald-500/20'
                  : toast.type === 'error'
                  ? 'bg-rose-500/20'
                  : 'bg-amber-500/20'
              }`}
            />

            <div className="flex items-start gap-3.5 relative z-10">
              
              {/* Icon / Animation Badge */}
              <div className="shrink-0 mt-0.5">
                {toast.type === 'success' && (
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-black text-lg shadow-inner">
                    ✓
                  </div>
                )}

                {toast.type === 'audio' && (
                  <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] font-bold text-lg shadow-inner">
                    🔊
                  </div>
                )}

                {toast.type === 'voice' && (
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 font-bold text-lg animate-pulse">
                    🎤
                  </div>
                )}

                {toast.type === 'error' && (
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400 font-black text-lg">
                    ✕
                  </div>
                )}

                {toast.type === 'warning' && (
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-black text-lg">
                    ⚠️
                  </div>
                )}

                {toast.type === 'info' && (
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-bold text-base">
                    ℹ
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div className="flex-1 min-w-0 pr-6 text-left">
                {toast.title && (
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-black text-white tracking-wide">
                      {toast.title}
                    </h4>
                    {toast.type === 'audio' && (
                      <span className="text-[10px] font-mono font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full">
                        Hindi Audio
                      </span>
                    )}
                    {toast.type === 'voice' && (
                      <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                        Listening
                      </span>
                    )}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                  {toast.message}
                </p>

                {/* Animated Audio Equalizer Visualizer */}
                {(toast.audioWave || toast.voiceWave) && (
                  <div className="flex items-center gap-1 mt-2.5 pt-2 border-t border-white/10">
                    {[0.6, 1.2, 0.4, 0.9, 1.5, 0.7, 1.1, 0.5, 1.3, 0.8].map((speed, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ['4px', '16px', '6px', '18px', '4px'] }}
                        transition={{
                          repeat: Infinity,
                          duration: speed,
                          ease: 'easeInOut'
                        }}
                        className={`w-1 rounded-full ${
                          toast.type === 'audio' ? 'bg-[#D4AF37]' : 'bg-emerald-400'
                        }`}
                      />
                    ))}
                    <span className="text-[11px] font-mono text-gray-400 ml-2">
                      {toast.type === 'audio' ? 'Live Playback Simulation' : 'Multi-Dialect Audio Stream'}
                    </span>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Dismiss Notification"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

            </div>

            {/* Countdown Progress Bar */}
            {toast.duration > 0 && (
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: toast.duration / 1000, ease: 'linear' }}
                className={`absolute bottom-0 left-0 h-0.5 ${
                  toast.type === 'success'
                    ? 'bg-emerald-400'
                    : toast.type === 'audio'
                    ? 'bg-[#D4AF37]'
                    : toast.type === 'error'
                    ? 'bg-rose-400'
                    : toast.type === 'warning'
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
              />
            )}

          </motion.div>
        ))}
      </AnimatePresence>
    </aside>
  );
}
