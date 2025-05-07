import { Language } from "@src/entities/client";
import { CategoryCode } from "@src/entities/constants";

const categoryTranslations: Record<Language, Record<CategoryCode, string>> = {
  es: {
    news: "Noticias",
    gameplays: "Juegos",
    olds: "Antiguos",
    music: "Música",
    entertainment: "Entretenimiento",
    educational: "Educación",
    tourism: "Turismo",
  },
  en: {
    news: "News",
    gameplays: "Gameplays",
    olds: "Olders",
    music: "Musics",
    entertainment: "Entertainment",
    educational: "Educational",
    tourism: "Tourism",
  },
};

export const getCategoryNameParsed = (
  code: CategoryCode,
  language: Language
): string => {
  return categoryTranslations[language][code];
};
