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
    <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#171717]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#d4af37]/5 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#f5e6c8]/3 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Features */}
          <div className="hidden md:flex flex-col gap-6">
            <div className="space-y-3">
              <h2 className="text-h2 text-4xl">
                Your Documents,
                <br />
                <span className="text-[#d4af37]">Elevated with AI</span>
              </h2>
              <p className="text-lead text-base">
                Join users improving their documents with AI-driven content
                checks, scoring, and structured feedback.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              {/* Feature 1 */}
              <div className="clay-card-secondary p-4 flex gap-4 group">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#292929,#1c1c1c)] shadow-[var(--shadow-clay-sm)] border border-[rgba(245,230,200,0.08)] group-hover:scale-105 transition-transform duration-300">
                    <svg
                      className="h-6 w-6 text-[#d4af37]"
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
                  <h3 className="text-h4 text-[#f5e6c8]">Content Quality</h3>
                  <p className="mt-1 text-body text-xs leading-relaxed">
                    Improve clarity, relevance, and overall document strength
                    with AI-powered analysis
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="clay-card-secondary p-4 flex gap-4 group">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#292929,#1c1c1c)] shadow-[var(--shadow-clay-sm)] border border-[rgba(245,230,200,0.08)] group-hover:scale-105 transition-transform duration-300">
                    <svg
                      className="h-6 w-6 text-[#d4af37]"
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
                  <h3 className="text-h4 text-[#f5e6c8]">Fast Review</h3>
                  <p className="mt-1 text-body text-xs leading-relaxed">
                    Get document insights in seconds, not hours
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="clay-card-secondary p-4 flex gap-4 group">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#292929,#1c1c1c)] shadow-[var(--shadow-clay-sm)] border border-[rgba(245,230,200,0.08)] group-hover:scale-105 transition-transform duration-300">
                    <svg
                      className="h-6 w-6 text-[#d4af37]"
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
                  <h3 className="text-h4 text-[#f5e6c8]">
                    Targeted Improvements
                  </h3>
                  <p className="mt-1 text-body text-xs leading-relaxed">
                    Personalized guidance tailored to the content you want to
                    improve
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-[rgba(245,230,200,0.08)]">
                <div className="clay-card-secondary p-3 text-center">
                  <p className="text-2xl font-black text-[#d4af37]">10K+</p>
                  <p className="mt-1 text-[11px] text-[#6b7280] uppercase tracking-wider font-semibold">
                    Analyzed
                  </p>
                </div>
                <div className="clay-card-secondary p-3 text-center">
                  <p className="text-2xl font-black text-[#d4af37]">95%</p>
                  <p className="mt-1 text-[11px] text-[#6b7280] uppercase tracking-wider font-semibold">
                    Success
                  </p>
                </div>
                <div className="clay-card-secondary p-3 text-center">
                  <p className="text-2xl font-black text-[#d4af37]">4.9★</p>
                  <p className="mt-1 text-[11px] text-[#6b7280] uppercase tracking-wider font-semibold">
                    Rating
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Sign In Card */}
          <div className="w-full max-w-md mx-auto md:mx-0">
            <section className="clay-card p-8 md:p-10 flex flex-col gap-7">
              <button
                onClick={() => navigate("/")}
                className="group flex cursor-pointer items-center gap-2 self-start text-xs font-semibold text-[#6b7280] transition-colors duration-200 hover:text-[#d4af37]"
              >
                <svg
                  className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200"
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
                <span>Back to Home</span>
              </button>

              <div className="flex flex-col items-center gap-5 text-center">
                <div className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#242424,#1c1c1c)] px-4 py-1.5 shadow-[var(--shadow-clay-sm)]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37] shadow-[0_0_6px_#d4af37]"></span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5e6c8]">
                    AI-Powered Analyzer
                  </span>
                </div>

                <div>
                  <h1 className="mb-2 text-3xl font-bold text-[#f5e6c8]">
                    Welcome Back
                  </h1>
                  <p className="text-body text-xs">
                    Sign in to access AI-powered content scoring, quality
                    checks, and actionable recommendations.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {isLoading ? (
                  <button
                    className="cta-button w-full animate-pulse text-sm font-bold justify-center"
                    disabled
                  >
                    <svg
                      className="animate-spin h-5 w-5 text-[#171717]"
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
                        className="cta-button reverse w-full text-sm font-bold justify-center"
                        onClick={auth.signOut}
                      >
                        <span>Log Out</span>
                      </button>
                    ) : (
                      <button
                        className="cta-button group w-full text-sm font-bold justify-center"
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

              <div className="space-y-3 border-t border-[rgba(245,230,200,0.08)] pt-4 text-xs">
                <div className="flex items-start gap-2.5">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#d4af37]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <div>
                    <p className="font-bold text-[#f5e6c8]">
                      Why users choose JobPsych AI:
                    </p>
                    <p className="mt-0.5 text-[#6b7280] text-[11px] leading-normal">
                      Real-time document analysis, actionable quality feedback,
                      and clear next-step recommendations.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2 text-[11px] text-[#6b7280]">
                  <svg
                    className="w-3.5 h-3.5"
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
    </main>
  );
};

export default Auth;
