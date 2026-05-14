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
        <p className="text-h4">JobPsych</p>
      </Link>
      <div className="flex items-center gap-6">
        {auth.isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="text-[var(--color-link)] transition-colors hover:text-[var(--color-h3)]"
            >
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link to="/auth?next=/dashboard" className="primary-button w-fit">
              Login
            </Link>
          </>
        )}
        {auth.isAuthenticated && auth.user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleUserMenu}
              className="flex items-center gap-3 px-3 py-2 rounded-full border border-[var(--panel-border)] shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer bg-[var(--panel-bg)]"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold bg-gradient-to-r from-[#5c7a5f] to-[#7a6340]">
                {auth.user.username.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-body font-medium">
                  {auth.user.email || auth.user.username}
                </span>
                <span className="text-caption">Account</span>
              </div>
              <svg
                className={`w-4 h-4 text-[var(--color-secondary)] transition-transform duration-200 ${
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
              <div className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg border border-[var(--panel-border)] py-1 z-50 bg-[var(--panel-bg)]">
                <div className="px-4 py-3 border-b border-[var(--panel-border)]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold bg-gradient-to-r from-[#5c7a5f] to-[#7a6340]">
                      {auth.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-body font-medium">
                        {auth.user.email || auth.user.username}
                      </p>
                      <p className="text-caption">Logged in</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-[var(--color-secondary)]">
                    <div className="flex justify-between">
                      <span>Username:</span>
                      <span className="font-medium text-[var(--color-body)]">
                        {auth.user.username}
                      </span>
                    </div>
                    {auth.user.email && (
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium text-[var(--color-body)]">
                          {auth.user.email}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>User ID:</span>
                      <span className="font-medium text-[var(--color-secondary)]">
                        {auth.user.uuid.slice(0, 8)}...
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[var(--panel-border)] mt-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full cursor-pointer px-4 py-2 text-left text-body transition-colors duration-150 hover:bg-[var(--card-primary)]"
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
