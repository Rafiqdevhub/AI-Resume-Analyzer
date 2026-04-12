import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { useNavigate } from "react-router";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";
import { usePuterStore } from "~/lib/putter";
import { convertPdfToImage } from "~/lib/PdfToImage";

export const meta = () => [
  { title: "Upload & Analyze Documents | JobPsych AI Career Intelligence" },
  {
    name: "keywords",
    content:
      "JobPsych AI, Documents Upload, ATS Optimization, Resume Analysis, Career Intelligence, Document Scoring, AI Career Assistant",
  },
  {
    name: "description",
    content:
      "Upload your resume and get comprehensive AI-powered analysis with actionable insights to optimize your professional documents and ace your job applications.",
  },
];

const Upload = () => {
  const { fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    setStatusText("Uploading the file...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload file");

    setStatusText("Converting to image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return setStatusText("Error: Failed to convert PDF to image");

    setStatusText("Uploading the image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload image");

    setStatusText("Preparing data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing...");

    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription }),
    );
    if (!feedback) return setStatusText("Error: Failed to analyze documents");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");
    navigate(`/resume/${uuid}`);
    // After viewing results, user can return to dashboard
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-gradient-to-b from-gray-900 via-gray-900 to-black min-h-screen">
      <Navbar />

      <section className="main-section py-16">
        <div className="page-heading max-w-4xl mx-auto px-4">
          <div className="mb-8">
            {isProcessing ? (
              <>
                <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-blue-300">
                    AI Analysis in Progress
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
                  {statusText}
                </h1>
                <img
                  src="/images/resume-scan.gif"
                  className="w-full rounded-xl shadow-lg mt-8"
                  alt="JobPsych AI analyzing your documents"
                />
              </>
            ) : (
              <>
                <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-blue-300">
                    Professional Document Analysis
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
                  Optimize Your Documents for Success
                </h1>
                <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                  Share your professional documents with our AI Career
                  Intelligence Assistant. Get detailed feedback on ATS
                  compatibility, content quality, skills alignment, and
                  actionable recommendations to elevate your application.
                </p>
              </>
            )}
          </div>
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="mt-12 space-y-6"
            >
              {/* Company Information Section */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-gray-100 mb-6 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Target Position Details
                </h3>
                <div className="space-y-4">
                  <div className="form-div">
                    <label
                      htmlFor="company-name"
                      className="font-semibold text-gray-100"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company-name"
                      placeholder="e.g., Google, Microsoft, Amazon, Tesla"
                      id="company-name"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      The company you're applying to helps personalize the
                      analysis.
                    </p>
                  </div>
                  <div className="form-div">
                    <label
                      htmlFor="job-title"
                      className="font-semibold text-gray-100"
                    >
                      Job Title
                    </label>
                    <input
                      type="text"
                      name="job-title"
                      placeholder="e.g., Senior Software Engineer, Product Manager, Data Scientist"
                      id="job-title"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      The specific role you're targeting for precise evaluation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Job Description Section */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-gray-100 mb-6 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Job Requirements
                </h3>
                <div className="form-div">
                  <label
                    htmlFor="job-description"
                    className="font-semibold text-gray-100"
                  >
                    Job Description
                  </label>
                  <textarea
                    rows={6}
                    name="job-description"
                    placeholder="Paste the complete job posting here. Include all requirements, responsibilities, skills, qualifications, and key competencies. The more details provided, the more accurate our analysis will be."
                    id="job-description"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Copy the complete job description from the job posting. This
                    helps us identify keyword matches and skill gaps.
                  </p>
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-gray-100 mb-6 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Upload Your Document
                </h3>
                <div className="form-div">
                  <label
                    htmlFor="uploader"
                    className="font-semibold text-gray-100 block mb-3"
                  >
                    Professional Document
                  </label>
                  <FileUploader onFileSelect={handleFileSelect} />
                  <p className="text-xs text-gray-400 mt-3">
                    Supports PDF format. Our AI will analyze content quality,
                    ATS compatibility, keyword alignment, and provide
                    personalized recommendations.
                  </p>
                </div>
              </div>

              <button
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-purple-500/50 cursor-pointer flex items-center justify-center gap-2"
                type="submit"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Analyze Documents with AI
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      {!isProcessing && (
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-12 text-center">
              What Our AI Analysis Covers
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">
                    ATS Compatibility
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Ensure your document passes Applicant Tracking Systems with
                    intelligent keyword analysis.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">
                    Content Quality
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Get detailed feedback on clarity, impact, and effectiveness
                    of your language.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">
                    Skills Alignment
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Identify skill gaps and opportunities to better match job
                    requirements.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600">
                    <svg
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-100 mb-1">
                    Actionable Insights
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Receive personalized recommendations to strengthen your
                    application instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
export default Upload;
