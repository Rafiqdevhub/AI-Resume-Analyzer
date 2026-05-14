import { useEffect, useId, useRef, useState } from "react";

const ScoreCircle = ({ score = 75 }: { score: number }) => {
  const gradientId = useId();
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)));
  const [animatedScore, setAnimatedScore] = useState(0);
  const previousScoreRef = useRef(0);

  const radius = 40;
  const stroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = animatedScore / 100;
  const strokeDashoffset = circumference * (1 - progress);

  const colorScale =
    animatedScore >= 85
      ? {
          start: "#5c7a5f",
          end: "#7ea483",
          label: "Elite",
        }
      : animatedScore >= 70
        ? {
            start: "#7a6340",
            end: "#a18455",
            label: "Strong",
          }
        : {
            start: "#b9804b",
            end: "#c15e57",
            label: "Improve",
          };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reducedMotion) {
        setAnimatedScore(clampedScore);
        previousScoreRef.current = clampedScore;
        return;
      }
    }

    const start = previousScoreRef.current;
    const end = clampedScore;
    const duration = 800;
    let frameId = 0;
    let startTime = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(start + (end - start) * eased);

      setAnimatedScore(next);

      if (t < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);
    previousScoreRef.current = clampedScore;

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [clampedScore]);

  return (
    <div className="relative h-[104px] w-[104px]">
      <div className="absolute inset-0 rounded-full bg-[var(--panel-bg-2)] blur-md" />
      <svg
        height="100%"
        width="100%"
        viewBox="0 0 100 100"
        className="-rotate-90 transform"
      >
        <defs>
          <linearGradient id={gradientId} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorScale.start} />
            <stop offset="100%" stopColor={colorScale.end} />
          </linearGradient>
        </defs>

        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke="rgba(15, 23, 42, 0.18)"
          strokeWidth={stroke}
          fill="transparent"
        />

        <circle
          cx="50"
          cy="50"
          r={normalizedRadius}
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-sm font-black text-[var(--color-h2)]">
          {animatedScore}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
          {colorScale.label}
        </span>
      </div>
    </div>
  );
};

export default ScoreCircle;
