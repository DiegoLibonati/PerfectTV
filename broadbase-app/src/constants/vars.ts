import type { Combo, Language, Theme } from "@/types/app";

export const LS_KEY_NAME_LAST_NUMBER_CHANNEL = "last_number_channel";
export const LS_KEY_NAME_LANG = "lang";
export const LS_KEY_NAME_THEME = "theme";

export const DEFAULT_CHANNEL_NUMBER = 1;

export const languages: Combo<Language>[] = [
  { id: "es", text: "Spanish" },
  { id: "en", text: "English" },
];

export const themes: Combo<Theme>[] = [
  { id: "light", text: "Light" },
  { id: "dark", text: "Dark" },
];
