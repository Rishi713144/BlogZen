import type { Blog } from "../hooks";
import { useUser } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const { user } = useUser();
    const authorName = blog.author?.name || "Anonymous";
    const isAuthor = user?.id === blog.author?.id;

    return (
        <div className="bg-white dark:bg-[#0a0c10] min-h-screen transition-colors duration-500 selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
            <Appbar />

            <main className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-20 grid grid-cols-12 gap-16 relative">

                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 -z-10 w-125 h-125 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-40 left-0 -z-10 w-100 h-100 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

                {/* Main Content */}
                <article className="col-span-12 lg:col-span-8 space-y-12">
                    <header className="space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-indigo-100 dark:border-indigo-900/50">
                                Premium Story
                            </span>
                            <div className="h-px w-8 bg-slate-200 dark:bg-slate-800" />
                            <time className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </time>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight">
                            {blog.title}
                        </h1>

                        <div className="flex items-center justify-between py-10 border-y border-slate-100 dark:border-slate-800/50">
                            <div className="flex items-center gap-5">
                                <Avatar size="big" name={authorName} />
                                <div className="space-y-1">
                                    <div className="text-lg font-black text-slate-900 dark:text-white leading-tight">{authorName}</div>
                                    <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center gap-3">
                                        <span>{`${Math.ceil(blog.content.length / 1000)} min read`}</span>
                                        <span className="text-slate-300 dark:text-slate-700">·</span>
                                        {!isAuthor && (
                                            <span className="text-indigo-600 dark:text-indigo-400 cursor-pointer hover:text-indigo-700 transition-colors">Follow Author</span>
                                        )}
                                        {isAuthor && (
                                            <span className="text-slate-400 dark:text-slate-500 italic">Author</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                    </svg>
                                </button>
                                <button className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </header>

                    <div
                        className="prose prose-slate dark:prose-invert prose-2xl max-w-none
                        text-slate-800 dark:text-slate-300 font-medium leading-relaxed
                        [&>p]:mb-8 [&>h2]:text-4xl [&>h2]:font-black [&>h2]:mt-16 [&>h2]:mb-8 [&>h2]:tracking-tight
                        [&>blockquote]:border-l-[6px] [&>blockquote]:border-indigo-600 dark:[&>blockquote]:border-indigo-500
                        [&>blockquote]:pl-10 [&>blockquote]:italic [&>blockquote]:text-3xl [&>blockquote]:font-black
                        [&>blockquote]:bg-slate-50 dark:[&>blockquote]:bg-white/5 [&>blockquote]:py-10 [&>blockquote]:rounded-r-4xl"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    <footer className="pt-20 border-t border-slate-100 dark:border-slate-800/50">
                        <div className="flex flex-wrap gap-3">
                            {["Architecture", "Engineering", "Tech", "Design"].map(tag => (
                                <span key={tag} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </footer>
                </article>

                {/* Sidebar */}
                <aside className="col-span-12 lg:col-span-4 h-fit sticky top-32 space-y-16">
                    <section className="p-10 bg-slate-50/50 dark:bg-slate-900/40 rounded-4xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-2xl shadow-xs ring-1 ring-black/5 dark:ring-white/5">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-10">
                            Author Insights
                        </h3>
                        <div className="flex flex-col items-center text-center space-y-6">
                            <div className="relative">
                                <Avatar size="big" name={authorName} />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full shadow-sm" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {authorName}
                                </h4>
                                <p className="text-sm font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                                    Thought Leader
                                </p>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 font-medium leading-[1.6] text-[15px]">
                                Dedicated to exploring the intersection of deep technology and human-centric design patterns.
                            </p>
                            <div className="w-full pt-4 space-y-4">
                                {!isAuthor && (
                                    <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:scale-[1.03] transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5">
                                        Follow
                                    </button>
                                )}
                                {isAuthor && (
                                    <button
                                        onClick={() => { }}
                                        className="w-full py-4 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-2xl font-black uppercase tracking-widest text-[11px] border border-indigo-100 dark:border-indigo-900/50"
                                    >
                                        Edit Story
                                    </button>
                                )}
                                <button className="w-full py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-50 dark:hover:bg-slate-750 transition-all">
                                    View Full Bio
                                </button>
                            </div>
                        </div>
                    </section>
                </aside>

            </main>
        </div>
    );
}
