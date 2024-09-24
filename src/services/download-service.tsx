import { toast } from "react-toastify";
import { FileData } from "./file-service";

export const downloadFiles = (files?: FileData[]) => {
  return new Promise<void>((resolve, reject) => {
    if (!files) {
      reject("No files selected.");
      return;
    }
    const hasScheduled = files.some((file) => file.status === "scheduled");

    if (hasScheduled) {
      toast.error("Download denied: One or more files are scheduled.");
      reject("Download denied: One or more files are scheduled.");
    } else {
      setTimeout(() => {
        toast.success(
          <div>
            Download Success <br />{" "}
            <ol>
              {files.map((file) => (
                <li className="text-xs" key={file.device}>
                 <b>{file.device}</b>:{file.path}
                </li>
              ))}
            </ol>
          </div>
        );
        resolve();
      }, 1000);
    }
  });
};
