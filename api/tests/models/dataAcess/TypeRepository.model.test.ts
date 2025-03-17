import { Type } from "@app/entities/models";

import typeRepository from "@app/models/dataAccess/TypeRepository.model";

describe("TypeRepository.model.ts", () => {
  const typeTest: Pick<Type, "code" | "description"> = {
    code: "codeTestTypeRepository.model.ts",
    description: "code test TypeRepository.model.ts",
  };
  const typesTest: Pick<Type, "code" | "description">[] = [
    {
      code: "codeTest2TypeRepository.model.ts",
      description: "code test 2 TypeRepository.model.ts",
    },
  ];

  describe("General Tests.", () => {
    test("It must create a new type.", async () => {
      const type = await typeRepository.createType(
        typeTest.code,
        typeTest.description
      );

      expect(type.id).toBeTruthy();
      expect(type.code).toEqual(typeTest.code);
      expect(type.description).toEqual(typeTest.description);
    });

    test("It must obtain all types.", async () => {
      const types = await typeRepository.getTypes();

      expect(types.length > 0).toBeTruthy();
      expect(types.find((t) => t.code === typeTest.code)).toBeTruthy();
    });

    test("It must get one type per code.", async () => {
      const type = await typeRepository.getTypeByCode(typeTest.code);

      expect(type!.id).toBeTruthy();
      expect(type!.code).toEqual(typeTest.code);
      expect(type!.description).toEqual(typeTest.description);
    });

    test("It must get one type per id.", async () => {
      const typeByCode = await typeRepository.getTypeByCode(
        typeTest.code
      );
      const type = await typeRepository.getTypeById(typeByCode!.id);

      expect(type!.id).toBeTruthy();
      expect(type!.code).toEqual(typeTest.code);
      expect(type!.description).toEqual(typeTest.description);
    });

    test("It must add multiple types through an array.", async () => {
      const types = await typeRepository.createTypes(typesTest);

      expect(types.count).toEqual(1);
    });

    test("It must delete all test types created.", () => {
        typesTest.push(typeTest)
      
        typesTest.forEach(async (t) => {
        const typeByCode = await typeRepository.getTypeByCode(t.code);
        const typeDeleted = await typeRepository.deleteType(
          typeByCode!.id
        );

        expect(typeDeleted!.id).toBeTruthy();
        expect(typeDeleted!.code).toEqual(t.code);
        expect(typeDeleted!.description).toEqual(t.description);
      });
    });
  });
});
