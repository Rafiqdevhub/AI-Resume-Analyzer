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
    <div className="clay-card w-full p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[linear-gradient(145deg,#282828,#1c1c1c)] shadow-[var(--shadow-clay-sm)] border border-[rgba(245,230,200,0.08)] flex items-center justify-center p-2">
          <img src={iconSrc} alt="ATS Score Icon" className="w-10 h-10" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#f5e6c8]">
            ATS Friendliness Score —{" "}
            <span className="text-[#d4af37]">{score}/100</span>
          </h2>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2 text-[#d4af37]">{subtitle}</h3>
        <p className="mb-4 text-xs text-[#6b7280]">
          This score shows how well your documents will likely do with automated
          hiring systems.
        </p>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="clay-card-secondary p-3.5 flex items-start gap-3 rounded-2xl"
            >
              <img
                src={
                  suggestion.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt={suggestion.type === "good" ? "Check" : "Warning"}
                className="w-4 h-4 mt-0.5"
              />
              <p className="text-xs text-[#dfd0b5] leading-relaxed">
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="italic text-xs text-[#6b7280]">
        Continue to improve your documents to boost your chances of landing an
        interview.
      </p>
    </div>
  );
};

export default ATS;
