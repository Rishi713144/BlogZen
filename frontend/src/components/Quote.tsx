
export const Quote = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 h-screen flex justify-center flex-col px-12 transition-colors duration-300">
      <div className="max-w-2xl">
        <div className="w-16 h-1 bg-slate-200 dark:bg-slate-800 mb-10" />

        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-8 italic">
          "The blogging experience here is truly state-of-the-art. It feels like the future of digital storytelling."
        </h2>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center">
            <span className="text-slate-400 dark:text-slate-600 font-bold">JW</span>
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 dark:text-white">
              Jules Winfield
            </div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              CEO | Acme Corp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
