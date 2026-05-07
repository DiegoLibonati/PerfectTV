import { getCategoryNameParsed } from "@/helpers/getCategoryNameParsed";

import { categoryTranslations } from "@/constants/languages";

describe("getCategoryNameParsed", () => {
  describe("english translations", () => {
    it("should return the english translation for news", () => {
      expect(getCategoryNameParsed("news", "en")).toBe("News");
    });

    it("should return the english translation for sports", () => {
      expect(getCategoryNameParsed("sports", "en")).toBe("Sports");
    });

    it("should return the english translation for entertainment", () => {
      expect(getCategoryNameParsed("entertainment", "en")).toBe("Entertainment");
    });

    it("should return the english translation for moviesseries", () => {
      expect(getCategoryNameParsed("moviesseries", "en")).toBe("Movies and Series");
    });

    it("should return the english translation for esports", () => {
      expect(getCategoryNameParsed("esports", "en")).toBe("Esports");
    });
  });

  describe("spanish translations", () => {
    it("should return the spanish translation for news", () => {
      expect(getCategoryNameParsed("news", "es")).toBe(categoryTranslations.es.news);
    });

    it("should return the spanish translation for sports", () => {
      expect(getCategoryNameParsed("sports", "es")).toBe(categoryTranslations.es.sports);
    });

    it("should return the spanish translation for music", () => {
      expect(getCategoryNameParsed("music", "es")).toBe(categoryTranslations.es.music);
    });

    it("should return the spanish translation for documentaries", () => {
      expect(getCategoryNameParsed("documentaries", "es")).toBe(
        categoryTranslations.es.documentaries
      );
    });
  });

  describe("all category codes", () => {
    const codes = [
      "news",
      "gameplays",
      "olds",
      "music",
      "entertainment",
      "educational",
      "tourism",
      "sports",
      "gastronomy",
      "moviesseries",
      "cartoonsanimated",
      "documentaries",
      "animals",
      "radio",
      "esports",
    ] as const;

    codes.forEach((code) => {
      it(`should return a non-empty string for code "${code}" in english`, () => {
        const result = getCategoryNameParsed(code, "en");
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThan(0);
      });

      it(`should return a non-empty string for code "${code}" in spanish`, () => {
        const result = getCategoryNameParsed(code, "es");
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThan(0);
      });
    });
  });
});
