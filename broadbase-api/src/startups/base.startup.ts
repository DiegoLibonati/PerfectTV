import type { BaseCreatePayload } from "@/types/payloads";

import { BaseService } from "@/services/base.service";

export const BasesStartUp = async (payload: BaseCreatePayload[]): Promise<void> => {
  const bases = await BaseService.getAllBases();

  if (bases.length) return;

  await BaseService.createManyBases(payload);
};
