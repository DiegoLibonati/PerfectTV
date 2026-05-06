import type { Language, CategoryCode } from "@/types/app";

import { categoryTranslations } from "@/constants/languages";

export const getCategoryNameParsed = (code: CategoryCode, language: Language): string => {
  return categoryTranslations[language][code];
};
