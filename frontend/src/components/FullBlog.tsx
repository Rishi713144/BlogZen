import type { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

const funnyCatchPhrases = [
    "Thinking about the Roman Empire at least once a day.",
    "Turning coffee into code since 2015.",
    "Writer, dreamer, and occasional napper.",
    "Exploring the universe, one word at a time.",
    "Here to share ideas and steal your cookies.",
    "Just another digital wanderer.",
    "Debugging life, one post at a time.",
    "Simplicity is the ultimate sophistication.",
    "Capturing moments in a world of chaos.",
    "Believer in magic, code, and late-night snacks."
];

const getCatchPhrase = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % funnyCatchPhrases.length);
    return funnyCatchPhrases[index];
}

export const FullBlog = ({ blog }: { blog: Blog }) => {
    const authorName = blog.author?.name || "Anonymous";

    return (
        <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors duration-300">
            <Appbar />
            <main className="max-w-screen-xl mx-auto px-6 md:px-16 lg:px-24 py-16 grid grid-cols-12 gap-16">

                {/* Main Content */}
                <article className="col-span-12 lg:col-span-8">
                    <header className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-bold uppercase tracking-widest rounded-full">
                                Featured Story
                            </span>
                            <span className="text-slate-400 dark:text-slate-600">·</span>
                            <time className="text-sm font-medium text-slate-500">
                                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </time>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-8">
                            {blog.title}
                        </h1>

                        <div className="flex items-center gap-4 py-8 border-y border-slate-100 dark:border-slate-800">
                            <Avatar size="big" name={authorName} />
                            <div>
                                <div className="font-bold text-slate-900 dark:text-white">{authorName}</div>
                                <div className="text-sm text-slate-500 flex items-center gap-2">
                                    <span>{`${Math.ceil(blog.content.length / 1000)} min read`}</span>
                                    <span>·</span>
                                    <span className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline">Follow Author</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div
                        className="prose prose-slate dark:prose-invert prose-xl max-w-none 
                        text-slate-800 dark:text-slate-300 font-medium leading-relaxed
                        [&>p]:mb-6 [&>h2]:text-3xl [&>h2]:font-black [&>h2]:mt-12 [&>h2]:mb-6
                        [&>blockquote]:border-l-4 [&>blockquote]:border-slate-900 dark:[&>blockquote]:border-white
                        [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-2xl [&>blockquote]:font-bold"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                </article>

                {/* Sidebar */}
                <aside className="col-span-12 lg:col-span-4">
                    <div className="sticky top-32 space-y-12">
                        <section className="p-8 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800 backdrop-blur-sm">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-8">
                                About the Author
                            </h3>
                            <div className="flex flex-col items-center text-center">
                                <Avatar size="big" name={authorName} />
                                <h4 className="text-xl font-black text-slate-900 dark:text-white mt-4 mb-2">
                                    {authorName}
                                </h4>
                                <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">
                                    {getCatchPhrase(authorName)}
                                </p>
                                <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold hover:scale-[1.02] transition-transform shadow-lg">
                                    View Profile
                                </button>
                            </div>
                        </section>

                        <section className="px-4">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-6">
                                Share Story
                            </h3>
                            <div className="flex gap-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer">
                                        <div className="w-5 h-5 bg-current opacity-20 rounded-sm" />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </aside>

            </main>
        </div>
    );
}
