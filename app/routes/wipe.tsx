import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/putter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#171717] flex items-center justify-center p-6">
        <div className="clay-card p-8 text-center text-[#f5e6c8]">
          Loading...
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#171717] flex items-center justify-center p-6">
        <div className="clay-card p-8 text-center text-[#fca5a5]">
          Error: {error}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#171717] p-8 flex items-center justify-center">
      <div className="clay-card max-w-lg w-full p-8 flex flex-col gap-6">
        <h2 className="text-h3 font-bold text-[#f5e6c8]">
          App Data Management
        </h2>
        <p className="text-xs text-[#6b7280]">
          Authenticated as:{" "}
          <span className="font-bold text-[#f5e6c8]">
            {auth.user?.username}
          </span>
        </p>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#6b7280] mb-3">
            Existing Files ({files.length}):
          </p>
          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="clay-card-inset p-3 text-xs text-[#dfd0b5] truncate"
              >
                {file.name}
              </div>
            ))}
            {files.length === 0 && (
              <p className="text-xs text-[#6b7280] italic">
                No files in directory
              </p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <button
            className="w-full py-3.5 rounded-2xl bg-[linear-gradient(145deg,#8c3a2a,#6d2b1f)] text-[#fce8e4] font-bold text-sm shadow-[var(--shadow-clay-sm)] hover:bg-[linear-gradient(145deg,#9c4331,#7c3224)] active:shadow-[var(--shadow-clay-inset)] active:scale-[0.98] transition-all cursor-pointer"
            onClick={() => handleDelete()}
          >
            Wipe App Data
          </button>
        </div>
      </div>
    </main>
  );
};

export default WipeApp;
