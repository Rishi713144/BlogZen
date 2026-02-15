import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Loader } from "../components/Loader";
import { BACKEND_URL } from "../config";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handlePublish = async () => {
        const content = contentRef.current?.innerHTML || "";
        if (!title || !contentRef.current?.innerText.trim()) return alert("Content is missing");

        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content
            }, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (e) {
            alert("Error while publishing");
        } finally {
            setLoading(false);
        }
    }

    const execCmd = (command: string, arg?: string) => {
        document.execCommand(command, false, arg);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 font-sans">
            <Appbar />
            {loading && <Loader />}

            <div className="flex justify-center w-full pt-16 px-6">
                <div className="max-w-4xl w-full">

                    <div className="sticky top-24 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md py-4 border-y border-slate-100 dark:border-slate-800 mb-12 flex items-center justify-between transition-all duration-300">
                        <div className="flex items-center gap-2">
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
                            <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700 mx-2" />
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

                        <button
                            disabled={loading}
                            onClick={handlePublish}
                            className={`px-8 py-2.5 text-sm font-black rounded-full transition-all shadow-lg
                                ${loading
                                    ? "bg-slate-100 dark:bg-slate-700 text-slate-400"
                                    : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-105 active:scale-95 shadow-slate-200 dark:shadow-none"}`}
                        >
                            Publish Story
                        </button>
                    </div>

                    <textarea
                        rows={1}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                        className="w-full text-5xl md:text-6xl font-black outline-none placeholder:text-slate-100 dark:placeholder:text-slate-800 text-slate-900 dark:text-white bg-transparent mb-8 resize-none overflow-hidden leading-tight"
                        placeholder="Title"
                    />

                    <div
                        ref={contentRef}
                        contentEditable
                        className="w-full text-xl md:text-2xl font-serif outline-none text-slate-700 dark:text-slate-300 bg-transparent leading-relaxed min-h-[500px] empty:before:content-[attr(data-placeholder)] empty:before:text-slate-200 dark:empty:before:text-slate-700 cursor-text pb-24"
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
        className="p-2.5 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all"
        title={label}
    >
        {icon}
    </button>
);

const BoldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /></svg>
const ItalicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" /></svg>
const LinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
const QuoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5-1 4-3 5" /></svg>
