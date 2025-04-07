import { FormSettings as FormSettingsT } from "@/src/entities/forms";
import { Language, Theme } from "@/src/entities/client";

import { Heading3 } from "@/src/components/Heading3/Heading3";
import { Select } from "@/src/components/Select/Select";
import { SelectOption } from "@/src/components/SelectOption/SelectOption";
import { ButtonFilled } from "@/src/components/ButtonFilled/ButtonFilled";

import { useClientContext } from "@/src/contexts/Client/ClientProvider";

import { useForm } from "@/src/hooks/useForm";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";

import { languageTexts } from "@/src/constants/languageTexts";
import {
  languages,
  LS_KEY_NAME_LANG,
  LS_KEY_NAME_THEME,
  themes,
} from "@/src/constants/general";

const INITIAL_FORM: FormSettingsT = {
  language: (localStorage.getItem(LS_KEY_NAME_LANG) as Language) || "es",
  theme: (localStorage.getItem(LS_KEY_NAME_THEME) as Theme) || "dark",
};

export const FormSettings = () => {
  const { formState, onSelectChange } = useForm({
    initialValueForm: INITIAL_FORM,
  });
  const { set } = useLocalStorage();

  const { language, handleSetSideBar, handleSetLanguage, handleSetTheme } =
    useClientContext();

  const handleSubmitForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const language = formState.language;
    const theme = formState.theme;

    set(LS_KEY_NAME_LANG, language);
    handleSetLanguage(language);

    set(LS_KEY_NAME_THEME, theme);
    handleSetTheme(theme);

    handleSetSideBar({ open: false });
  };

  return (
    <form
      className="relative flex flex-col gap-2 w-full h-full"
      onSubmit={handleSubmitForm}
    >
      <Heading3> {languageTexts[language].settings.language.title}</Heading3>
      <Select
        id="language"
        name="language"
        value={formState.language}
        onChange={onSelectChange}
      >
        {languages.map((lang) => {
          return (
            <SelectOption key={lang.id} value={lang.id}>
              {lang.text}
            </SelectOption>
          );
        })}
      </Select>

      <Heading3> {languageTexts[language].settings.theme.title}</Heading3>
      <Select
        id="theme"
        name="theme"
        value={formState.theme}
        onChange={onSelectChange}
      >
        {themes.map((theme) => {
          return (
            <SelectOption key={theme.id} value={theme.id}>
              {theme.text}
            </SelectOption>
          );
        })}
      </Select>

      <ButtonFilled
        ariaLabel="Save changes"
        type="submit"
        className="absolute bottom-0 w-full"
      >
        {languageTexts[language].settings.success.text}
      </ButtonFilled>
    </form>
  );
};
