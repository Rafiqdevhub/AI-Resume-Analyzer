import { useState } from "react";
import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Resume Analyzer" },
    { name: "description", content: "Analyze your resume with AI" },
  ];
}

const Home = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      {window.puter.auth()}
      <section className="main-section">
        <div className="page-heading">
          <h1>Analyze Your Resume</h1>
          <h2>
            Get insights and improve your chances of landing your dream job
          </h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
