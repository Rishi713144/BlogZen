
export const BlogSkeleton = () => {
    return (
        <div role="status" className="animate-pulse py-12 flex flex-col md:flex-row gap-10 items-start border-b border-slate-100/50 dark:border-slate-800/50 last:border-0">
            <div className="flex-1 order-2 md:order-1 w-full space-y-4">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-slate-200/50 dark:bg-slate-800 rounded-full"></div>
                    <div className="space-y-2">
                        <div className="h-3 bg-slate-200/50 dark:bg-slate-800 rounded-full w-24"></div>
                        <div className="h-2 bg-slate-100/50 dark:bg-slate-800/50 rounded-full w-16 uppercase tracking-widest"></div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="h-8 bg-slate-200/50 dark:bg-slate-800 rounded-xl w-3/4"></div>
                    <div className="h-8 bg-slate-200/50 dark:bg-slate-800 rounded-xl w-1/2"></div>
                </div>

                <div className="space-y-3 pt-2">
                    <div className="h-4 bg-slate-100/50 dark:bg-slate-800/30 rounded-lg w-full"></div>
                    <div className="h-4 bg-slate-100/50 dark:bg-slate-800/30 rounded-lg w-5/6"></div>
                    <div className="h-4 bg-slate-100/50 dark:bg-slate-800/30 rounded-lg w-4/6"></div>
                </div>

                <div className="flex justify-between items-center pt-4">
                    <div className="h-6 bg-slate-100/50 dark:bg-slate-800/50 rounded-full w-24"></div>
                    <div className="flex gap-4">
                        <div className="h-5 w-5 bg-slate-100/50 dark:bg-slate-800/50 rounded-md"></div>
                        <div className="h-5 w-5 bg-slate-100/50 dark:bg-slate-800/50 rounded-md"></div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-64 aspect-16/10 bg-slate-200/50 dark:bg-slate-800 rounded-2xl order-1 md:order-2"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};
