import type { JSX } from "react";
import type { Language, Theme } from "@/types/app";

import Heading3 from "@/components/Heading3/Heading3";
import Select from "@/components/Select/Select";
import SelectOption from "@/components/SelectOption/SelectOption";
import ButtonFilled from "@/components/ButtonFilled/ButtonFilled";

import { useForm } from "@/hooks/useForm";
import { useClientContext } from "@/hooks/useClientContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTheme } from "@/hooks/useTheme";

import { languageTexts } from "@/constants/languages";
import { languages, LS_KEY_NAME_LANG, LS_KEY_NAME_THEME, themes } from "@/constants/vars";

const FormSettings = (): JSX.Element => {
  const { set, get } = useLocalStorage();
  const { color, bgOut, colorOut } = useTheme();
  const { formState, onSelectChange } = useForm({
    initialValueForm: {
      language: get(LS_KEY_NAME_LANG) as Language,
      theme: get(LS_KEY_NAME_THEME) as Theme,
    },
  });

  const { language, handleSetSideBar, handleSetLanguage, handleSetTheme } = useClientContext();

  const handleSubmitForm: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const language = formState.language;
    const theme = formState.theme;

    set(LS_KEY_NAME_LANG, language);
    handleSetLanguage(language);

    set(LS_KEY_NAME_THEME, theme);
    handleSetTheme(theme);

    handleSetSideBar(false);
  };

  return (
    <form
      className="relative flex flex-col gap-2 w-full h-full"
      onSubmit={(e) => {
        handleSubmitForm(e);
      }}
    >
      <Heading3 className={color}>{languageTexts[language].settings.language.title}</Heading3>
      <Select
        id="language"
        name="language"
        value={formState.language}
        className={`select-language ${bgOut} ${colorOut}`}
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

      <Heading3 className={color}>{languageTexts[language].settings.theme.title}</Heading3>
      <Select
        id="theme"
        name="theme"
        value={formState.theme}
        className={`select-theme ${bgOut} ${colorOut}`}
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
        className={`absolute bottom-0 w-full ${bgOut} ${colorOut}`}
      >
        {languageTexts[language].settings.success.text}
      </ButtonFilled>
    </form>
  );
};

export default FormSettings;
