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
    <main className="min-h-screen bg-[#171717]">
      <div className="relative overflow-hidden border-b border-[rgba(245,230,200,0.08)]">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-28 left-1/4 h-80 w-80 rounded-full bg-[#d4af37]/5 blur-3xl" />
          <div className="absolute top-28 right-1/4 h-72 w-72 rounded-full bg-[#f5e6c8]/3 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pt-12">
          <div className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-5">
              <Link
                to="/"
                className="group mt-1 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#242424,#1c1c1c)] shadow-[var(--shadow-clay-sm)] transition-all duration-300 hover:-translate-x-1 hover:border-[rgba(212,175,55,0.3)]"
                title="Back to Home"
              >
                <svg
                  className="h-5 w-5 text-[#dfd0b5] transition-all duration-300 group-hover:text-[#d4af37]"
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
                <p className="mb-2 inline-flex items-center rounded-full border border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#242424,#1c1c1c)] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37] shadow-[var(--shadow-clay-sm)]">
                  Command Center
                </p>
                <h1 className="text-h1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  Career Documents
                </h1>
                <p className="mt-3 max-w-2xl text-body text-sm leading-relaxed">
                  A focused workspace to monitor resume quality, track momentum,
                  and navigate your next applications faster.
                </p>
              </div>
            </div>

            <Link
              to="/upload"
              className="cta-button self-start text-sm font-bold"
            >
              <svg
                className="h-5 w-5"
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
          <div className="clay-card px-6 py-20 text-center md:px-10">
            <div className="mx-auto mb-8 flex w-fit flex-col items-center">
              <img
                src="/images/resume-scan-2.gif"
                className="relative h-32 w-32 rounded-3xl border border-[rgba(245,230,200,0.1)] object-cover shadow-[var(--shadow-clay)]"
                alt="Loading your documents..."
              />
            </div>
            <h3 className="mb-2 text-h3 md:text-h2">
              Loading your documents...
            </h3>
            <p className="mx-auto max-w-md text-body text-sm">
              We are syncing your collection and preparing the latest insights.
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <div className="pulse-stagger h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
              <div className="pulse-stagger delay-150 h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
              <div className="pulse-stagger delay-300 h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
            </div>
          </div>
        )}

        {!loadingResumes && resumes.length === 0 && (
          <div className="clay-card px-8 py-24 text-center md:px-12">
            <div className="mx-auto mb-8 flex justify-center">
              <div className="relative">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#e5c358] to-[#c49d2c] text-[#171717] shadow-[var(--shadow-clay-gold)]">
                  <svg
                    className="h-12 w-12"
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
              </div>
            </div>
            <h2 className="mb-3 text-h2 md:text-h1">
              Build Your First Analysis Set
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lead text-sm">
              Upload your first resume package to get score breakdowns,
              structural feedback, and job-targeted improvement signals.
            </p>

            <Link to="/upload" className="cta-button text-sm font-bold">
              <svg
                className="h-5 w-5"
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
            <div className="clay-card-secondary p-5 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="mb-1 text-h2 text-xl font-bold">
                    Your Documents Collection
                  </h2>
                  <p className="flex items-center gap-2 text-xs text-[#6b7280]">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#d4af37] animate-pulse" />
                    {resumes.length} document{resumes.length !== 1 ? "s" : ""}{" "}
                    ready for career boost
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <label
                    htmlFor="sort-documents"
                    className="text-xs text-[#6b7280] font-semibold uppercase tracking-wider"
                  >
                    Sort by
                  </label>
                  <select
                    id="sort-documents"
                    className="rounded-2xl border border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#181818,#1d1d1d)] shadow-[var(--shadow-clay-inset)] px-4 py-2.5 text-sm text-[#f5e6c8] outline-none transition-all duration-200 focus:border-[#d4af37]/40 cursor-pointer"
                    aria-label="Sort documents by"
                    value={sortBy}
                    onChange={(event) =>
                      setSortBy(
                        event.target.value as "recent" | "score" | "company",
                      )
                    }
                  >
                    <option
                      value="recent"
                      className="bg-[#1a1a1a] text-[#f5e6c8]"
                    >
                      Most Recent
                    </option>
                    <option
                      value="score"
                      className="bg-[#1a1a1a] text-[#f5e6c8]"
                    >
                      Highest Score
                    </option>
                    <option
                      value="company"
                      className="bg-[#1a1a1a] text-[#f5e6c8]"
                    >
                      Company A-Z
                    </option>
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
                  <ResumeCard resume={resume} />
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
            transform: translateY(16px) scale(0.99);
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

        #sort-documents {
          color-scheme: dark;
        }

        #sort-documents option {
          background-color: #1a1a1a !important;
          color: #f5e6c8 !important;
        }
      `}</style>
    </main>
  );
}
