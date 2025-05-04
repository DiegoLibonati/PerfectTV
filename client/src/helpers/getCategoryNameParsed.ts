import { Language } from "@src/entities/client";
import { CategoryCode } from "@src/entities/constants";

const categoryTranslations: Record<Language, Record<CategoryCode, string>> = {
  es: {
    news: "Noticias",
    gameplays: "Juegos",
  },
  en: {
    news: "News",
    gameplays: "Gameplays",
  },
};

export const getCategoryNameParsed = (
  code: CategoryCode,
  language: Language
): string => {
  return categoryTranslations[language][code];
};
