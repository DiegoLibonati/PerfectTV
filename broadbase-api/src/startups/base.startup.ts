import type { BaseCreatePayload } from "@/types/payloads";

import { BaseService } from "@/services/base.service";

export const BasesStartUp = async (payload: BaseCreatePayload[]): Promise<void> => {
  await BaseService.createManyBases(payload);
};
