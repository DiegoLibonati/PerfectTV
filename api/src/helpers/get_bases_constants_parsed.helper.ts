import { BaseFlat } from "@src/entities/app";
import { DefaultBase } from "@src/entities/defaults";

import { SourceService } from "@src/services/source.service";

export const getBasesConstantsParsed = async (
  defaultBases: DefaultBase[]
): Promise<BaseFlat[]> => {
  return await Promise.all(
    defaultBases.map(async (defaultBase) => {
      const source = await SourceService.getSourceByCode(
        defaultBase.codeSource
      );

      return {
        baseUrl: defaultBase.baseUrl,
        idSource: source!.id,
      };
    })
  );
};
