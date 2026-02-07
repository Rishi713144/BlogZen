
export const Quote = () => {
  return <div className="bg-white/10 dark:bg-slate-950/20 h-screen flex justify-center flex-col backdrop-blur-[2px] border-l border-white/10 transition-colors duration-300">
    <div className="flex justify-center">
      <div className="max-w-xl p-8 bg-white/5 dark:bg-slate-800/20 rounded-3xl backdrop-blur-md border border-white/10">
        <div className="text-3xl font-bold dark:text-white italic leading-tight">
          "The support team went above and beyond to address my concerns. The blogging experience here is truly state-of-the-art."
        </div>
        <div className="max-w-md text-xl font-bold text-left mt-6 dark:text-blue-400 text-blue-600">
          Jules Winfield
        </div>
        <div className="max-w-md text-sm font-medium text-slate-500 dark:text-slate-400">
          CEO | Acme Corp
        </div>
      </div>
    </div>
  </div>
}