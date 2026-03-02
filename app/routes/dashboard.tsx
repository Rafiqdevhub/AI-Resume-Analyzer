import type { Route } from "./+types/dashboard";
import ResumeCard from "~/components/ResumeCard";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/putter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - JobPsych AI Documents Analyzer" },
    {
      name: "description",
      content:
        "View your uploaded documents and AI analysis results. Manage your career documents and track your progress.",
    },
  ];
}

export default function Dashboard() {
  const { auth, isLoading, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/dashboard");
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const loadResumes = async () => {
        setLoadingResumes(true);
        const resumes = (await kv.list("resume:*", true)) as KVItem[];
        const parsedResumes = resumes
          ?.filter((resume) => resume.value && resume.value.trim() !== "")
          ?.map((resume) => JSON.parse(resume.value) as Resume);
        setResumes(parsedResumes || []);
        setLoadingResumes(false);
      };
      loadResumes();
    }
  }, [auth.isAuthenticated, kv]);

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <main className="bg-gradient-to-b from-gray-900 via-gray-900 to-black min-h-screen">
      {/* Header with animated background */}
      <div className="relative border-b border-gray-700 bg-gray-900/50 backdrop-blur-md">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            {/* Back button and header */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start gap-6">
                <Link
                  to="/"
                  className="group flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 mt-1"
                >
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transform group-hover:-translate-x-1 transition-all duration-200"
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
                </Link>

                <div className="flex flex-col">
                  <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                    Documents Dashboard
                  </h1>
                  <p className="text-gray-400 text-sm mt-2">
                    Manage your career documents and track your progress
                  </p>
                </div>
              </div>

              <Link
                to="/upload"
                className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
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
                <span>Upload Documents</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-6">
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-900/10 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                <p className="text-blue-300 text-sm font-semibold">
                  Total Documents
                </p>
                <p className="text-3xl font-bold text-blue-400 mt-2">
                  {resumes.length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                <p className="text-purple-300 text-sm font-semibold">
                  Average Score
                </p>
                <p className="text-3xl font-bold text-purple-400 mt-2">
                  {resumes.length > 0
                    ? Math.round(
                        (resumes.reduce(
                          (acc, r) => acc + ((r as any)?.score || 0),
                          0,
                        ) /
                          resumes.length) *
                          10,
                      ) / 10
                    : "0"}
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-900/30 to-pink-900/10 rounded-xl p-4 border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300">
                <p className="text-pink-300 text-sm font-semibold">
                  Last Uploaded
                </p>
                <p className="text-lg font-bold text-pink-400 mt-2">
                  {resumes.length > 0
                    ? new Date(
                        (resumes[resumes.length - 1] as any)?.createdAt ||
                          Date.now(),
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-20 animate-pulse"></div>
              <img
                src="/images/resume-scan-2.gif"
                className="relative w-40 h-40 object-cover rounded-2xl border border-gray-700"
                alt="Loading your documents..."
              />
            </div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
              Loading your documents...
            </h3>
            <p className="text-gray-400 text-center max-w-md">
              We're fetching your career documents and preparing intelligent
              analysis
            </p>
            <div className="mt-8 flex gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce bounce-delay-0"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce bounce-delay-200"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce bounce-delay-400"></div>
            </div>
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-3xl"></div>
            <div className="relative text-center py-32 px-8">
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
                Start Your Career Journey
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                Upload your first professional documents to unlock AI-powered
                insights, get comprehensive quality analysis, and receive
                personalized career intelligence recommendations.
              </p>

              <Link
                to="/upload"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-3xl hover:shadow-purple-500/50 transform hover:scale-105"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Upload Your First Documents
              </Link>
            </div>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Your Documents Collection
                </h2>
                <p className="text-gray-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  {resumes.length} document{resumes.length !== 1 ? "s" : ""}{" "}
                  ready for career boost
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500/50 text-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 font-medium"
                  aria-label="Sort documents by"
                >
                  <option value="recent">Most Recent</option>
                  <option value="score">Highest Score</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 auto-rows-max">
              {resumes.map((resume, index) => (
                <div
                  key={resume.id}
                  className="group transform transition-all duration-300 hover:-translate-y-2 fadeInUp"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="relative">
                      <ResumeCard resume={resume} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .bounce-delay-0 {
          animation-delay: 0s;
        }
        
        .bounce-delay-200 {
          animation-delay: 0.2s;
        }
        
        .bounce-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </main>
  );
}
