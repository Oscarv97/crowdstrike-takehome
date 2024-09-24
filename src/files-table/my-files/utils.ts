import { FileData } from "../../services/file-service";

export const hasScheduledFiles = (selectedFiles?: FileData[]) =>
  selectedFiles?.some((file) => file.status === "scheduled") ?? false;

export const getCheckboxState = (
  selectedFiles?: FileData[],
  totalFiles?: FileData[]
): "off" | "checked" | "on" => {
  if (!selectedFiles?.length) return "off";
  if (selectedFiles.length === totalFiles?.length) return "checked";
  return "on";
};
