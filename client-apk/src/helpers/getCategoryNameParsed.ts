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
    sports: "Deportes",
    gastronomy: "Gastronomía",
    moviesseries: "Películas y Series",
    cartoonsanimated: "Dibujos Animados",
    documentaries: "Documentales",
    animals: "Animales",
    radio: "Radio",
    esports: "Esports",
  },
  en: {
    news: "News",
    gameplays: "Gameplays",
    olds: "Olders",
    music: "Musics",
    entertainment: "Entertainment",
    educational: "Educational",
    tourism: "Tourism",
    sports: "Sports",
    gastronomy: "Gastronomy",
    moviesseries: "Movies and Series",
    cartoonsanimated: "Cartoons Animated",
    documentaries: "Documentaries",
    animals: "Animals",
    radio: "Radio",
    esports: "Esports",
  },
};

export const getCategoryNameParsed = (
  code: CategoryCode,
  language: Language
): string => {
  return categoryTranslations[language]?.[code];
};
