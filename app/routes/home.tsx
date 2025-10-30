import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/putter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "JobPsych AI - Resume Analyzer | Career Intelligence Assistant" },
    {
      name: "description",
      content:
        "Unlock your career potential with JobPsych AI Resume Analyzer. Get intelligent ATS-friendly analysis, personalized insights, and career guidance powered by advanced AI technology.",
    },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const loadResumes = async () => {
        setLoadingResumes(true);
        const resumes = (await kv.list("resume:*", true)) as KVItem[];
        const parsedResumes = resumes?.map(
          (resume) => JSON.parse(resume.value) as Resume
        );
        setResumes(parsedResumes || []);
        setLoadingResumes(false);
      };
      loadResumes();
    }
  }, [auth.isAuthenticated, kv]);

  if (auth.isAuthenticated) {
    return (
      <main className="bg-gray-900">
        <Navbar />
        <section className="main-section">
          <div className="page-heading py-16">
            <h1>View Your Applications and Resume Scores</h1>
            {!loadingResumes && resumes?.length === 0 ? (
              <h2>Upload a resume to see feedback.</h2>
            ) : (
              <h2>See your submissions and AI feedback.</h2>
            )}
          </div>
          {loadingResumes && (
            <div className="flex flex-col items-center justify-center">
              <img
                src="/images/resume-scan-2.gif"
                className="w-[200px]"
                alt="Scanning resume animation"
              />
            </div>
          )}

          {!loadingResumes && resumes.length > 0 && (
            <div className="resumes-section">
              {resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))}
            </div>
          )}

          {!loadingResumes && resumes?.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-10 gap-4">
              <Link
                to="/upload"
                className="primary-button w-fit text-xl font-semibold"
              >
                Upload Resume
              </Link>
            </div>
          )}
        </section>
      </main>
    );
  }

  return (
    <main className="bg-gray-900">
      <section className="main-section">
        <div className="page-heading py-20">
          <h1 className="max-w-4xl mx-auto">
            Elevate Your Career with JobPsych AI Resume Analyzer
          </h1>
          <h2 className="max-w-2xl mx-auto mt-6">
            Your personal Career Intelligence Assistant. Get instant
            ATS-optimized feedback, actionable insights, and expert guidance to
            unlock your professional potential.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
            <Link to="/auth?next=/upload" className="auth-button">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Why JobPsych AI Resume Analyzer?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powered by advanced AI technology, our Career Intelligence
              platform delivers comprehensive resume analysis and strategic
              career insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Smart ATS Analysis
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Leverage JobPsych AI's intelligent scanning to ensure your
                resume passes Applicant Tracking Systems. We identify critical
                keywords, format optimization, and compatibility issues
                instantly.
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Career Intelligence Scoring
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Receive JobPsych AI's multi-dimensional evaluation across tone,
                content quality, structure, and skills alignment. Our Career
                Intelligence system provides precision scoring for maximum
                impact.
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Personalized Career Guidance
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Get tailored recommendations from JobPsych AI's Career
                Intelligence. Our advanced AI analyzes your profile and delivers
                personalized insights aligned with your career goals and
                industry standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2025 JobPsych AI. Your Career Intelligence Assistant - Empowering
            professionals to unlock their full potential.
          </p>
        </div>
      </footer>
    </main>
  );
}
