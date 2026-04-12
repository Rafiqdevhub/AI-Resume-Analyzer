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
          chipClass: "border-emerald-300/40 bg-emerald-500/15 text-emerald-200",
        }
      : score >= 70
        ? {
            label: "Strong Base",
            chipClass: "border-cyan-300/40 bg-cyan-500/15 text-cyan-100",
          }
        : {
            label: "Needs Polish",
            chipClass: "border-amber-300/40 bg-amber-500/15 text-amber-100",
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
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/0 via-cyan-400/10 to-orange-400/0 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-100" />

      <Link
        to={`/resume/${id}`}
        className="relative block overflow-hidden rounded-3xl border border-cyan-300/20 bg-gradient-to-b from-slate-800/95 via-slate-900/95 to-slate-950/95 p-4 shadow-[0_16px_30px_-20px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200/45 hover:shadow-[0_24px_36px_-20px_rgba(8,145,178,0.55)]"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            <div className="inline-flex rounded-full border border-cyan-200/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">
              Resume Intelligence
            </div>

            <h2 className="line-clamp-2 break-words text-xl font-black text-white">
              {cardTitle}
            </h2>

            {companyName && jobTitle && (
              <p className="line-clamp-2 break-words text-sm text-slate-300">
                Target Role: {jobTitle}
              </p>
            )}

            {!companyName && jobTitle && (
              <p className="line-clamp-2 break-words text-sm text-slate-300">
                Role Focus: {jobTitle}
              </p>
            )}
          </div>

          <div className="shrink-0 rounded-2xl border border-slate-700/70 bg-slate-900/70 p-1">
            <ScoreCircle score={score} />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${scoreTone.chipClass}`}
          >
            {scoreTone.label}
          </span>
          <span className="rounded-full border border-slate-600/60 bg-slate-800/70 px-2.5 py-1 text-xs font-medium text-slate-200">
            ATS {feedback.ATS.score}
          </span>
          <span className="rounded-full border border-slate-600/60 bg-slate-800/70 px-2.5 py-1 text-xs font-medium text-slate-200">
            Content {feedback.content.score}
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/80">
          <div className="relative">
            <img
              src={resumeUrl || "/images/resume-scan-2.gif"}
              alt="documents"
              className="h-[320px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] max-sm:h-[210px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
            <div className="absolute bottom-3 right-3 rounded-full border border-cyan-200/35 bg-slate-900/75 px-3 py-1 text-xs font-semibold text-cyan-100 backdrop-blur-sm">
              Open Analysis
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-700/70 pt-3">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
            Tailored Insights
          </p>
          <p className="text-sm font-semibold text-white">{score}/100</p>
        </div>
      </Link>
    </article>
  );
};

export default ResumeCard;
