import { toast } from "react-toastify";
import { FileData } from "./file-service";

export const downloadFiles = (files?: FileData[]) => {
  return new Promise<void>((resolve, reject) => {
    if (!files) {
      reject(new Error("No files selected."));
      return;
    }
    const hasScheduled = files.some((file) => file.status === "scheduled");

    if (hasScheduled) {
      toast.error("Download denied: One or more files are scheduled.");
      reject(new Error("Download denied: One or more files are scheduled."));
    } else {
      setTimeout(() => {
        const fileDetails = files
          .map((file) => `${file.device}: ${file.path}`)
          .join(", ");
        toast.success("Download successful" + fileDetails);
        resolve();
      }, 1000);
    }
  });
};
