import { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "~/lib/putter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");
  const cardTitle = companyName || jobTitle || "General Documents";
  const score = feedback.overallScore;

  const scoreTone =
    score >= 85
      ? {
          label: "High Match",
          chipClass:
            "border-[color:var(--color-accent)]/30 bg-[color:var(--color-accent)]/12 text-[var(--color-accent)]",
        }
      : score >= 70
        ? {
            label: "Strong Base",
            chipClass:
              "border-[var(--panel-border)] bg-[var(--panel-bg-2)] text-[var(--color-link)]",
          }
        : {
            label: "Needs Polish",
            chipClass:
              "border-[var(--panel-border)] bg-[var(--panel-bg-2)] text-[var(--color-h3)]",
          };

  useEffect(() => {
    let objectUrl = "";

    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;

      objectUrl = URL.createObjectURL(blob);
      setResumeUrl(objectUrl);
    };

    loadResume();

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [fs, imagePath]);

  return (
    <article className="group relative">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#d7c7af]/0 via-[#d7c7af]/35 to-[#c9b79b]/0 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

      <Link
        to={`/resume/${id}`}
        className="relative block overflow-hidden rounded-3xl border p-4 bg-[var(--panel-bg)] border-[var(--panel-border)] shadow-[0_16px_30px_-22px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c5b59a] hover:shadow-[0_24px_36px_-22px_rgba(122,99,64,0.38)]"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            <div className="inline-flex rounded-full border border-[var(--panel-border)] bg-[var(--panel-bg-2)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
              Resume Intelligence
            </div>

            <h2 className="line-clamp-2 break-words text-xl font-black text-[var(--color-h2)]">
              {cardTitle}
            </h2>

            {companyName && jobTitle && (
              <p className="line-clamp-2 break-words text-sm text-[var(--color-secondary)]">
                Target Role: {jobTitle}
              </p>
            )}

            {!companyName && jobTitle && (
              <p className="line-clamp-2 break-words text-sm text-[var(--color-secondary)]">
                Role Focus: {jobTitle}
              </p>
            )}
          </div>

          <div className="shrink-0 rounded-2xl border p-1 border-[var(--panel-border)] bg-[var(--panel-bg-2)]">
            <ScoreCircle score={score} />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${scoreTone.chipClass}`}
          >
            {scoreTone.label}
          </span>
          <span className="rounded-full border px-2.5 py-1 text-xs font-medium border-[var(--panel-border)] bg-[var(--panel-bg-2)] text-[var(--color-body)]">
            ATS {feedback.ATS.score}
          </span>
          <span className="rounded-full border px-2.5 py-1 text-xs font-medium border-[var(--panel-border)] bg-[var(--panel-bg-2)] text-[var(--color-body)]">
            Content {feedback.content.score}
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel-bg-2)]">
          <div className="relative">
            <img
              src={resumeUrl || "/images/resume-scan-2.gif"}
              alt="documents"
              className="h-[320px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] max-sm:h-[210px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3d3426]/40 via-transparent to-transparent" />
            <div className="absolute bottom-3 right-3 rounded-full border border-[var(--panel-border)] bg-[var(--panel-bg-2)] px-3 py-1 text-xs font-semibold text-[var(--color-body)] backdrop-blur-sm">
              Open Analysis
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[var(--panel-border)] pt-3">
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-secondary)]">
            Tailored Insights
          </p>
          <p className="text-sm font-semibold text-[var(--color-h2)]">
            {score}/100
          </p>
        </div>
      </Link>
    </article>
  );
};

export default ResumeCard;
