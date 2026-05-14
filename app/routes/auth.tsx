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
    <main className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[#5c7a5f]/20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#7a6340]/18 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-[#b67d57]/16 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Features */}
          <div className="hidden md:flex flex-col gap-6">
            <div className="space-y-3">
              <h2 className="text-h2">
                Your Documents,
                <br />
                Improved
              </h2>
              <p className="text-lead">
                Join users improving their documents with AI-driven content
                checks, scoring, and structured feedback.
              </p>
            </div>

            <div className="space-y-4 pt-6">
              {/* Feature 1 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#5c7a5f] to-[#7a6340] transition-transform duration-300 group-hover:scale-110">
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
                  <h3 className="text-h4 transition-colors group-hover:text-[var(--color-link)]">
                    Content Quality
                  </h3>
                  <p className="mt-1 text-body">
                    Improve clarity, relevance, and overall document strength
                    with AI-powered analysis
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#7a6340] to-[#5c7a5f] transition-transform duration-300 group-hover:scale-110">
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
                  <h3 className="text-h4 transition-colors group-hover:text-[var(--color-accent)]">
                    Fast Review
                  </h3>
                  <p className="mt-1 text-body">
                    Get document insights in seconds, not hours
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#9b6c4b] to-[#b67d57] transition-transform duration-300 group-hover:scale-110">
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
                  <h3 className="text-h4 transition-colors group-hover:text-[var(--color-link)]">
                    Targeted Improvements
                  </h3>
                  <p className="mt-1 text-body">
                    Personalized guidance tailored to the content you want to
                    improve
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[var(--panel-border)] pt-8">
                <div className="text-center">
                  <p className="text-h3">10K+</p>
                  <p className="mt-1 text-caption">Documents Analyzed</p>
                </div>
                <div className="text-center">
                  <p className="text-h3">95%</p>
                  <p className="mt-1 text-caption">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-h3">4.9★</p>
                  <p className="mt-1 text-caption">User Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="w-full max-w-md mx-auto md:mx-0">
            <div className="gradient-border shadow-2xl">
              <section className="flex flex-col gap-8 rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg-2)] p-10 backdrop-blur-xl">
                <button
                  onClick={() => navigate("/")}
                  className="group flex cursor-pointer items-center gap-2 self-start text-caption transition-colors duration-200 hover:text-[var(--color-h2)]"
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
                  <span className="text-body font-medium">Back to Home</span>
                </button>

                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--card-sand)] bg-gradient-to-r from-[#5c7a5f]/15 to-[#7a6340]/15 px-4 py-2 backdrop-blur-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-accent)]"></span>
                    <span className="auth-pill-label font-semibold">
                      AI-Powered Document Analyzer
                    </span>
                  </div>

                  <div>
                    <h1 className="mb-3 text-h1">Welcome Back</h1>
                    <h2 className="mb-3 text-h3">
                      Ready to improve your documents?
                    </h2>
                    <p className="text-body">
                      Sign in to access AI-powered content scoring, quality
                      checks, and actionable recommendations
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {isLoading ? (
                    <button
                      className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#5c7a5f] to-[#7a6340] px-6 py-4 text-[var(--btn-primary-text)] cta-button-text animate-pulse"
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
                          className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#7a6340] to-[#5c7a5f] px-6 py-4 text-[var(--btn-primary-text)] cta-button-text transition-all duration-200 hover:scale-[1.02] hover:from-[#6f5938] hover:to-[#507053] hover:shadow-lg hover:shadow-[#7a6340]/25"
                          onClick={auth.signOut}
                        >
                          <span>Log Out</span>
                        </button>
                      ) : (
                        <button
                          className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#5c7a5f] to-[#7a6340] px-6 py-4 text-[var(--btn-primary-text)] cta-button-text transition-all duration-200 hover:scale-[1.02] hover:from-[#507053] hover:to-[#6f5938] hover:shadow-lg hover:shadow-[#5c7a5f]/30"
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

                <div className="space-y-4 border-t border-[var(--panel-border)] pt-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-accent)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    <div>
                      <p className="text-caption font-semibold">
                        Why users choose JobPsych AI:
                      </p>
                      <p className="mt-1 text-caption">
                        Real-time document analysis, actionable quality
                        feedback, and clear next-step recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-2 text-caption">
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
