import { describe, it, expect, vi, afterEach } from 'vitest';
import { downloadFiles } from "./download-service";
import { toast } from "react-toastify";
import { FileData } from "./file-service";

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe("downloadFiles", () => {
  const mockFiles: FileData[] = [
    { name: "file1", status: "available", device: "", path: "" },
    { name: "file2", status: "scheduled", device: "", path: "" },
    { name: "file3", status: "available", device: "", path: "" },
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should reject if no files are selected", async () => {
    await expect(downloadFiles([])).rejects.toThrow("No files selected.");
    expect(toast.error).not.toHaveBeenCalled();
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("should reject if any file has status 'scheduled'", async () => {
    await expect(downloadFiles(mockFiles)).rejects.toThrow(
      "Download denied: One or more files are scheduled."
    );
    expect(toast.error).toHaveBeenCalledWith(
      "Download denied: One or more files are scheduled."
    );
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(toast.success).not.toHaveBeenCalled();
  });

  it("should resolve if all files are downloadable", async () => {
    const downloadableFiles: FileData[] = [
      { name: "file1", status: "available", device: "", path: "" },
      { name: "file3", status: "available", device: "", path: "" },
    ];

    await expect(downloadFiles(downloadableFiles)).resolves.toBeUndefined();
    expect(toast.success).toHaveBeenCalledWith("Download successful!");
    expect(toast.success).toHaveBeenCalledTimes(1);
    expect(toast.error).not.toHaveBeenCalled();
  });
});