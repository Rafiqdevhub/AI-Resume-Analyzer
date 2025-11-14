import { Link, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { usePuterStore } from "~/lib/putter";

const Navbar = () => {
  const { auth } = usePuterStore();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="text-2xl font-bold text-gradient">JobPsych AI</p>
      </Link>
      <div className="flex items-center gap-6">
        {auth.isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="text-gray-200 hover:text-gray-100 transition-colors"
            >
              Dashboard
            </Link>
            <Link to="/upload" className="primary-button w-fit">
              Upload Resume
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/upload"
              className="text-gray-200 hover:text-gray-100 transition-colors"
            >
              Try Now
            </Link>
            <Link to="/auth?next=/dashboard" className="primary-button w-fit">
              Login
            </Link>
          </>
        )}
        {auth.isAuthenticated && auth.user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleUserMenu}
              className="flex items-center gap-3 px-3 py-2 bg-gray-900/80 rounded-full border border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                {auth.user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-100">
                  {auth.user.email || auth.user.username}
                </span>
                <span className="text-xs text-gray-400">Account</span>
              </div>
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  showUserMenu ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-600 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {auth.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-100">
                        {auth.user.email || auth.user.username}
                      </p>
                      <p className="text-xs text-gray-300">Logged in</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span>Username:</span>
                      <span className="font-medium">{auth.user.username}</span>
                    </div>
                    {auth.user.email && (
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium">{auth.user.email}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>User ID:</span>
                      <span className="font-medium text-gray-300">
                        {auth.user.uuid.slice(0, 8)}...
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-600 mt-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/50 transition-colors duration-150 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
