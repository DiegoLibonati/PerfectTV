import { BaseFlat } from "@src/entities/app";
import { DefaultBase } from "@src/entities/defaults";

import { getBasesConstantsParsed } from "@src/helpers/get_bases_constants_parsed.helper";
import { SourceService } from "@src/services/source.service";

jest.mock("@src/services/source.service");

describe("getBasesConstantsParsed.helper.ts", () => {
  test("It should return an array of BaseFlat with parsed baseUrl and idSource", async () => {
    const mockSources = [
      { id: 1, code: "SRC_ONE", description: "Source One" },
      { id: 2, code: "SRC_TWO", description: "Source Two" },
    ];

    const mockDefaultBases: DefaultBase[] = [
      { baseUrl: "https://example.com/base1", codeSource: "SRC_ONE" },
      { baseUrl: "https://example.com/base2", codeSource: "SRC_TWO" },
    ];

    (SourceService.getSourceByCode as jest.Mock).mockImplementation(
      async (code: string) => mockSources.find((src) => src.code === code)
    );

    const result = await getBasesConstantsParsed(mockDefaultBases);

    expect(result).toEqual<BaseFlat[]>([
      { baseUrl: "https://example.com/base1", idSource: 1 },
      { baseUrl: "https://example.com/base2", idSource: 2 },
    ]);
  });

  test("It should handle empty defaultBases array and return an empty array", async () => {
    const result = await getBasesConstantsParsed([]);
    expect(result).toEqual([]);
  });

  test("It should throw if SourceService.getSourceByCode returns null", async () => {
    (SourceService.getSourceByCode as jest.Mock).mockResolvedValueOnce(null);

    const mockDefaultBases: DefaultBase[] = [
      { baseUrl: "https://example.com/base1", codeSource: "SRC_UNKNOWN" },
    ];

    await expect(getBasesConstantsParsed(mockDefaultBases)).rejects.toThrow();
  });
});
