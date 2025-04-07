import { Base, Source } from "@app/entities/models";

import baseRepository from "@app/models/dataAccess/BaseRepository.model";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";

describe("BaseRepository.model.ts", () => {
  let source: Source | null;
  let source2: Source | null;
  let baseTest: Pick<Base, "baseUrl"> & { idSource: number };

  const sources: Pick<Source, "code" | "description">[] = [
    { code: "sourcitotest1", description: "paa" },
    { code: "sourcitotest2", description: "paa2" },
  ];
  const basesTest: (Pick<Base, "baseUrl"> & { idSource: number })[] = [];
  const newBaseUrl: string = "https://hola2.com";

  beforeAll(async () => {
    await sourceRepository.createSources(sources);

    source = await sourceRepository.getSourceByCode(sources[0].code);
    source2 = await sourceRepository.getSourceByCode(sources[1].code);

    baseTest = {
      baseUrl: "https://holasdasdaasdasd.com",
      idSource: source!.id,
    };
    basesTest.push({
      baseUrl: "https://hoasdasdasdasdla23.com",
      idSource: source2!.id,
    });
  });

  describe("General Tests.", () => {
    test("It must create a new base.", async () => {
      const base = await baseRepository.createBase(
        baseTest.baseUrl,
        baseTest.idSource
      );

      expect(base.id).toBeTruthy();
      expect(base.baseUrl).toEqual(baseTest.baseUrl);
      expect(base.source!.id).toEqual(baseTest.idSource);
    });

    test("It must obtain all bases.", async () => {
      const bases = await baseRepository.getBases();

      expect(bases.length > 0).toBeTruthy();
      expect(bases.find((b) => b.baseUrl === baseTest.baseUrl)).toBeTruthy();
    });

    test("It must get one base by idSource.", async () => {
      const base = await baseRepository.getBaseByIdSource(baseTest.idSource);

      expect(base!.id).toBeTruthy();
      expect(base!.baseUrl).toEqual(baseTest.baseUrl);
      expect({ ...base!.source, base: null }).toEqual(source);
    });

    test("It must get one base by id.", async () => {
      const baseByIdSource = await baseRepository.getBaseByIdSource(
        baseTest.idSource
      );
      const base = await baseRepository.getBaseById(baseByIdSource!.id);

      expect(base!.id).toBeTruthy();
      expect(base!.baseUrl).toEqual(baseTest.baseUrl);
      expect({ ...base!.source, base: null }).toEqual(source);
    });

    test("It must update a specific field of the base.", async () => {
      const baseByIdSource = await baseRepository.getBaseByIdSource(
        baseTest.idSource
      );
      const data = { baseUrl: newBaseUrl };

      const base = await baseRepository.updateBase(baseByIdSource!.id, data);

      expect(base!.id).toBeTruthy();
      expect(base!.baseUrl).toEqual(newBaseUrl);
      expect({ ...base!.source, base: null }).toEqual(source);
    });

    test("It must add multiple bases through an array.", async () => {
      const bases = await baseRepository.createBases(basesTest);

      expect(bases.count).toEqual(1);
    });

    test("It must delete all test bases created.", async () => {
      basesTest.push(baseTest);

      basesTest.forEach(async (b) => {
        const baseByIdSource = await baseRepository.getBaseByIdSource(
          b.idSource
        );

        const baseDeleted = await baseRepository.deleteBase(baseByIdSource!.id);
        await sourceRepository.deleteSource(b.idSource);

        if (baseDeleted.baseUrl !== newBaseUrl) {
          expect(baseDeleted!.baseUrl).toEqual(b.baseUrl);
        } else {
          expect(baseDeleted!.baseUrl).toEqual(newBaseUrl);
        }

        expect(baseDeleted!.id).toBeTruthy();
        expect(baseDeleted!.source!.id).toEqual(b.idSource);
      });
    });
  });
});
