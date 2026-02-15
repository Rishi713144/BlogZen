import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="py-10 cursor-pointer group flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 order-2 md:order-1">
                    <div className="flex items-center gap-2 mb-4">
                        <Avatar name={authorName} />
                        <div className="flex items-center gap-2 text-sm">
                            <span className="font-bold text-slate-900 dark:text-white">{authorName}</span>
                            <span className="text-slate-400 dark:text-slate-500">·</span>
                            <span className="text-slate-400 dark:text-slate-500 font-medium">{publishedDate}</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors leading-tight">
                        {title}
                    </h2>

                    <div className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed line-clamp-2 mb-6 max-w-2xl">
                        {content.replace(/<[^>]+>/g, '')}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-bold uppercase tracking-wider rounded-full">
                                {`${Math.ceil(content.length / 1000)} min read`}
                            </span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-56 h-36 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50 order-1 md:order-2">
                    <span className="text-slate-300 dark:text-slate-600 font-black text-5xl select-none italic tracking-tighter">BZ</span>
                </div>
            </div>
        </Link>
    );
};

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    const initial = name.trim() ? name.trim()[0].toUpperCase() : "A";

    return (
        <div className={`relative flex items-center justify-center overflow-hidden bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 ${size === "small" ? "w-8 h-8" : "w-12 h-12"}`}>
            <span className={`font-black text-slate-600 dark:text-slate-300 ${size === "small" ? "text-xs" : "text-base"}`}>
                {initial}
            </span>
        </div>
    );
}

