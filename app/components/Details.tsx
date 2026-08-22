import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex flex-row items-center gap-1.5 rounded-full px-3 py-1 border shadow-[var(--shadow-clay-sm)]",
        score > 69
          ? "border-[#d4af37]/30 bg-[rgba(212,175,55,0.12)] text-[#d4af37]"
          : score > 39
            ? "border-[rgba(245,230,200,0.15)] bg-[rgba(245,230,200,0.06)] text-[#f5e6c8]"
            : "border-[#fca5a5]/30 bg-[rgba(252,165,165,0.08)] text-[#fca5a5]",
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-3.5"
      />
      <p className="text-xs font-bold">{score}/100</p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-xl font-bold text-[#f5e6c8]">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-4 items-center w-full pt-2">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-3 rounded-2xl border border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#181818,#1d1d1d)] shadow-[var(--shadow-clay-inset-sm)] px-5 py-4">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2.5 items-center" key={index}>
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt="score"
              className="size-4 shrink-0"
            />
            <p className="text-xs font-medium text-[#dfd0b5]">{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-1.5 rounded-2xl border p-4 shadow-[var(--shadow-clay-sm)] transition-all",
              tip.type === "good"
                ? "border-[#d4af37]/20 bg-[linear-gradient(145deg,#242424,#1a1a1a)]"
                : "border-[rgba(245,230,200,0.07)] bg-[linear-gradient(145deg,#222222,#191919)]",
            )}
          >
            <div className="flex flex-row gap-2.5 items-center">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="score"
                className="size-4"
              />
              <p className="text-sm font-bold text-[#f5e6c8]">{tip.tip}</p>
            </div>
            <p className="text-xs text-[#6b7280] pl-6.5 leading-relaxed">
              {tip.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="clay-card p-6 w-full space-y-2">
      <h3 className="text-xl font-bold text-[#f5e6c8] mb-4">
        Detailed Breakdown
      </h3>
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
