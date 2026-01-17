import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks";
import { useTheme } from "../context/ThemeContext";

export const Appbar = () => {
    const navigate = useNavigate();
    const { user, loading } = useUser();
    const { theme, toggleTheme } = useTheme();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };
    
    const displayName = (user && user.name && user.name.trim() !== "") ? user.name : (user?.email || "Anonymous");

    return (
        <nav className="border-b border-slate-200 dark:border-slate-700 flex justify-between items-center px-6 md:px-24 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
            {/* Logo Section */}
            <Link 
                to={'/blogs'} 
                className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white cursor-pointer"
            >
                Blogzen
            </Link>

            {/* Actions Section */}
            <div className="flex items-center gap-4 md:gap-8">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                    )}
                </button>

                {/* Secondary Action: Write */}
                <Link to={`/publish`} className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <span className="flex items-center gap-1.5 text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                        </svg>
                        <span className="hidden md:inline">Write</span>
                    </span>
                </Link>

                {/* Main Action Group */}
                <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-4 md:pl-8">
                    {/* Logout - Styled as a subtle secondary button */}
                    <button 
                        onClick={logout}
                        className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                        Sign out
                    </button>

                    {/* Profile Avatar */}
                    <div className="group relative cursor-pointer ring-offset-2 hover:ring-2 hover:ring-slate-300 dark:hover:ring-slate-600 rounded-full transition-all">
                        {!loading && <Avatar size={"big"} name={displayName} />}
                        {loading && <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>}
                    </div>
                </div>
            </div>
        </nav>
    );
}