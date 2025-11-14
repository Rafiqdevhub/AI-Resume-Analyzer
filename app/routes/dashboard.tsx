import type { Route } from "./+types/dashboard";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/putter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - JobPsych AI Resume Analyzer" },
    {
      name: "description",
      content:
        "View your uploaded resumes and AI analysis results. Manage your career documents and track your progress.",
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
    <main className="bg-gray-900 min-h-screen">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all duration-200 group"
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
                <span className="font-medium">Back to Home</span>
              </Link>

              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-white">
                  Resume Dashboard
                </h1>
                <p className="text-gray-400 text-sm">
                  Manage your career documents and track your progress
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-gray-800 rounded-lg px-4 py-2 border border-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300 text-sm font-medium">
                    {resumes.length} Resume{resumes.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <Link
                to="/upload"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Upload Resume</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loadingResumes && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6">
              <img
                src="/images/resume-scan-2.gif"
                className="w-32 h-32 object-cover rounded-lg"
                alt="Loading your resumes..."
              />
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Loading your resumes...
            </h3>
            <p className="text-gray-500">
              Please wait while we fetch your career documents
            </p>
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Start Your Career Journey
              </h2>
              <p className="text-gray-400 text-lg max-w-md mx-auto mb-8">
                Upload your first resume to get AI-powered insights and career
                intelligence
              </p>
            </div>

            <Link
              to="/upload"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload Your First Resume
            </Link>
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Your Resume Collection
                </h2>
                <p className="text-gray-400">
                  AI-powered career intelligence for each document
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  className="bg-gray-800 border border-gray-600 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Sort resumes by"
                >
                  <option value="recent">Most Recent</option>
                  <option value="score">Highest Score</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            <div className="grid gap-12 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="flex justify-center transform transition-all duration-200 hover:scale-105"
                >
                  <div className="w-full max-w-[420px]">
                    <ResumeCard resume={resume} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
