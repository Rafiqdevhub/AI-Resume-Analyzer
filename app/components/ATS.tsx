import React from "react";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  const iconSrc =
    score > 69
      ? "/icons/ats-good.svg"
      : score > 49
        ? "/icons/ats-warning.svg"
        : "/icons/ats-bad.svg";

  const subtitle =
    score > 69 ? "Great Job!" : score > 49 ? "Good Start" : "Needs Improvement";

  return (
    <div className="rounded-2xl shadow-md w-full p-6 bg-[var(--panel-bg)] border border-[var(--panel-border)]">
      <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-h2)]">
            ATS Friendliness Score - {score}/100
          </h2>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-[var(--color-h3)]">
          {subtitle}
        </h3>
        <p className="mb-4 text-[var(--color-body)]">
          This score shows how well your documents will likely do with automated
          hiring systems.
        </p>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3">
              <img
                src={
                  suggestion.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt={suggestion.type === "good" ? "Check" : "Warning"}
                className="w-5 h-5 mt-1"
              />
              <p className="text-[var(--color-body)]">{suggestion.tip}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="italic text-[var(--color-secondary)]">
        Continue to improve your documents to boost your chances of landing an
        interview.
      </p>
    </div>
  );
};

export default ATS;
