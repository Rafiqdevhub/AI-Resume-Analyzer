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
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#e5c358] to-[#c49d2c] flex items-center justify-center text-[#171717] font-black text-sm shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),2px_2px_6px_rgba(0,0,0,0.5)]">
          J
        </div>
        <p className="text-h4 font-bold tracking-tight text-[#f5e6c8] group-hover:text-[#d4af37] transition-colors">
          JobPsych
        </p>
      </Link>
      <div className="flex items-center gap-6">
        {auth.isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="text-[#d4af37] font-semibold text-sm transition-all hover:text-[#f5e6c8] hover:scale-105"
            >
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/auth?next=/dashboard"
              className="primary-button w-fit text-sm font-bold"
            >
              Login
            </Link>
          </>
        )}
        {auth.isAuthenticated && auth.user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleUserMenu}
              className="flex items-center gap-3 px-3.5 py-2 rounded-full border border-[rgba(245,230,200,0.08)] shadow-[var(--shadow-clay-sm)] hover:border-[rgba(212,175,55,0.3)] transition-all duration-200 cursor-pointer bg-[linear-gradient(145deg,#242424,#1c1c1c)]"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-[#171717] text-sm font-black bg-gradient-to-br from-[#e5c358] to-[#c49d2c] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.35)]">
                {auth.user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-[#f5e6c8]">
                  {auth.user.email || auth.user.username}
                </span>
                <span className="text-[11px] text-[#6b7280]">Account</span>
              </div>
              <svg
                className={`w-4 h-4 text-[#6b7280] transition-transform duration-200 ${
                  showUserMenu ? "rotate-180 text-[#d4af37]" : ""
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
              <div className="absolute right-0 mt-3 w-64 rounded-2xl shadow-[var(--shadow-clay-lg)] border border-[rgba(245,230,200,0.09)] py-2 z-50 bg-[linear-gradient(145deg,#242424,#1a1a1a)]">
                <div className="px-4 py-3 border-b border-[rgba(245,230,200,0.08)]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#171717] text-sm font-black bg-gradient-to-br from-[#e5c358] to-[#c49d2c] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.35)]">
                      {auth.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#f5e6c8]">
                        {auth.user.email || auth.user.username}
                      </p>
                      <p className="text-xs text-[#6b7280]">Logged in</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-[#6b7280]">
                    <div className="flex justify-between">
                      <span>Username:</span>
                      <span className="font-medium text-[#f5e6c8]">
                        {auth.user.username}
                      </span>
                    </div>
                    {auth.user.email && (
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium text-[#f5e6c8]">
                          {auth.user.email}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>User ID:</span>
                      <span className="font-medium text-[#6b7280]">
                        {auth.user.uuid.slice(0, 8)}...
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full cursor-pointer px-4 py-2.5 text-left text-sm font-medium text-[#fca5a5] transition-colors duration-150 hover:bg-[rgba(245,230,200,0.05)] rounded-lg mx-1"
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
