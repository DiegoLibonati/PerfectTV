import type { CategoryCode, Language } from "@/types/app";
import type { TranslationKeys } from "@/types/constants";

export const languageTexts: Record<Language, TranslationKeys> = {
  en: {
    channels: {
      loading: "Loading channels.",
      error: {
        obtaining: "An error occurred while obtaining channels.",
      },
      notChannels: "There are no channels to display.",
    },
    channel: {
      loading: "Loading channel.",
      noActive: "There is no active channel to display.",
      error: {
        obtaining: "An error occurred while obtaining a channel.",
      },
    },
    settings: {
      title: "Broadbase Settings",
      close: "Close",
      success: {
        text: "Save",
      },
      language: {
        title: "Change language",
      },
      theme: {
        title: "Change color theme",
      },
    },
  },
  es: {
    channels: {
      loading: "Cargando canales.",
      error: {
        obtaining: "Ocurrió un error a la hora de obtener canales.",
      },
      notChannels: "No hay canales para mostrar.",
    },
    channel: {
      loading: "Cargando canal.",
      noActive: "No hay un canal activo para mostrar.",
      error: {
        obtaining: "Ocurrió un error a la hora de obtener un canal.",
      },
    },
    settings: {
      title: "Configuración Broadbase",
      close: "Cerrar",
      success: {
        text: "Guardar",
      },
      language: {
        title: "Cambiar lenguaje",
      },
      theme: {
        title: "Cambiar tema",
      },
    },
  },
};

export const categoryTranslations: Record<Language, Record<CategoryCode, string>> = {
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
