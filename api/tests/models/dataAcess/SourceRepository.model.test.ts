import { Source } from "@app/entities/models";

import sourceRepository from "@app/models/dataAccess/SourceRepository.model";

describe("SourceRepository.model.ts", () => {
  const sourceTest: Pick<Source, "code" | "description"> = {
    code: "codeTestSourceRepository.model.ts",
    description: "code test SourceRepository.model.ts",
  };
  const sourcesTest: Pick<Source, "code" | "description">[] = [
    {
      code: "codeTest2SourceRepository.model.ts",
      description: "code test 2 SourceRepository.model.ts",
    },
  ];

  describe("General Tests.", () => {
    test("It must create a new source.", async () => {
      const source = await sourceRepository.createSource(
        sourceTest.code,
        sourceTest.description
      );

      expect(source.id).toBeTruthy();
      expect(source.code).toEqual(sourceTest.code);
      expect(source.description).toEqual(sourceTest.description);
    });

    test("It must obtain all sources.", async () => {
      const sources = await sourceRepository.getSources();

      expect(sources.length > 0).toBeTruthy();
      expect(sources.find((s) => s.code === sourceTest.code)).toBeTruthy();
    });

    test("It must get one source per code.", async () => {
      const source = await sourceRepository.getSourceByCode(sourceTest.code);

      expect(source!.id).toBeTruthy();
      expect(source!.code).toEqual(sourceTest.code);
      expect(source!.description).toEqual(sourceTest.description);
    });

    test("It must get one source per id.", async () => {
      const sourceByCode = await sourceRepository.getSourceByCode(
        sourceTest.code
      );
      const source = await sourceRepository.getSourceById(sourceByCode!.id);

      expect(source!.id).toBeTruthy();
      expect(source!.code).toEqual(sourceTest.code);
      expect(source!.description).toEqual(sourceTest.description);
    });

    test("It must add multiple sources through an array.", async () => {
      const sources = await sourceRepository.createSources(sourcesTest);

      expect(sources.count).toEqual(1);
    });

    test("It must delete all test sources created.", () => {
        sourcesTest.push(sourceTest)
      
        sourcesTest.forEach(async (s) => {
        const sourceByCode = await sourceRepository.getSourceByCode(s.code);
        const sourceDeleted = await sourceRepository.deleteSource(
          sourceByCode!.id
        );

        expect(sourceDeleted!.id).toBeTruthy();
        expect(sourceDeleted!.code).toEqual(s.code);
        expect(sourceDeleted!.description).toEqual(s.description);
      });
    });
  });
});
