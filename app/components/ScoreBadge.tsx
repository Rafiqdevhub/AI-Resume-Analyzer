interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = "";
  let badgeText = "";

  if (score > 70) {
    badgeColor = "bg-badge-green text-badge-green-text";
    badgeText = "Excellent";
  } else if (score > 49) {
    badgeColor = "bg-badge-yellow text-badge-yellow-text";
    badgeText = "Promising";
  } else {
    badgeColor = "bg-badge-red text-badge-red-text";
    badgeText = "Needs Improvement";
  }

  return (
    <div className={`px-3 py-1 rounded-full ${badgeColor}`}>
      <p className="text-sm font-medium">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
