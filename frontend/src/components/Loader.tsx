
export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-[9999]">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-20 h-20 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-slate-900 dark:border-t-white animate-spin"></div>

        {/* Inner ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-800 border-b-slate-600 dark:border-b-slate-400 animate-spin-slow"></div>

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-900 dark:bg-white rounded-full animate-pulse-fast"></div>
      </div>

      <div className="absolute mt-32 text-slate-500 dark:text-slate-400 font-medium tracking-widest text-xs uppercase animate-pulse">
        Blogzen
      </div>

      <style>{`
                @keyframes spin-slow {
                    from { transform: translate(-50%, -50%) rotate(360deg); }
                    to { transform: translate(-50%, -50%) rotate(0deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 2s linear infinite;
                }
                @keyframes pulse-fast {
                    0%, 100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.5; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
                }
                .animate-pulse-fast {
                    animation: pulse-fast 1s ease-in-out infinite;
                }
            `}</style>
    </div>
  );
};
