import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/putter";

export const meta = () => [
  { title: "Sign In | JobPsych AI Documents Quality Improvement" },
  {
    name: "description",
    content:
      "Sign in to JobPsych AI to improve document quality with feedback on content, structure, clarity, and ATS readiness.",
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
    <main className="bg-gradient-to-b from-gray-900 via-gray-900 to-black min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Features */}
          <div className="hidden md:flex flex-col gap-6">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Your Documents,
                <br />
                Improved
              </h2>
              <p className="text-lg text-gray-300">
                Join users improving their documents with AI-driven content
                checks, scoring, and structured feedback.
              </p>
            </div>

            <div className="space-y-4 pt-6">
              {/* Feature 1 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-100 group-hover:text-blue-400 transition-colors">
                    Content Quality
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Improve clarity, relevance, and overall document strength
                    with AI-powered analysis
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-100 group-hover:text-purple-400 transition-colors">
                    Fast Review
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Get document insights in seconds, not hours
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-100 group-hover:text-pink-400 transition-colors">
                    Targeted Improvements
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Personalized guidance tailored to the content you want to
                    improve
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-gray-700">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">10K+</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Documents Analyzed
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">95%</p>
                  <p className="text-xs text-gray-400 mt-1">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-400">4.9★</p>
                  <p className="text-xs text-gray-400 mt-1">User Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="w-full max-w-md mx-auto md:mx-0">
            <div className="gradient-border shadow-2xl">
              <section className="flex flex-col gap-8 bg-gray-800/80 backdrop-blur-xl rounded-2xl p-10 border border-gray-700/50">
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

                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                    <span className="text-sm font-semibold text-blue-300">
                      AI-Powered Document Analyzer
                    </span>
                  </div>

                  <div>
                    <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-3">
                      Welcome Back
                    </h1>
                    <h2 className="text-lg text-gray-200 mb-3">
                      Ready to improve your documents?
                    </h2>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Sign in to access AI-powered content scoring, quality
                      checks, and actionable recommendations
                    </p>
                  </div>
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
                          className="w-full py-4 px-6 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-xl text-white font-semibold text-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
                          onClick={auth.signOut}
                        >
                          <span>Log Out</span>
                        </button>
                      ) : (
                        <button
                          className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-[1.02] cursor-pointer group"
                          onClick={auth.signIn}
                        >
                          <svg
                            className="w-5 h-5 group-hover:scale-110 transition-transform"
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

                <div className="space-y-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    <div>
                      <p className="text-xs font-semibold text-gray-300">
                        Why users choose JobPsych AI:
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Real-time document analysis, actionable quality
                        feedback, and clear next-step recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2">
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
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
