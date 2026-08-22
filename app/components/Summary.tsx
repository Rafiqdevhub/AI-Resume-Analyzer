import ScoreBadge from "~/components/ScoreBadge";
import ScoreGauge from "./ScoreGuage";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-[#d4af37]"
      : score > 49
        ? "text-[#f5e6c8]"
        : "text-[#fca5a5]";

  return (
    <div className="px-4 py-2">
      <div className="flex flex-row gap-2 items-center justify-between rounded-2xl p-4 border border-[rgba(245,230,200,0.07)] bg-[linear-gradient(145deg,#242424,#1b1b1b)] shadow-[var(--shadow-clay-sm)]">
        <div className="flex flex-row gap-3 items-center">
          <p className="text-base font-bold text-[#f5e6c8]">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-lg font-bold text-[#6b7280]">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="clay-card p-6 w-full space-y-4">
      <div className="flex flex-row items-center p-2 gap-6">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl font-bold text-[#f5e6c8]">Overall Score</h2>
          <p className="text-xs text-[#6b7280]">
            This score is a summary of the sections evaluated below.
          </p>
        </div>
      </div>

      <div className="space-y-1 pt-2">
        <Category title="Tone and Style" score={feedback.toneAndStyle.score} />
        <Category title="Content Quality" score={feedback.content.score} />
        <Category title="Document Structure" score={feedback.structure.score} />
        <Category title="Relevant Skills" score={feedback.skills.score} />
      </div>
    </div>
  );
};
export default Summary;
