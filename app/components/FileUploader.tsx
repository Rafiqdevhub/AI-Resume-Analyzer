import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;

      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: maxFileSize,
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full rounded-2xl border border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#181818,#1d1d1d)] shadow-[var(--shadow-clay-inset)] p-6 transition-all duration-300">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer text-center py-4">
          {file ? (
            <div
              className="flex items-center justify-between gap-4 rounded-2xl border border-[rgba(245,230,200,0.08)] bg-[linear-gradient(145deg,#252525,#1c1c1c)] shadow-[var(--shadow-clay-sm)] p-4 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src="/images/pdf.png"
                  alt="pdf"
                  className="size-10 shrink-0"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#f5e6c8]">
                    {file.name}
                  </p>
                  <p className="text-xs text-[#6b7280]">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                className="p-2 rounded-xl bg-[rgba(245,230,200,0.05)] hover:bg-[rgba(252,165,165,0.15)] text-[#6b7280] hover:text-[#fca5a5] transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect?.(null);
                }}
              >
                <img
                  src="/icons/cross.svg"
                  alt="remove"
                  className="w-4 h-4 invert opacity-70"
                />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-3 rounded-2xl bg-[linear-gradient(145deg,#242424,#1c1c1c)] shadow-[var(--shadow-clay-sm)] border border-[rgba(245,230,200,0.08)]">
                <svg
                  className="w-8 h-8 text-[#d4af37]"
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
              </div>
              <p className="text-sm text-[#f5e6c8]">
                <span className="font-bold text-[#d4af37]">
                  Click to upload a file
                </span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-[#6b7280] mt-1">
                PDFs only, up to {formatSize(maxFileSize)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FileUploader;
