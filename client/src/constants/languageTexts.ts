import { Language } from "@/src/entities/client";
import { TranslationKeys } from "@/src/entities/constants";

export const languageTexts: Record<Language, TranslationKeys> = {
  en: {
    channels: {
      loading: "Loading channels.",
      error: {
        obtaining: "An error occurred when obtaining channels.",
      },
    },
    channel: {
      loading: "Loading channel.",
      noActive: "There is no active channel to display.",
      error: {
        obtaining: "An error occurred when obtaining a channel.",
      },
    },
    settings: {
      title: "Settings PerfectTV",
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
    },
    channel: {
      loading: "Cargando canal.",
      noActive: "No hay un canal activo para mostrar.",
      error: {
        obtaining: "Ocurrió un error a la hora de obtener un canal.",
      },
    },
    settings: {
      title: "Configuración PerfectTV",
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
