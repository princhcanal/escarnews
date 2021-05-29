import { join } from 'path';
import { unlink } from 'fs';

export const deleteFile = async (filePath: string) => {
  filePath = join(filePath);
  unlink(filePath, (err: NodeJS.ErrnoException | null) => {
    if (err) {
      console.error('clearImageError:', err);
    }
  });
};
