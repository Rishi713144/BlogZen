import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Loader } from "../components/Loader";
import { BACKEND_URL } from "../config";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Architecture");
    const [loading, setLoading] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const titleRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    const handlePublish = async () => {
        const content = contentRef.current?.innerHTML || "";
        if (!title || !contentRef.current?.innerText.trim()) return alert("Title and content are required");

        setLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content,
                category
            }, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            navigate(`/blogs`);
        } catch (e) {
            alert("Error while publishing");
        } finally {
            setLoading(false);
        }
    }

    const execCmd = (command: string, arg?: string) => {
        document.execCommand(command, false, arg);
    };

    const CATEGORIES = ["Architecture", "Engineering", "Design", "Software", "AI", "General"];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0c10] transition-colors duration-500 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/40 relative">
            <Appbar />
            {loading && <Loader />}

            {/* Decorative blurs */}
            <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-0 -z-10 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex justify-center w-full pt-20 px-6">
                <div className="max-w-4xl w-full">

                    <div className="sticky top-24 z-10 glass rounded-3xl p-3 mb-16 flex items-center justify-between transition-all duration-300 shadow-2xl shadow-black/5 dark:shadow-white/5 ring-1 ring-black/5 dark:ring-white/5">
                        <div className="flex items-center gap-1">
                            <ToolbarButton
                                onMouseDown={() => execCmd('bold')}
                                icon={<BoldIcon />}
                                label="Bold"
                            />
                            <ToolbarButton
                                onMouseDown={() => execCmd('italic')}
                                icon={<ItalicIcon />}
                                label="Italic"
                            />
                            <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2" />
                            <ToolbarButton
                                onMouseDown={() => {
                                    const url = prompt("Enter link URL:");
                                    if (url) execCmd('createLink', url);
                                }}
                                icon={<LinkIcon />}
                                label="Link"
                            />
                            <ToolbarButton
                                onMouseDown={() => execCmd('formatBlock', 'blockquote')}
                                icon={<QuoteIcon />}
                                label="Quote"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 focus:outline-none"
                            >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>

                            <button
                                disabled={loading}
                                onClick={handlePublish}
                                className={`px-8 py-3 text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl hover:scale-[1.03] active:scale-95
                                    ${loading
                                        ? "bg-slate-100 dark:bg-slate-800 text-slate-400"
                                        : "bg-slate-900 dark:bg-white text-white dark:text-slate-900"}`}
                            >
                                Publish Story
                            </button>
                        </div>
                    </div>

                    <textarea
                        ref={titleRef}
                        rows={1}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                        className="w-full text-5xl md:text-7xl font-black outline-none placeholder:text-slate-100 dark:placeholder:text-slate-800/50 text-slate-900 dark:text-white bg-transparent mb-12 resize-none overflow-hidden leading-tight tracking-tight"
                        placeholder="Title"
                    />

                    <div
                        ref={contentRef}
                        contentEditable
                        className="w-full text-xl md:text-2xl font-serif outline-none text-slate-700 dark:text-slate-300 bg-transparent leading-relaxed min-h-[500px] empty:before:content-[attr(data-placeholder)] empty:before:text-slate-200 dark:empty:before:text-slate-800/50 cursor-text pb-32"
                        data-placeholder="Tell your story..."
                    />
                </div>
            </div>
        </div>
    );
}

const ToolbarButton = ({ icon, label, onMouseDown }: { icon: any, label: string, onMouseDown: () => void }) => (
    <button
        type="button"
        onMouseDown={(e) => { e.preventDefault(); onMouseDown(); }}
        className="p-3 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-900 rounded-2xl transition-all"
        title={label}
    >
        {icon}
    </button>
);

const BoldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /></svg>
const ItalicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" /></svg>
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
const QuoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5-1 4-3 5" /></svg>
