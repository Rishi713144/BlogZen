import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Loader } from "../components/Loader";
import { useBlogs } from "../hooks";

const TABS = ["Relevant", "Latest", "Top Stories", "Architecture", "Engineering"];

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    const [selectedTab, setSelectedTab] = useState("Relevant");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Deterministically assign categories to blogs for demonstration
    const blogsWithData = useMemo(() => {
        return blogs.map((blog, index) => ({
            ...blog,
            isFeatured: index < 4, // Spread featured across more items
            publishedDate: new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            })
        }));
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        let result = blogsWithData;

        if (selectedTab !== "Relevant" && selectedTab !== "Latest" && selectedTab !== "Top Stories") {
            result = result.filter(b => b.category === selectedTab);
        }

        if (selectedTag) {
            result = result.filter(b => b.title.toLowerCase().includes(selectedTag.toLowerCase()) ||
                b.content.toLowerCase().includes(selectedTag.toLowerCase()) ||
                b.category?.toLowerCase() === selectedTag.toLowerCase());
        }

        if (selectedTab === "Latest") {
            // In a real app, this would be sorted by date
            return result;
        }

        return result;
    }, [blogsWithData, selectedTab, selectedTag]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-[#0a0c10]">
                <Appbar />
                <Loader />
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="flex flex-col space-y-12">
                        {[...Array(3)].map((_, i) => <BlogSkeleton key={i} />)}
                    </div>
                </div>
            </div>
        )
    }

    const mustReadBlogs = blogsWithData.filter(b => b.isFeatured).slice(0, 3);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0c10] transition-colors duration-500 selection:bg-indigo-100 dark:selection:bg-indigo-900/40">
            <Appbar />

            <main className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-16 py-16 relative">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

                {/* Left Column: The Content Feed */}
                <section className="col-span-12 lg:col-span-8">

                    {/* Dynamic Navigation Tabs */}
                    <div className="flex items-center space-x-10 border-b border-slate-100 dark:border-slate-800/50 mb-12 overflow-x-auto no-scrollbar scroll-smooth">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setSelectedTab(tab);
                                    setSelectedTag(null);
                                }}
                                className={`pb-5 text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${selectedTab === tab
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-400 dark:text-slate-600 hover:text-slate-600 dark:hover:text-slate-400"
                                    }`}
                            >
                                {tab}
                                {selectedTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-indigo-600 dark:bg-indigo-500 rounded-full animate-in fade-in zoom-in duration-300" />
                                )}
                            </button>
                        ))}
                    </div>

                    {filteredBlogs.length > 0 ? (
                        <div className="flex flex-col">
                            {filteredBlogs.map((blog) => (
                                <BlogCard
                                    key={blog.id}
                                    id={blog.id}
                                    authorName={blog.author.name || "Anonymous"}
                                    title={blog.title}
                                    content={blog.content}
                                    publishedDate={blog.publishedDate}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center space-y-4">
                            <div className="text-4xl">🔍</div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No stories found</h3>
                            <p className="text-slate-500">Try selecting a different tab or tag</p>
                            <button
                                onClick={() => { setSelectedTab("Relevant"); setSelectedTag(null); }}
                                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </section>

                {/* Right Column: Refined Sidebar */}
                <aside className="hidden lg:block lg:col-span-4 space-y-16 sticky top-32 h-fit">
                    {/* Featured Section */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                                Must Read
                            </h3>
                            <div className="w-8 h-px bg-slate-200 dark:bg-slate-800" />
                        </div>
                        <div className="space-y-10">
                            {mustReadBlogs.map((blog, idx) => (
                                <SidebarItem
                                    key={blog.id}
                                    id={blog.id}
                                    number={`0${idx + 1}`}
                                    author={blog.author.name || "Anonymous"}
                                    title={blog.title}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Tags / Topics Section */}
                    <section className="p-10 bg-slate-50/50 dark:bg-slate-900/40 rounded-4xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl shadow-xs ring-1 ring-black/5 dark:ring-white/5">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-8">
                            Recommended Topics
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {["Typescript", "React", "Next.js", "AI", "UI/UX", "Design"].map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                    className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 border ${selectedTag === tag
                                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg scale-105"
                                        : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-md"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
                            <a href="#" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors flex items-center gap-2">
                                See more topics
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                </svg>
                            </a>
                        </div>
                    </section>

                    {/* Footer Info */}
                    <footer className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest flex flex-wrap gap-x-6 gap-y-3 px-2">
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Help</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Status</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Careers</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</a>
                    </footer>
                </aside>

            </main>
        </div>
    );
};


const SidebarItem = ({ number, author, title, id }: { number: string, author: string, title: string, id: string }) => (
    <Link to={`/blog/${id}`} className="flex gap-6 items-start group cursor-pointer">
        <span className="text-3xl font-black text-slate-100 dark:text-slate-800/50 group-hover:text-indigo-600/20 transition-colors duration-500 italic">
            {number}
        </span>
        <div className="space-y-1.5">
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 shrink-0" />
                <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">{author}</p>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                {title}
            </h4>
        </div>
    </Link>
);
