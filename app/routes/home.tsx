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
    <main className="overflow-hidden">
      <Navbar />
      {/* Hero Section with Animated Background */}
      <section className="relative  flex items-center justify-center pt-0 pb-10 overflow-hidden">
        {/* Animated gradient background */}
        <div className="page-heading max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center gap-2 mb-8 px-4 py-2 bg-[var(--card-primary)] rounded-full border border-[var(--card-sand)] backdrop-blur-sm">
            <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse"></span>
            <span className="text-caption font-semibold">
              AI-Powered Career Intelligence Platform
            </span>
          </div>

          <h1 className="text-h1 drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]">
            Transform Your Career with AI-Based Career Readiness and Interview
            Preparation System
          </h1>

          <p className="text-lead max-w-3xl mx-auto mb-12">
            Unlock the power of AI-driven document analysis. Get real-time
            quality insights, overcome ATS barriers, and position yourself for
            success with our Career Intelligence Assistant.
          </p>

          {/* CTA Button */}
          <button
            onClick={handleUploadClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 mb-8 bg-gradient-to-r from-[#5c7a5f] to-[#7a6340] hover:from-[#507053] hover:to-[#6f5938] text-[var(--btn-primary-text)] cta-button-text rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
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
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            {auth.isAuthenticated
              ? "Upload Your Documents Now"
              : "Login to Get Started"}
          </button>

          {/* Stats under CTA */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-[var(--panel-border)]">
            <div className="text-center">
              <p className="text-h3">10K+</p>
              <p className="text-caption mt-1">Documents Analyzed</p>
            </div>
            <div className="text-center">
              <p className="text-h3">95%</p>
              <p className="text-caption mt-1">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-h3">24/7</p>
              <p className="text-caption mt-1">AI Support</p>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Why Choose Us Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-h2 mb-6">Why Choose JobPsych AI?</h2>
            <p className="text-lead max-w-3xl mx-auto">
              Powered by cutting-edge AI technology, our Career Intelligence
              platform delivers comprehensive analysis with precision and
              actionable insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#c5b59a] hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5c7a5f]/8 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-[#5c7a5f] to-[#7a6340] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
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
                <h3 className="text-h3 mb-4">Smart Analysis</h3>
                <p className="text-body">
                  Our intelligent AI scans your documents for ATS compatibility,
                  identifies critical keywords, and optimizes formatting in
                  real-time for maximum impact.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#c5b59a] hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7a6340]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-[#7a6340] to-[#9a7d53] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
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
                <h3 className="text-h3 mb-4">Precision Scoring</h3>
                <p className="text-body">
                  Get multi-dimensional evaluation across tone, content quality,
                  structure, and skills alignment. Our advanced metrics guide
                  you to excellence.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg)] p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#c5b59a] hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#b67d57]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-[#9b6c4b] to-[#b67d57] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-white"
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
                <h3 className="text-h3 mb-4">Expert Guidance</h3>
                <p className="text-body">
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
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-h2 text-center mb-20">
            Three Simple Steps to Success
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative">
              <div className="rounded-2xl p-8 border border-[var(--panel-border)] bg-[var(--panel-bg)] h-full">
                <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#5c7a5f] to-[#7a6340] text-lg font-bold text-white">
                  1
                </div>
                <h3 className="text-h3 mt-4 mb-4">Upload Your Documents</h3>
                <p className="text-body">
                  Simply upload your resume, cover letter, or any professional
                  document. Our platform supports PDF, DOC, and other common
                  formats.
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-[var(--color-secondary)] text-4xl">→</div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="rounded-2xl p-8 border border-[var(--panel-border)] bg-[var(--panel-bg)] h-full">
                <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#7a6340] to-[#9b6c4b] text-lg font-bold text-white">
                  2
                </div>
                <h3 className="text-h3 mt-4 mb-4">AI Analysis</h3>
                <p className="text-body">
                  Our advanced AI thoroughly analyzes your documents for
                  quality, impact, and ATS optimization within seconds.
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-[var(--color-secondary)] text-4xl">→</div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="rounded-2xl p-8 border border-[var(--panel-border)] bg-[var(--panel-bg)] h-full">
                <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#9b6c4b] to-[#b67d57] text-lg font-bold text-white">
                  3
                </div>
                <h3 className="text-h3 mt-4 mb-4">Get Insights & Improve</h3>
                <p className="text-body">
                  Receive detailed feedback, actionable recommendations, and a
                  comprehensive quality score to elevate your professional
                  documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Highlight Section */}
      <section className="py-24 bg-[var(--card-linen)]">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-h2 text-center mb-20">
            Powerful Features for Career Success
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#5c7a5f] to-[#7a6340] transition-transform duration-300 group-hover:scale-110">
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
                <div>
                  <h3 className="text-h4">Real-time ATS Compatibility</h3>
                  <p className="text-body mt-2">
                    Ensure your documents pass Applicant Tracking Systems with
                    our intelligent keyword optimization.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#7a6340] to-[#9a7d53] transition-transform duration-300 group-hover:scale-110">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-h4">Multi-Dimensional Scoring</h3>
                  <p className="text-body mt-2">
                    Get evaluated across tone, content quality, structure, and
                    skills alignment for comprehensive improvement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#9b6c4b] to-[#b67d57] transition-transform duration-300 group-hover:scale-110">
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
                <div>
                  <h3 className="text-h4">Smart Recommendations</h3>
                  <p className="text-body mt-2">
                    Receive AI-powered suggestions tailored to your profile and
                    career aspirations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#6d8a70] to-[#5c7a5f] transition-transform duration-300 group-hover:scale-110">
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
                <div>
                  <h3 className="text-h4">Instant Processing</h3>
                  <p className="text-body mt-2">
                    Upload and get comprehensive analysis in seconds, not hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-[var(--panel-bg)] rounded-2xl p-8 border border-[var(--panel-border)]">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#5c7a5f]/10 rounded-full blur-2xl"></div>
                <div className="relative z-10 space-y-4">
                  <div className="bg-[var(--panel-bg)] rounded-xl p-4 border border-[var(--panel-border)]">
                    <p className="text-caption">Quality Score</p>
                    <p className="text-h3 mt-2">92/100</p>
                  </div>
                  <div className="bg-[var(--panel-bg)] rounded-xl p-4 border border-[var(--panel-border)]">
                    <p className="text-caption">ATS Pass Rate</p>
                    <p className="text-h3 mt-2">98%</p>
                  </div>
                  <div className="bg-[var(--panel-bg)] rounded-xl p-4 border border-[var(--panel-border)]">
                    <p className="text-caption">Career Impact</p>
                    <p className="mt-2 text-h3">Excellent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-[var(--panel-border)] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-h4 mb-4">JobPsych</h3>
              <p className="text-body">
                Empowering professionals to unlock their full potential through
                intelligent document analysis.
              </p>
            </div>
            <div>
              <p className="footer-heading mb-4 uppercase">Product</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-body transition-colors hover:text-[var(--color-link)]"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body transition-colors hover:text-[var(--color-link)]"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body transition-colors hover:text-[var(--color-link)]"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="footer-heading mb-4 uppercase">Company</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-body transition-colors hover:text-[var(--color-link)]"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body transition-colors hover:text-[var(--color-link)]"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body transition-colors hover:text-[var(--color-link)]"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="footer-heading mb-4 uppercase">Legal</p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-body transition-colors hover:text-[var(--color-link)]"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body transition-colors hover:text-[var(--color-link)]"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-body transition-colors hover:text-[var(--color-link)]"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--panel-border)] pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-caption text-center md:text-left mb-4 md:mb-0">
              © 2026 JobPsych AI. Your Career Intelligence Assistant. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
