import type { Route } from "./+types/dashboard";
import ResumeCard from "~/components/ResumeCard";
import { Link, useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
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
  const [sortBy, setSortBy] = useState<"recent" | "score" | "company">(
    "recent",
  );

  const getCreatedAt = (resume: Resume) => {
    const maybeCreatedAt = (resume as Resume & { createdAt?: string | number })
      .createdAt;
    if (!maybeCreatedAt) return 0;
    const timestamp = new Date(maybeCreatedAt).getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
  };

  const averageScore =
    resumes.length > 0
      ? Math.round(
          (resumes.reduce(
            (acc, resume) => acc + resume.feedback.overallScore,
            0,
          ) /
            resumes.length) *
            10,
        ) / 10
      : 0;

  const topScore = resumes.reduce(
    (max, resume) => Math.max(max, resume.feedback.overallScore),
    0,
  );

  const lastUploadedLabel =
    resumes.length > 0
      ? new Date(
          resumes
            .map((resume) => getCreatedAt(resume))
            .sort((a, b) => b - a)[0] || Date.now(),
        ).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      : "N/A";

  const visibleResumes = useMemo(() => {
    const items = [...resumes];

    if (sortBy === "score") {
      return items.sort(
        (a, b) => b.feedback.overallScore - a.feedback.overallScore,
      );
    }

    if (sortBy === "company") {
      return items.sort((a, b) => {
        const aLabel = a.companyName || a.jobTitle || "General Documents";
        const bLabel = b.companyName || b.jobTitle || "General Documents";
        return aLabel.localeCompare(bLabel);
      });
    }

    return items.sort((a, b) => getCreatedAt(b) - getCreatedAt(a));
  }, [resumes, sortBy]);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/dashboard");
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

  useEffect(() => {
    if (!auth.isAuthenticated) return;

    const loadResumes = async () => {
      setLoadingResumes(true);

      try {
        const allResumes = (await kv.list("resume:*", true)) as KVItem[];
        const parsedResumes = allResumes
          ?.filter((resume) => resume.value && resume.value.trim() !== "")
          ?.map((resume) => JSON.parse(resume.value) as Resume);

        setResumes(parsedResumes || []);
      } finally {
        setLoadingResumes(false);
      }
    };

    loadResumes();
  }, [auth.isAuthenticated, kv]);

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#090f14] text-slate-100">
      <div className="relative overflow-hidden border-b border-cyan-900/40">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-28 left-1/4 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute top-28 right-1/4 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.08),transparent_45%),radial-gradient(circle_at_80%_25%,rgba(251,146,60,0.10),transparent_40%),linear-gradient(180deg,#0a1118_0%,#090f14_80%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pt-12">
          <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-5">
              <Link
                to="/"
                className="group mt-1 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/20 bg-slate-900/70 shadow-[0_0_0_1px_rgba(34,211,238,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-x-0.5 hover:border-cyan-300/60 hover:bg-slate-800"
              >
                <svg
                  className="h-5 w-5 text-cyan-200 transition-all duration-300 group-hover:text-cyan-100"
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

              <div>
                <p className="mb-2 inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
                  Command Center
                </p>
                <h1 className="display-font text-4xl font-black leading-tight text-white md:text-6xl">
                  Career Documents
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                  A focused workspace to monitor resume quality, track momentum,
                  and navigate your next applications faster.
                </p>
              </div>
            </div>

            <Link
              to="/upload"
              className="group inline-flex items-center gap-3 self-start rounded-2xl border border-orange-200/20 bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 font-semibold text-white shadow-[0_12px_32px_-16px_rgba(251,146,60,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-400 hover:to-amber-400 hover:shadow-[0_18px_40px_-15px_rgba(251,146,60,0.9)]"
            >
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90"
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="dash-stat-card">
              <p className="dash-stat-label">Total Documents</p>
              <p className="dash-stat-value">{resumes.length}</p>
            </div>
            <div className="dash-stat-card">
              <p className="dash-stat-label">Average Score</p>
              <p className="dash-stat-value">{averageScore}</p>
            </div>
            <div className="dash-stat-card">
              <p className="dash-stat-label">Top Score</p>
              <p className="dash-stat-value">{topScore}</p>
            </div>
            <div className="dash-stat-card">
              <p className="dash-stat-label">Last Uploaded</p>
              <p className="dash-stat-value text-2xl">{lastUploadedLabel}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {loadingResumes && (
          <div className="rounded-3xl border border-cyan-900/50 bg-slate-900/55 px-6 py-20 text-center backdrop-blur-md md:px-10">
            <div className="mx-auto mb-8 flex w-fit flex-col items-center">
              <div className="absolute h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl" />
              <img
                src="/images/resume-scan-2.gif"
                className="relative h-32 w-32 rounded-2xl border border-cyan-200/20 object-cover"
                alt="Loading your documents..."
              />
            </div>
            <h3 className="mb-2 text-2xl font-black text-white md:text-3xl">
              Loading your documents...
            </h3>
            <p className="mx-auto max-w-md text-slate-300">
              We are syncing your collection and preparing the latest insights.
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <div className="pulse-stagger h-2.5 w-2.5 rounded-full bg-cyan-300" />
              <div className="pulse-stagger delay-150 h-2.5 w-2.5 rounded-full bg-orange-300" />
              <div className="pulse-stagger delay-300 h-2.5 w-2.5 rounded-full bg-cyan-200" />
            </div>
          </div>
        )}

        {!loadingResumes && resumes.length === 0 && (
          <div className="relative overflow-hidden rounded-3xl border border-cyan-800/30 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-cyan-950/40 px-8 py-24 text-center md:px-12">
            <div className="absolute right-10 top-8 h-24 w-24 rounded-full border border-cyan-300/20" />
            <div className="absolute bottom-12 left-12 h-16 w-16 rounded-full border border-orange-300/30" />
            <div className="mx-auto mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-cyan-500/25 blur-2xl" />
                <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-teal-500">
                  <svg
                    className="h-14 w-14 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.6}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <h2 className="display-font mb-4 text-4xl font-black text-white md:text-5xl">
              Build Your First Analysis Set
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-slate-300">
              Upload your first resume package to get score breakdowns,
              structural feedback, and job-targeted improvement signals.
            </p>

            <Link
              to="/upload"
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-500 px-9 py-4 text-lg font-bold text-white shadow-[0_20px_42px_-18px_rgba(34,211,238,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-teal-400"
            >
              <svg
                className="h-6 w-6"
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
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-cyan-900/35 bg-slate-900/50 p-5 backdrop-blur-sm md:p-6">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="mb-1 text-3xl font-black text-white">
                    Your Documents Collection
                  </h2>
                  <p className="flex items-center gap-2 text-slate-300">
                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    {resumes.length} document{resumes.length !== 1 ? "s" : ""}{" "}
                    ready for career boost
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label
                    htmlFor="sort-documents"
                    className="text-sm text-slate-300"
                  >
                    Sort by
                  </label>
                  <select
                    id="sort-documents"
                    className="rounded-xl border border-cyan-300/20 bg-slate-900/80 px-4 py-2.5 text-slate-100 outline-none transition-all duration-300 hover:border-cyan-200/40 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-400/35"
                    aria-label="Sort documents by"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target.value as "recent" | "score" | "company",
                      )
                    }
                  >
                    <option value="recent">Most Recent</option>
                    <option value="score">Highest Score</option>
                    <option value="company">Company A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid auto-rows-max gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {visibleResumes.map((resume, index) => (
                <div
                  key={resume.id}
                  className={`reveal-card group ${
                    index % 3 === 0
                      ? "delay-0"
                      : index % 3 === 1
                        ? "delay-120"
                        : "delay-240"
                  }`}
                >
                  <div className="relative rounded-2xl">
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-orange-400/0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
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
        @keyframes revealCard {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes pulseStagger {
          0%,
          100% {
            opacity: 0.35;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-4px);
          }
        }

        .dash-stat-card {
          border: 1px solid rgba(34, 211, 238, 0.2);
          background: linear-gradient(
            145deg,
            rgba(15, 23, 42, 0.92) 0%,
            rgba(17, 24, 39, 0.75) 60%,
            rgba(17, 24, 39, 0.45) 100%
          );
          border-radius: 1rem;
          padding: 1.1rem 1.2rem;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03),
            0 18px 40px -28px rgba(34, 211, 238, 0.55);
          transition: transform 240ms ease, border-color 240ms ease;
        }

        .dash-stat-card:hover {
          transform: translateY(-2px);
          border-color: rgba(34, 211, 238, 0.45);
        }

        .dash-stat-label {
          color: rgba(226, 232, 240, 0.86);
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
          font-weight: 700;
        }

        .dash-stat-value {
          color: #ffffff;
          font-size: 1.9rem;
          font-weight: 850;
          line-height: 1;
          font-family: "Sora", "Manrope", sans-serif;
        }

        .display-font {
          font-family: "Sora", "Manrope", sans-serif;
        }

        .reveal-card {
          opacity: 0;
          animation: revealCard 620ms cubic-bezier(0.2, 0.9, 0.25, 1) forwards;
        }

        .pulse-stagger {
          animation: pulseStagger 900ms ease-in-out infinite;
        }

        .delay-150 {
          animation-delay: 150ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-0 {
          animation-delay: 0ms;
        }

        .delay-120 {
          animation-delay: 120ms;
        }

        .delay-240 {
          animation-delay: 240ms;
        }
      `}</style>
    </main>
  );
}
