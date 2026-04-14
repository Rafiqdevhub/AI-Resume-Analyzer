import { type FormEvent, useState } from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import { useNavigate } from "react-router";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions } from "../../constants";
import { usePuterStore } from "~/lib/putter";
import { convertPdfToImage } from "~/lib/PdfToImage";

export const meta = () => [
  {
    title:
      "Upload & Analyze Documents | JobPsych AI Documents Quality Improvement",
  },
  {
    name: "keywords",
    content:
      "JobPsych AI, document quality improvement, content analysis, ATS readiness, document scoring, clarity feedback, structure analysis",
  },
  {
    name: "description",
    content:
      "Upload your document and get AI-powered feedback on content quality, structure, clarity, ATS readiness, and actionable improvements.",
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
                    Document Analysis in Progress
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
                  {statusText}
                </h1>
                <img
                  src="/images/resume-scan.gif"
                  className="w-full rounded-xl shadow-lg mt-8"
                  alt="JobPsych AI analyzing your document"
                />
              </>
            ) : (
              <>
                <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="text-sm font-semibold text-blue-300">
                    Document Quality Improvement
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
                  Improve Your Documents with AI
                </h1>
                <p className="text-xl text-gray-300 mb-4 leading-relaxed">
                  Share your document with our AI assistant and get detailed
                  feedback on content quality, clarity, structure, ATS
                  readiness, and actionable recommendations.
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
                  Document Context
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
                      The target company helps personalize the analysis.
                    </p>
                  </div>
                  <div className="form-div">
                    <label
                      htmlFor="job-title"
                      className="font-semibold text-gray-100"
                    >
                      Target Role
                    </label>
                    <input
                      type="text"
                      name="job-title"
                      placeholder="e.g., Senior Software Engineer, Product Manager, Data Scientist"
                      id="job-title"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      The role you're targeting helps tailor the feedback.
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
                  Job Description
                </h3>
                <div className="form-div">
                  <label
                    htmlFor="job-description"
                    className="font-semibold text-gray-100"
                  >
                    Target Content Context
                  </label>
                  <textarea
                    rows={6}
                    name="job-description"
                    placeholder="Paste the complete job posting here. Include all requirements, responsibilities, skills, qualifications, and key competencies. The more details provided, the more accurate our analysis will be."
                    id="job-description"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Paste the complete job description so we can compare your
                    document against the target content and highlight gaps.
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
                    Document File
                  </label>
                  <FileUploader onFileSelect={handleFileSelect} />
                  <p className="text-xs text-gray-400 mt-3">
                    Supports PDF format. Our AI will analyze content quality,
                    ATS readiness, keyword alignment, and provide personalized
                    recommendations.
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
                Analyze Document with AI
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};
export default Upload;
