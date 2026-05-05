import type { BaseCreatePayload } from "@/types/payloads";
import type { DefaultBase } from "@/types/defaults";

import { SourceService } from "@/services/source.service";

export const getBasesConstantsParsed = async (
  defaultBases: DefaultBase[]
): Promise<BaseCreatePayload[]> => {
  const codes = [...new Set(defaultBases.map((b) => b.codeSource))];
  const sources = await SourceService.getSourcesByCodes(codes);
  const sourceMap = new Map(sources.map((s) => [s.code, s]));

  return defaultBases.map((defaultBase) => ({
    baseUrl: defaultBase.baseUrl,
    idSource: sourceMap.get(defaultBase.codeSource)!.id,
  }));
};
