export const sum = (total: number, value: number) => total + value
export const sumTrue = (total: number, value: boolean) =>
  total + (value ? 1 : 0)
export const concatStringArray = (finalStr: string, value: string) =>
  finalStr + value
