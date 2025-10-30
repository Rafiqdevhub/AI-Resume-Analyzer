import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/putter";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "JobPsych ATS - Smart Resume Analysis" },
    {
      name: "description",
      content:
        "Get AI-powered feedback on your resume. Improve your chances of landing your dream job with intelligent ATS analysis and personalized recommendations.",
    },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
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
            Get AI-Powered Feedback on Your Resume
          </h1>
          <h2 className="max-w-2xl mx-auto mt-6">
            Boost your job search with intelligent ATS analysis, personalized
            recommendations, and comprehensive scoring to land your dream job
            faster.
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
              Why Choose TalentTrack AI?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive resume analysis to
              give you the competitive edge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                ATS Optimization
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Get detailed analysis of how well your resume performs with
                Applicant Tracking Systems. Our AI identifies keywords,
                formatting issues, and optimization opportunities.
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Comprehensive Scoring
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Receive detailed scores across multiple categories including
                content quality, structure, skills presentation, and overall
                effectiveness.
              </p>
            </div>

            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-600 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-100 mb-4">
                Actionable Insights
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Get specific, actionable recommendations to improve your resume.
                Our AI provides detailed tips and suggestions tailored to your
                industry and experience level.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2025 TalentTrack AI. Built with AI to help you land your dream
            job.
          </p>
        </div>
      </footer>
    </main>
  );
}
