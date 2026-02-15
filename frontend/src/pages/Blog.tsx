import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Loader } from "../components/Loader";
import { useBlog } from "../hooks";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });

    if (loading) {
        return (
            <div>
                <Appbar />
                <Loader />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
                <Appbar />
                <div className="h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center px-4">
                    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Blog not found</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs">The story you're looking for doesn't exist or has been removed.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <FullBlog blog={blog} />
        </div>
    );
}
