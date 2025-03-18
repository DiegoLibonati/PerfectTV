import { Base, Source } from "@app/entities/models";

import baseRepository from "@app/models/dataAccess/BaseRepository.model";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";

describe("BaseRepository.model.ts", () => {
  let source: Source;

  const baseTest: Pick<Base, "baseUrl"> = {
    baseUrl: "https://hola.com",
  };
  const newBaseUrl: string = "https://hola2.com"

  beforeAll(async () => {
    const sources = await sourceRepository.getSources();

    if (!sources.length) throw "Add sources firts.";

    source = sources[0];
  });

  describe("General Tests.", () => {
    test("It must create a new base.", async () => {
      const base = await baseRepository.createBase(baseTest.baseUrl, source.id);

      expect(base.id).toBeTruthy();
      expect(base.baseUrl).toEqual(baseTest.baseUrl);
      expect(base.source).toEqual(source);
    });

    test("It must obtain all bases.", async () => {
      const bases = await baseRepository.getBases();

      expect(bases.length > 0).toBeTruthy();
      expect(bases.find((b) => b.baseUrl === baseTest.baseUrl)).toBeTruthy();
    });

    test("It must get one source by idSource.", async () => {
      const base = await baseRepository.getBaseByIdSource(source.id);

      expect(base!.id).toBeTruthy();
      expect(base!.baseUrl).toEqual(baseTest.baseUrl);
      expect(base!.source).toEqual(source);
    });

    test("It must get one base by id.", async () => {
      const baseByIdSource = await baseRepository.getBaseByIdSource(source!.id);
      const base = await baseRepository.getBaseById(baseByIdSource!.id);

      expect(base!.id).toBeTruthy();
      expect(base!.baseUrl).toEqual(baseTest.baseUrl);
      expect(base!.source).toEqual(source);
    });

    test("It must update a specific field of the base.", async () => {
      const baseByIdSource = await baseRepository.getBaseByIdSource(source!.id);
      const data = { baseUrl: newBaseUrl };

      const base = await baseRepository.updateBase(
        baseByIdSource!.id,
        data
      );

      expect(base!.id).toBeTruthy();
      expect(base!.baseUrl).toEqual(newBaseUrl);
      expect(base!.source).toEqual(source);
    });

    test("It must delete all test bases created.", async () => {
      const baseByIdSource = await baseRepository.getBaseByIdSource(source!.id);
      const baseDeleted = await baseRepository.deleteBase(baseByIdSource!.id);

      expect(baseDeleted!.id).toBeTruthy();
      expect(baseDeleted!.baseUrl).toEqual(newBaseUrl);
      expect(baseDeleted!.source).toEqual(source);
    });
  });
});
