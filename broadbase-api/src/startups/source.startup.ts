import { SourceCreatePayload } from "@/types/payloads";

import { SourceService } from "@/services/source.service";

export const SourcesStartUp = async (
  payload: SourceCreatePayload[]
): Promise<void> => {
  const sources = await SourceService.getAllSources();

  if (sources.length) return;

  await SourceService.createManySources(payload);
};
