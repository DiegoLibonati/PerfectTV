import { SourceFlat } from "@src/entities/app";

import { SourceService } from "@src/services/source.service";

export const SourcesStartUp = async (
  sourcesFlat: SourceFlat[]
): Promise<void> => {
  const sources = await SourceService.getAllSources();

  if (sources.length) return;

  await SourceService.createManySources(sourcesFlat);
};
