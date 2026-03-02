import type { Route } from "./+types/home";
import { Link } from "react-router";
import Navbar from "~/components/Navbar";

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
  return (
    <main className="bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-hidden">
      <Navbar />
      {/* Hero Section with Animated Background */}
      <section className="relative  flex items-center justify-center pt-0 pb-10 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="page-heading max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center gap-2 mb-8 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-blue-300">
              AI-Powered Career Intelligence Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6 leading-tight">
            Transform Your Career with AI-Based Career Readiness and Interview
            Preparation System
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Unlock the power of AI-driven document analysis. Get real-time
            quality insights, overcome ATS barriers, and position yourself for
            success with our Career Intelligence Assistant.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/auth?next=/dashboard"
              className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Get Started - Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/upload"
              className="px-8 py-4 text-lg font-semibold text-gray-100 border-2 border-gray-500 rounded-xl hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
            >
              Try Now - Upload Documents
            </Link>
          </div>

          {/* Stats under CTA */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-gray-700">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">10K+</p>
              <p className="text-sm text-gray-400 mt-1">Documents Analyzed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">95%</p>
              <p className="text-sm text-gray-400 mt-1">Success Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-pink-400">24/7</p>
              <p className="text-sm text-gray-400 mt-1">AI Support</p>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-900/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
              Why Choose JobPsych AI?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Powered by cutting-edge AI technology, our Career Intelligence
              platform delivers comprehensive analysis with precision and
              actionable insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative bg-gradient-to-br from-blue-900/20 to-blue-900/5 rounded-2xl p-8 border border-blue-500/30 hover:border-blue-500/60 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
                <h3 className="text-2xl font-bold text-gray-100 mb-4">
                  Smart Analysis
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Our intelligent AI scans your documents for ATS compatibility,
                  identifies critical keywords, and optimizes formatting in
                  real-time for maximum impact.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-gradient-to-br from-purple-900/20 to-purple-900/5 rounded-2xl p-8 border border-purple-500/30 hover:border-purple-500/60 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
                <h3 className="text-2xl font-bold text-gray-100 mb-4">
                  Precision Scoring
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Get multi-dimensional evaluation across tone, content quality,
                  structure, and skills alignment. Our advanced metrics guide
                  you to excellence.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-gradient-to-br from-pink-900/20 to-pink-900/5 rounded-2xl p-8 border border-pink-500/30 hover:border-pink-500/60 shadow-lg hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
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
                <h3 className="text-2xl font-bold text-gray-100 mb-4">
                  Expert Guidance
                </h3>
                <p className="text-gray-300 leading-relaxed">
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
          <h2 className="text-5xl md:text-6xl font-black text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
            Three Simple Steps to Success
          </h2>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mt-4 mb-4">
                  Upload Your Documents
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Simply upload your resume, cover letter, or any professional
                  document. Our platform supports PDF, DOC, and other common
                  formats.
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-gray-600 text-4xl">→</div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-white text-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mt-4 mb-4">
                  AI Analysis
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Our advanced AI thoroughly analyzes your documents for
                  quality, impact, and ATS optimization within seconds.
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-gray-600 text-4xl">→</div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full flex items-center justify-center font-bold text-white text-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-100 mt-4 mb-4">
                  Get Insights & Improve
                </h3>
                <p className="text-gray-400 leading-relaxed">
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
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
            Powerful Features for Career Success
          </h2>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 group-hover:scale-110 transition-transform duration-300">
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
                  <h3 className="text-xl font-bold text-gray-100">
                    Real-time ATS Compatibility
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Ensure your documents pass Applicant Tracking Systems with
                    our intelligent keyword optimization.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 group-hover:scale-110 transition-transform duration-300">
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
                  <h3 className="text-xl font-bold text-gray-100">
                    Multi-Dimensional Scoring
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Get evaluated across tone, content quality, structure, and
                    skills alignment for comprehensive improvement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 group-hover:scale-110 transition-transform duration-300">
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
                  <h3 className="text-xl font-bold text-gray-100">
                    Smart Recommendations
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Receive AI-powered suggestions tailored to your profile and
                    career aspirations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 group-hover:scale-110 transition-transform duration-300">
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
                  <h3 className="text-xl font-bold text-gray-100">
                    Instant Processing
                  </h3>
                  <p className="text-gray-400 mt-2">
                    Upload and get comprehensive analysis in seconds, not hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="relative z-10 space-y-4">
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <p className="text-sm text-gray-400">Quality Score</p>
                    <p className="text-3xl font-bold text-blue-400 mt-2">
                      92/100
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <p className="text-sm text-gray-400">ATS Pass Rate</p>
                    <p className="text-3xl font-bold text-purple-400 mt-2">
                      98%
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                    <p className="text-sm text-gray-400">Career Impact</p>
                    <p className="text-3xl font-bold text-pink-400 mt-2">
                      Excellent
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-100 mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of professionals who have improved their documents
            with JobPsych AI. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth?next=/dashboard"
              className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
            </Link>
            <Link
              to="/upload"
              className="px-8 py-4 text-lg font-semibold text-gray-100 border-2 border-gray-500 rounded-xl hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
            >
              Try for Free
            </Link>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-950 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold text-gray-100 mb-4">
                JobPsych AI
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering professionals to unlock their full potential through
                intelligent document analysis.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-100 mb-4 uppercase">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-100 mb-4 uppercase">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-100 mb-4 uppercase">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
              © 2026 JobPsych AI. Your Career Intelligence Assistant. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
