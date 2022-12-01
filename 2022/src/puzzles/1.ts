import {readFileSync} from 'fs';
import path from 'path';

export const countCalories = (input: string) =>
  Math.max(
    ...input.split('\n\n').map(elf =>
      elf
        .split('\n')
        .map(calories => Number(calories))
        .reduce((total, calories) => total + calories),
    ),
  );

export const solution = () => {
  const input = readFileSync(
    path.resolve(__dirname, '../input/1.txt'),
  ).toString();

  return countCalories(input);
};
