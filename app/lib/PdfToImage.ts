export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  isLoading = true;
  try {
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    const lib = await import("pdfjs-dist/build/pdf.mjs");
    // Set the worker source to use the same version as the library
    lib.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.mjs",
      import.meta.url
    ).toString();
    pdfjsLib = lib;
    isLoading = false;
    return lib;
  } catch (error) {
    console.error("Failed to load PDF.js:", error);
    isLoading = false;
    loadPromise = null;
    throw new Error("PDF.js library failed to load");
  }
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    // Validate input file
    if (!file) {
      throw new Error("No file provided");
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      throw new Error("File is not a PDF");
    }

    console.log("Loading PDF.js library...");
    const lib = await loadPdfJs();

    console.log("Converting file to ArrayBuffer...");
    const arrayBuffer = await file.arrayBuffer();

    console.log("Loading PDF document...");
    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;

    console.log(`PDF loaded with ${pdf.numPages} pages`);

    if (pdf.numPages === 0) {
      throw new Error("PDF has no pages");
    }

    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 4 });

    console.log(
      `Rendering page with dimensions: ${viewport.width}x${viewport.height}`
    );

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Failed to get canvas 2D context");
    }

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    console.log("Rendering PDF page to canvas...");
    await page.render({ canvasContext: context, viewport }).promise;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create a File from the blob with the same name as the pdf
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.png`, {
              type: "image/png",
            });

            resolve({
              imageUrl: URL.createObjectURL(blob),
              file: imageFile,
            });
          } else {
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
          }
        },
        "image/png",
        1.0
      ); // Set quality to maximum (1.0)
    });
  } catch (err) {
    console.error("PDF conversion error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF to image: ${errorMessage}`,
    };
  }
}
