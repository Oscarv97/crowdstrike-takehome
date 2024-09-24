import { describe, it, expect, vi, afterEach } from 'vitest';
import { FileService, FileData } from './file-service';

describe('FileService', () => {
  const fileService = new FileService();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch files successfully', async () => {
    const mockFiles: FileData[] = [
      { name: 'file1', device: 'device1', path: '/path/to/file1', status: 'available' },
      { name: 'file2', device: 'device2', path: '/path/to/file2', status: 'scheduled' },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFiles),
      })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) as any;

    const result = await fileService.fetchFiles();
    expect(result).toEqual(mockFiles);
    expect(fetch).toHaveBeenCalledWith('./data.json');
  });

  it('should throw an error if fetch fails', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any;

    await expect(fileService.fetchFiles()).rejects.toThrow('There was an issue fetching the files');
    expect(fetch).toHaveBeenCalledWith('./data.json');
  });
});