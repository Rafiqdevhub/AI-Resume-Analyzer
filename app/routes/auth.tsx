import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/putter";

export const meta = () => [
  { title: "Sign In | JobPsych AI Career Intelligence" },
  {
    name: "description",
    content:
      "Sign in to access your JobPsych AI Career Intelligence Assistant and unlock personalized resume analysis",
  },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const nextUrl =
    new URLSearchParams(location.search).get("next") || "/dashboard";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(nextUrl);
  }, [auth.isAuthenticated, nextUrl, navigate]);

  return (
    <main className="bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="gradient-border shadow-2xl">
          <section className="flex flex-col gap-8 bg-gray-800 rounded-2xl p-10">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors duration-200 self-start group cursor-pointer"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="text-sm font-medium">Back to Home</span>
            </button>

            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-gray-100">Welcome to JobPsych ATS</h1>
              <h2 className="text-gray-300 text-lg">
                Sign In to Access Your Career Intelligence Assistant
              </h2>
              <p className="text-sm text-gray-400 max-w-sm">
                Unlock personalized resume analysis, ATS optimization, and
                career insights powered by advanced AI technology.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {isLoading ? (
                <button
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-3 animate-pulse"
                  disabled
                >
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Signing you in...</span>
                </button>
              ) : (
                <>
                  {auth.isAuthenticated ? (
                    <button
                      className="w-full py-4 px-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl text-white font-semibold text-lg hover:opacity-90 transition-all duration-200 hover:shadow-lg cursor-pointer"
                      onClick={auth.signOut}
                    >
                      <span>Log Out</span>
                    </button>
                  ) : (
                    <button
                      className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-3 hover:opacity-90 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                      onClick={auth.signIn}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      <span>Sign In with Puter</span>
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-4 border-t border-gray-700">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Secure authentication powered by Puter</span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Auth;
