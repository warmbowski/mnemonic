export type { Translations } from "./en"

export const pl = (n: number, singular: string, plural: string) =>
  n === 1 ? singular : plural
