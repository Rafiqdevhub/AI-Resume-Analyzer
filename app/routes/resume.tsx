import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import { usePuterStore } from "~/lib/putter";
import Summary from "~/components/Summary";

export const meta = () => [
  { title: "Documents Review" },
  {
    name: "description",
    content: "Check out the detailed analysis of your documents.",
  },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [auth.isAuthenticated, id, isLoading, navigate]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
    };

    loadResume();
  }, [id]);

  return (
    <main className="!pt-0 bg-[#171717] min-h-screen">
      <nav className="resume-nav justify-start border-b border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#242424,#1c1c1c)] px-6 py-4 shadow-[var(--shadow-clay-sm)]">
        <Link to="/dashboard" className="back-button">
          <img
            src="/icons/back.svg"
            alt="logo"
            className="w-3 h-3 invert opacity-80"
          />
          <span className="text-xs font-bold text-[#f5e6c8]">
            Back to Dashboard
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section h-[100vh] sticky top-0 items-center justify-center p-6">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 clay-card max-sm:m-0 h-[90%] max-wxl:h-fit w-fit p-3">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain rounded-2xl border border-[rgba(245,230,200,0.08)]"
                  title="Click to open original document"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section p-6 md:p-8">
          <h2 className="text-h2 mb-6 font-bold text-[#f5e6c8]">
            JobPsych AI Career Intelligence Report
          </h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS
                score={feedback.ATS.score || 0}
                suggestions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <div className="clay-card p-8 text-center">
              <img
                src="/images/resume-scan-2.gif"
                className="w-full rounded-2xl shadow-[var(--shadow-clay-inset-sm)]"
                alt="Analyzing your documents..."
              />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
export default Resume;
