import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../hooks";
import { Avatar } from "./BlogCard";

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
        <nav className="glass sticky top-0 z-50 transition-all duration-300 px-6 md:px-16 lg:px-24">
            <div className="max-w-screen-2xl mx-auto flex justify-between items-center py-4">
                {/* Logo Section */}
                <Link
                    to={'/blogs'}
                    className="group flex items-center gap-2 cursor-pointer"
                >
                    <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                        <span className="text-white dark:text-slate-900 font-black text-xl">B</span>
                    </div>
                    <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white ml-1">
                        blog<span className="text-slate-500">zen</span>
                    </span>
                </Link>

                {/* Actions Section */}
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-slate-600 dark:text-slate-300"
                        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        )}
                    </button>

                    {/* Secondary Action: Write */}
                    <Link to={`/publish`} className="hidden sm:flex items-center px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full hover:scale-105 transition-all shadow-md">
                        <span className="flex items-center gap-2 text-sm font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                            Write
                        </span>
                    </Link>

                    {/* Main Action Group */}
                    <div className="flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-800">
                        {/* Logout */}
                        <button
                            onClick={logout}
                            className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                        </button>

                        {/* Profile Avatar */}
                        <div className="relative group ring-2 ring-slate-100 dark:ring-slate-800 rounded-full transition-all p-0.5">
                            {!loading && <Avatar size={"big"} name={displayName} />}
                            {loading && <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
