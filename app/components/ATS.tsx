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
  const gradientClass =
    score > 69
      ? "from-green-900"
      : score > 49
        ? "from-yellow-900"
        : "from-red-900";

  const iconSrc =
    score > 69
      ? "/icons/ats-good.svg"
      : score > 49
        ? "/icons/ats-warning.svg"
        : "/icons/ats-bad.svg";

  const subtitle =
    score > 69 ? "Great Job!" : score > 49 ? "Good Start" : "Needs Improvement";

  return (
    <div
      className={`bg-gradient-to-b ${gradientClass} to-gray-800 rounded-2xl shadow-md w-full p-6`}
    >
      <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
        <div>
          <h2 className="text-2xl font-bold text-gray-100">
            ATS Friendliness Score - {score}/100
          </h2>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-100">{subtitle}</h3>
        <p className="text-gray-300 mb-4">
          This score shows how well your resume will likely do with automated
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
              <p
                className={
                  suggestion.type === "good"
                    ? "text-green-300"
                    : "text-amber-300"
                }
              >
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-gray-300 italic">
        Continue to improve your resume to boost your chances of landing an
        interview.
      </p>
    </div>
  );
};

export default ATS;
