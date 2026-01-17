import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

const TABS = ["Relevant", "Latest", "Top Stories", "Architecture", "Engineering"];

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    const [selectedTab, setSelectedTab] = useState("Relevant");

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            <Appbar />
            
            <main className="max-w-screen-xl mx-auto px-6 grid grid-cols-12 gap-16 py-10">
                
                {/* Left Column: The Content Feed */}
                <section className="col-span-12 lg:col-span-8">
                    
                    {/* Dynamic Navigation Tabs */}
                    <div className="flex items-center space-x-8 border-b border-slate-100 dark:border-slate-800 mb-10 overflow-x-auto no-scrollbar">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`pb-4 text-sm font-medium transition-all relative whitespace-nowrap ${
                                    selectedTab === tab 
                                    ? "text-slate-900 dark:text-white" 
                                    : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                                }`}
                            >
                                {tab}
                                {selectedTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 dark:bg-slate-200 animate-in fade-in duration-300" />
                                )}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex flex-col space-y-12">
                            {[...Array(3)].map((_, i) => <BlogSkeleton key={i} />)}
                        </div>
                    ) : (
                        <div className="flex flex-col divide-y divide-slate-50 dark:divide-slate-800">
                            {blogs.map((blog) => (
                                <div key={blog.id} className="transition-all hover:bg-slate-50/50 dark:hover:bg-slate-800/50 -mx-4 px-4 rounded-xl">
                                    <BlogCard
                                        id={blog.id}
                                        authorName={blog.author.name || "Anonymous"}
                                        title={blog.title}
                                        content={blog.content}
                                        publishedDate={new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Right Column: Refined Sidebar */}
                <aside className="hidden lg:block lg:col-span-4 space-y-12">
                    {/* Featured Section */}
                    <section>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-6">
                            Must Read
                        </h3>
                        <div className="space-y-6">
                            <SidebarItem 
                                number="01"
                                author="Jordan Singer"
                                title="The future of interface design is generative"
                            />
                            <SidebarItem 
                                number="02"
                                author="Vercel Team"
                                title="Deploying at the Edge: A comprehensive guide"
                            />
                        </div>
                    </section>

                    {/* Tags / Topics Section */}
                    <section className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4">
                            Recommended Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {["Typescript", "React", "Next.js", "AI", "UI/UX"].map(tag => (
                                <button key={tag} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-slate-900 hover:text-slate-900 transition-all">
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </section>
                </aside>

            </main>
        </div>
    );
};

const SidebarItem = ({ number, author, title }: { number: string, author: string, title: string }) => (
    <div className="flex gap-4 items-start group cursor-pointer">
        <span className="text-2xl font-bold text-slate-200 group-hover:text-slate-900 transition-colors">{number}</span>
        <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase mb-1">{author}</p>
            <h4 className="text-sm font-bold text-slate-900 leading-tight group-hover:underline">
                {title}
            </h4>
        </div>
    </div>
);