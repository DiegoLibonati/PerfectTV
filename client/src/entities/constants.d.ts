export type TranslationKeys = {
  channels: {
    loading: string;
    error: {
      obtaining: string;
    };
    notChannels: string;
  };
  channel: {
    loading: string;
    noActive: string;
    error: {
      obtaining: string;
    };
  };
  settings: {
    title: string;
    close: string;
    language: {
      title: string;
    };
    theme: {
      title: string;
    };
    success: {
      text: string;
    };
  };
};

export type CategoryCode =
  | "news"
  | "gameplays"
  | "olds"
  | "music"
  | "entertainment"
  | "educational"
  | "tourism"
  | "sports"
  | "gastronomy"
  | "moviesseries"
  | "cartoonsanimated"
  | "documentaries"
  | "animals"
  | "radio"
  | "esports";
