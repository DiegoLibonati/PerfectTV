import { describe, expect, test } from "vitest";

import { Language } from "@src/entities/app";
import { CategoryCode } from "@src/entities/constants";

import { getCategoryNameParsed } from "@src/helpers/getCategoryNameParsed";

describe("getCategoryNameParsed.ts", () => {
  describe("If category exists.", () => {
    test("It should return the correct translation for the given category code and language", () => {
      const categoryCode: CategoryCode = "news";
      const language: Language = "es";

      const result = getCategoryNameParsed(categoryCode, language);

      expect(result).toBe("Noticias");
    });

    test("It should return the correct translation for a different category code and language", () => {
      const categoryCode: CategoryCode = "gameplays";
      const language: Language = "en";

      const result = getCategoryNameParsed(categoryCode, language);

      expect(result).toBe("Gameplays");
    });
  });

  describe("If category no exists.", () => {
    test("It should return undefined if the category code does not exist for the given language", () => {
      const categoryCode: CategoryCode = "nonexistent" as CategoryCode;
      const language: Language = "es";

      const result = getCategoryNameParsed(categoryCode, language);

      expect(result).toBeUndefined();
    });

    test("It should return undefined if the language does not exist for the given category code", () => {
      const categoryCode: CategoryCode = "news";
      const language: Language = "fr" as Language;

      const result = getCategoryNameParsed(categoryCode, language);

      expect(result).toBeUndefined();
    });
  });
});
