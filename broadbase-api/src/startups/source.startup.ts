import type { SourceCreatePayload } from "@/types/payloads";

import { SourceService } from "@/services/source.service";

export const SourcesStartUp = async (payload: SourceCreatePayload[]): Promise<void> => {
  await SourceService.createManySources(payload);
};
