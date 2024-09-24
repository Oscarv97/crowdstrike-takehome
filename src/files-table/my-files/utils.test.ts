import { describe, it, expect } from "vitest";
import { hasScheduledFiles, getCheckboxState } from "./utils";
import { FileData } from "../../services/file-service";

describe("hasScheduledFiles", () => {
  it("should return false if no files are selected", () => {
    expect(hasScheduledFiles()).toBe(false);
  });

  it("should return false if no files have status 'scheduled'", () => {
    const files: FileData[] = [
      {
        name: "file1",
        status: "available",
        device: "device1",
        path: "/path/to/file1",
      },
      {
        name: "file2",
        status: "available",
        device: "device2",
        path: "/path/to/file2",
      },
    ];
    expect(hasScheduledFiles(files)).toBe(false);
  });

  it("should return true if any file has status 'scheduled'", () => {
    const files: FileData[] = [
      {
        name: "file1",
        status: "available",
        device: "device1",
        path: "/path/to/file1",
      },
      {
        name: "file2",
        status: "scheduled",
        device: "device1",
        path: "/path/to/file2",
      },
    ];
    expect(hasScheduledFiles(files)).toBe(true);
  });
});

describe("getCheckboxState", () => {
  it("should return 'off' if no files are selected", () => {
    expect(getCheckboxState()).toBe("off");
  });

  it("should return 'checked' if all files are selected", () => {
    const selectedFiles: FileData[] = [
      {
        name: "file1",
        status: "available",
        device: "device1",
        path: "/path/to/file1",
      },
      {
        name: "file2",
        status: "available",
        device: "device2",
        path: "/path/to/file2",
      },
    ];
    const totalFiles: FileData[] = [
      {
        name: "file1",
        status: "available",
        device: "device1",
        path: "/path/to/file1",
      },
      {
        name: "file2",
        status: "available",
        device: "device2",
        path: "/path/to/file2",
      },
    ];
    expect(getCheckboxState(selectedFiles, totalFiles)).toBe("checked");
  });

  it("should return 'on' if some files are selected", () => {
    const selectedFiles: FileData[] = [
      {
        name: "file1",
        status: "available",
        device: "device1",
        path: "/path/to/file1",
      },
    ];
    const totalFiles: FileData[] = [
      {
        name: "file1",
        status: "available",
        device: "device1",
        path: "/path/to/file1",
      },
      {
        name: "file2",
        status: "available",
        device: "device2",
        path: "/path/to/file2",
      },
    ];
    expect(getCheckboxState(selectedFiles, totalFiles)).toBe("on");
  });
});
