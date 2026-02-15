
export const BlogSkeleton = () => {
    return (
        <div role="status" className="animate-pulse py-10 flex flex-col md:flex-row gap-8 items-start border-b border-slate-50 dark:border-slate-800/50">
            <div className="flex-1 order-2 md:order-1 w-full">
                <div className="flex items-center gap-2 mb-4">
                    <div className="h-8 w-8 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-24"></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-16"></div>
                </div>

                <div className="h-8 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4 w-3/4"></div>
                <div className="space-y-3 mb-6">
                    <div className="h-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg w-full"></div>
                    <div className="h-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg w-5/6"></div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded-full w-20"></div>
                </div>
            </div>

            <div className="w-full md:w-56 h-36 bg-slate-100 dark:bg-slate-800 rounded-2xl order-1 md:order-2"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};
