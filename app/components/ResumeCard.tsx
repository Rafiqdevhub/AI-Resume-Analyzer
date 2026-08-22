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
            "border-[#d4af37]/40 bg-[rgba(212,175,55,0.12)] text-[#d4af37]",
        }
      : score >= 70
        ? {
            label: "Strong Base",
            chipClass:
              "border-[rgba(245,230,200,0.15)] bg-[rgba(245,230,200,0.06)] text-[#f5e6c8]",
          }
        : {
            label: "Needs Polish",
            chipClass:
              "border-[#fca5a5]/30 bg-[rgba(252,165,165,0.08)] text-[#fca5a5]",
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
      <Link
        to={`/resume/${id}`}
        className="relative block overflow-hidden rounded-3xl border border-[rgba(245,230,200,0.08)] p-5 bg-[linear-gradient(145deg,#242424,#1b1b1b)] shadow-[var(--shadow-clay)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[rgba(212,175,55,0.3)] hover:shadow-[var(--shadow-clay-lg)]"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            <div className="inline-flex rounded-full border border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#282828,#1e1e1e)] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d4af37] shadow-[var(--shadow-clay-sm)]">
              Document Analysis
            </div>

            <h2 className="line-clamp-2 break-words text-lg font-bold text-[#f5e6c8]">
              {cardTitle}
            </h2>

            {companyName && jobTitle && (
              <p className="line-clamp-2 break-words text-xs text-[#6b7280]">
                Target: {jobTitle}
              </p>
            )}

            {!companyName && jobTitle && (
              <p className="line-clamp-2 break-words text-xs text-[#6b7280]">
                Role: {jobTitle}
              </p>
            )}
          </div>

          <div className="shrink-0 rounded-2xl border border-[rgba(245,230,200,0.08)] p-1 bg-[linear-gradient(145deg,#202020,#181818)] shadow-[var(--shadow-clay-sm)]">
            <ScoreCircle score={score} />
          </div>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 text-xs font-bold ${scoreTone.chipClass}`}
          >
            {scoreTone.label}
          </span>
          <span className="rounded-full border px-2.5 py-1 text-xs font-semibold border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#262626,#1e1e1e)] text-[#dfd0b5] shadow-[var(--shadow-clay-sm)]">
            ATS {feedback.ATS.score}
          </span>
          <span className="rounded-full border px-2.5 py-1 text-xs font-semibold border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#262626,#1e1e1e)] text-[#dfd0b5] shadow-[var(--shadow-clay-sm)]">
            Content {feedback.content.score}
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#181818,#1c1c1c)] shadow-[var(--shadow-clay-inset-sm)]">
          <div className="relative">
            <img
              src={resumeUrl || "/images/resume-scan-2.gif"}
              alt="documents"
              className="h-[300px] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] max-sm:h-[200px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 right-3 rounded-full border border-[rgba(245,230,200,0.1)] bg-[linear-gradient(145deg,#282828,#1e1e1e)] px-3 py-1 text-xs font-bold text-[#f5e6c8] shadow-[var(--shadow-clay-sm)] backdrop-blur-sm">
              Open Analysis
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[rgba(245,230,200,0.08)] pt-3">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#6b7280] font-semibold">
            Quality Rating
          </p>
          <p className="text-sm font-black text-[#d4af37]">{score}/100</p>
        </div>
      </Link>
    </article>
  );
};

export default ResumeCard;
