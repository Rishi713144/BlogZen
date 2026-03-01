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
    // Generate a selection of high-quality tech/lifestyle images
    const fallbackImages = [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800"
    ];
    const displayImage = fallbackImages[Math.abs(id.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)) % fallbackImages.length];

    return (
        <Link to={`/blog/${id}`}>
            <div className="py-12 cursor-pointer group flex flex-col md:flex-row gap-10 items-start border-b border-slate-100/50 dark:border-slate-800/50 last:border-0 transition-all">
                <div className="flex-1 order-2 md:order-1 space-y-4">
                    <div className="flex items-center gap-3">
                        <Avatar name={authorName} />
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 dark:text-white leading-none">{authorName}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-1">{publishedDate}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight tracking-tight">
                            {title}
                        </h2>

                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-3 max-w-2xl text-[15px]">
                            {content.replace(/<[^>]+>/g, '')}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-200/50 dark:border-slate-700/50">
                                {`${Math.ceil(content.length / 1000)} min read`}
                            </span>
                            <span className="text-slate-300 dark:text-slate-700">·</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Selected for you</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                            </button>
                            <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-64 aspect-16/10 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl md:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 order-1 md:order-2 relative">
                    <img
                        src={displayImage}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </div>
        </Link>
    );
};

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    const initial = name.trim() ? name.trim()[0].toUpperCase() : "A";

    return (
        <div className={`relative flex items-center justify-center overflow-hidden bg-linear-to-br from-indigo-500 to-purple-600 rounded-full shadow-inner ${size === "small" ? "w-8 h-8" : "w-12 h-12"}`}>
            <span className={`font-black text-white ${size === "small" ? "text-xs" : "text-base"}`}>
                {initial}
            </span>
            <div className="absolute inset-0 border border-white/20 rounded-full" />
        </div>
    );
}
