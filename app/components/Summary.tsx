import ScoreBadge from "~/components/ScoreBadge";
import ScoreGauge from "./ScoreGuage";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-[var(--color-accent)]"
      : score > 49
        ? "text-[var(--color-link)]"
        : "text-[var(--color-h3)]";

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl text-[var(--color-h2)]">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl text-[var(--color-secondary)]">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="rounded-2xl shadow-md w-full border border-[var(--panel-border)] bg-[var(--panel-bg)]">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-[var(--color-h2)]">
            Overall Score
          </h2>
          <p className="text-sm text-[var(--color-secondary)]">
            This score is a summary of the sections below.
          </p>
        </div>
      </div>

      <Category title="Tone and Style" score={feedback.toneAndStyle.score} />
      <Category title="Content Quality" score={feedback.content.score} />
      <Category title="Document Structure" score={feedback.structure.score} />
      <Category title="Relevant Skills" score={feedback.skills.score} />
    </div>
  );
};
export default Summary;
