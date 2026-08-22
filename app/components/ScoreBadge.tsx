interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = "";
  let badgeText = "";

  if (score > 70) {
    badgeColor =
      "border border-[#d4af37]/30 bg-[rgba(212,175,55,0.15)] text-[#d4af37]";
    badgeText = "Excellent";
  } else if (score > 49) {
    badgeColor =
      "border border-[rgba(245,230,200,0.15)] bg-[rgba(245,230,200,0.08)] text-[#f5e6c8]";
    badgeText = "Promising";
  } else {
    badgeColor =
      "border border-[#fca5a5]/30 bg-[rgba(252,165,165,0.1)] text-[#fca5a5]";
    badgeText = "Needs Improvement";
  }

  return (
    <div
      className={`px-3 py-1 rounded-full shadow-[var(--shadow-clay-sm)] ${badgeColor}`}
    >
      <p className="text-xs font-bold">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
