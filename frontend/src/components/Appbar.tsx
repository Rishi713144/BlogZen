import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks";

export const Appbar = () => {
    const navigate = useNavigate();
    const { user, loading } = useUser();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };
    
    const displayName = (user && user.name && user.name.trim() !== "") ? user.name : (user?.email || "Anonymous");

    return (
        <nav className="border-b border-slate-200 flex justify-between items-center px-6 md:px-24 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
            {/* Logo Section */}
            <Link 
                to={'/blogs'} 
                className="text-2xl font-extrabold tracking-tight text-slate-900 cursor-pointer"
            >
                Blogzen
            </Link>

            {/* Actions Section */}
            <div className="flex items-center gap-4 md:gap-8">
                {/* Secondary Action: Write */}
                <Link to={`/publish`} className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
                    <span className="flex items-center gap-1.5 text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                        <span className="hidden md:inline">Write</span>
                    </span>
                </Link>

                {/* Main Action Group */}
                <div className="flex items-center gap-4 border-l border-slate-200 pl-4 md:pl-8">
                    {/* Logout - Styled as a subtle secondary button */}
                    <button 
                        onClick={logout}
                        className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
                    >
                        Sign out
                    </button>

                    {/* Profile Avatar */}
                    <div className="group relative cursor-pointer ring-offset-2 hover:ring-2 hover:ring-slate-300 rounded-full transition-all">
                        {!loading && <Avatar size={"big"} name={displayName} />}
                        {loading && <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>}
                    </div>
                </div>
            </div>
        </nav>
    );
}