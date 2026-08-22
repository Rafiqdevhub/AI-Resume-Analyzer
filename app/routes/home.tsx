import type { Route } from "./+types/home";
import { Link, useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/putter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "JobPsych AI - Documents Quality Improvement" },
    {
      name: "description",
      content:
        "AI-Powered document analysis and enhancement platform. Optimize your content with advanced AI technology for improved quality, clarity, and impact.",
    },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (auth.isAuthenticated) {
      navigate("/upload");
    } else {
      navigate("/auth?next=/upload");
    }
  };

  return (
    <main className="overflow-hidden bg-[#171717]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center pt-8 pb-16 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-20 left-1/3 h-96 w-96 rounded-full bg-[#d4af37]/5 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 h-80 w-80 rounded-full bg-[#f5e6c8]/3 blur-3xl" />
        </div>

        <div className="page-heading max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center gap-2 mb-8 px-5 py-2.5 rounded-full border border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#242424,#1c1c1c)] shadow-[var(--shadow-clay-sm)]">
            <span className="w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-pulse shadow-[0_0_8px_#d4af37]"></span>
            <span className="text-xs font-bold tracking-wider uppercase text-[#f5e6c8]">
              AI-Powered Career Intelligence Platform
            </span>
          </div>

          <h1 className="text-h1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] max-w-4xl mx-auto">
            Transform Your Career with AI-Based Career Readiness and Interview
            Preparation
          </h1>

          <p className="text-lead max-w-2xl mx-auto mt-6 mb-10 text-[#dfd0b5]">
            Unlock the power of AI-driven document analysis. Get real-time
            quality insights, overcome ATS barriers, and position yourself for
            success with our Career Intelligence Assistant.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleUploadClick}
            className="cta-button mb-12 text-base font-black tracking-wide"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.4}
                d="M12 4v16m8-8H4"
              />
            </svg>
            {auth.isAuthenticated
              ? "Upload Your Documents Now"
              : "Login to Get Started"}
          </button>

          {/* Stats under CTA */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8 border-t border-[rgba(245,230,200,0.08)]">
            <div className="clay-card-secondary p-5 text-center">
              <p className="text-3xl font-black text-[#d4af37]">10K+</p>
              <p className="text-xs text-[#6b7280] font-semibold tracking-wider uppercase mt-1">
                Documents Analyzed
              </p>
            </div>
            <div className="clay-card-secondary p-5 text-center">
              <p className="text-3xl font-black text-[#d4af37]">95%</p>
              <p className="text-xs text-[#6b7280] font-semibold tracking-wider uppercase mt-1">
                Success Rate
              </p>
            </div>
            <div className="clay-card-secondary p-5 text-center">
              <p className="text-3xl font-black text-[#d4af37]">24/7</p>
              <p className="text-xs text-[#6b7280] font-semibold tracking-wider uppercase mt-1">
                AI Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-h2 mb-4">Why Choose JobPsych AI?</h2>
            <p className="text-lead max-w-2xl mx-auto">
              Powered by cutting-edge AI technology, our Career Intelligence
              platform delivers comprehensive analysis with precision and
              actionable insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="clay-card group transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(145deg,#292929,#1c1c1c)] shadow-[var(--shadow-clay-sm)] border border-[rgba(245,230,200,0.08)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-[#d4af37]"
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
                <h3 className="text-h3 mb-3">Smart Analysis</h3>
                <p className="text-body text-sm leading-relaxed">
                  Our intelligent AI scans your documents for ATS compatibility,
                  identifies critical keywords, and optimizes formatting in
                  real-time for maximum impact.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="clay-card group transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(145deg,#292929,#1c1c1c)] shadow-[var(--shadow-clay-sm)] border border-[rgba(245,230,200,0.08)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-[#d4af37]"
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
                <h3 className="text-h3 mb-3">Precision Scoring</h3>
                <p className="text-body text-sm leading-relaxed">
                  Get multi-dimensional evaluation across tone, content quality,
                  structure, and skills alignment. Our advanced metrics guide
                  you to excellence.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="clay-card group transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(145deg,#292929,#1c1c1c)] shadow-[var(--shadow-clay-sm)] border border-[rgba(245,230,200,0.08)] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-[#d4af37]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-h3 mb-3">Expert Guidance</h3>
                <p className="text-body text-sm leading-relaxed">
                  Personalized recommendations aligned with your career goals.
                  Our AI analyzes your profile and delivers insights tailored to
                  your success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-h2 text-center mb-16">
            Three Simple Steps to Success
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="clay-card relative pt-10">
              <div className="absolute -top-5 left-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e5c358] to-[#c49d2c] text-base font-black text-[#171717] shadow-[var(--shadow-clay-gold)]">
                1
              </div>
              <h3 className="text-h3 mb-3">Upload Your Documents</h3>
              <p className="text-body text-sm leading-relaxed">
                Simply upload your resume, cover letter, or any professional
                document. Our platform supports PDF format with instant parser
                analysis.
              </p>
            </div>

            {/* Step 2 */}
            <div className="clay-card relative pt-10">
              <div className="absolute -top-5 left-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e5c358] to-[#c49d2c] text-base font-black text-[#171717] shadow-[var(--shadow-clay-gold)]">
                2
              </div>
              <h3 className="text-h3 mb-3">AI Analysis</h3>
              <p className="text-body text-sm leading-relaxed">
                Our advanced AI thoroughly analyzes your documents for quality,
                impact, and ATS optimization within seconds.
              </p>
            </div>

            {/* Step 3 */}
            <div className="clay-card relative pt-10">
              <div className="absolute -top-5 left-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e5c358] to-[#c49d2c] text-base font-black text-[#171717] shadow-[var(--shadow-clay-gold)]">
                3
              </div>
              <h3 className="text-h3 mb-3">Get Insights & Improve</h3>
              <p className="text-body text-sm leading-relaxed">
                Receive detailed feedback, actionable recommendations, and a
                comprehensive quality score to elevate your professional
                documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight Section */}
      <section className="py-24 bg-[#1a1a1a] border-y border-[rgba(245,230,200,0.06)]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-h2 text-center mb-16">
            Powerful Features for Career Success
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="clay-card-secondary p-5 flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#292929,#1c1c1c)] shadow-[var(--shadow-clay-sm)] border border-[rgba(245,230,200,0.08)] group-hover:scale-105 transition-transform">
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
                <div>
                  <h3 className="text-h4 text-[#f5e6c8]">
                    Real-time ATS Compatibility
                  </h3>
                  <p className="text-body text-sm mt-1">
                    Ensure your documents pass Applicant Tracking Systems with
                    our intelligent keyword optimization.
                  </p>
                </div>
              </div>

              <div className="clay-card-secondary p-5 flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#292929,#1c1c1c)] shadow-[var(--shadow-clay-sm)] border border-[rgba(245,230,200,0.08)] group-hover:scale-105 transition-transform">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-h4 text-[#f5e6c8]">
                    Multi-Dimensional Scoring
                  </h3>
                  <p className="text-body text-sm mt-1">
                    Get evaluated across tone, content quality, structure, and
                    skills alignment for comprehensive improvement.
                  </p>
                </div>
              </div>

              <div className="clay-card-secondary p-5 flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#292929,#1c1c1c)] shadow-[var(--shadow-clay-sm)] border border-[rgba(245,230,200,0.08)] group-hover:scale-105 transition-transform">
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
                <div>
                  <h3 className="text-h4 text-[#f5e6c8]">
                    Smart Recommendations
                  </h3>
                  <p className="text-body text-sm mt-1">
                    Receive AI-powered suggestions tailored to your profile and
                    career aspirations.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="clay-card p-8 space-y-4">
                <div className="clay-card-inset p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#6b7280] font-bold tracking-wider uppercase">
                      Quality Score
                    </p>
                    <p className="text-2xl font-black text-[#d4af37] mt-1">
                      92/100
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[rgba(212,175,55,0.15)] text-xs font-bold text-[#d4af37] border border-[rgba(212,175,55,0.3)]">
                    Elite
                  </span>
                </div>
                <div className="clay-card-inset p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#6b7280] font-bold tracking-wider uppercase">
                      ATS Pass Rate
                    </p>
                    <p className="text-2xl font-black text-[#d4af37] mt-1">
                      98%
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[rgba(212,175,55,0.15)] text-xs font-bold text-[#d4af37] border border-[rgba(212,175,55,0.3)]">
                    Optimal
                  </span>
                </div>
                <div className="clay-card-inset p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#6b7280] font-bold tracking-wider uppercase">
                      Career Impact
                    </p>
                    <p className="text-2xl font-black text-[#f5e6c8] mt-1">
                      Excellent
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[rgba(245,230,200,0.1)] text-xs font-bold text-[#f5e6c8] border border-[rgba(245,230,200,0.2)]">
                    Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(245,230,200,0.08)] py-16 bg-[#171717]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-h4 mb-4 font-bold text-[#f5e6c8]">
                JobPsych
              </h3>
              <p className="text-body text-sm">
                Empowering professionals to unlock their full potential through
                intelligent document analysis.
              </p>
            </div>
            <div>
              <p className="footer-heading mb-4 uppercase text-xs font-bold tracking-widest text-[#d4af37]">
                Product
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-[#6b7280] transition-colors hover:text-[#d4af37]"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#6b7280] transition-colors hover:text-[#d4af37]"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#6b7280] transition-colors hover:text-[#d4af37]"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="footer-heading mb-4 uppercase text-xs font-bold tracking-widest text-[#d4af37]">
                Company
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-[#6b7280] transition-colors hover:text-[#d4af37]"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#6b7280] transition-colors hover:text-[#d4af37]"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#6b7280] transition-colors hover:text-[#d4af37]"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="footer-heading mb-4 uppercase text-xs font-bold tracking-widest text-[#d4af37]">
                Legal
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-[#6b7280] transition-colors hover:text-[#d4af37]"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#6b7280] transition-colors hover:text-[#d4af37]"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[#6b7280] transition-colors hover:text-[#d4af37]"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[rgba(245,230,200,0.06)] pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-caption text-xs text-center md:text-left mb-4 md:mb-0">
              © 2026 JobPsych AI. Your Career Intelligence Assistant. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
