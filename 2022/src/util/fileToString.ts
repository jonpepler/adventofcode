import path from 'path';
import {readFileSync} from 'fs';

export const fileToString = (pathToFile: string) =>
  readFileSync(path.resolve(__dirname, pathToFile)).toString();
