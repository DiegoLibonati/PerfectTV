import type { TypeCreatePayload } from "@/types/payloads";

import { TypeService } from "@/services/type.service";

export const TypesStartUp = async (payload: TypeCreatePayload[]): Promise<void> => {
  await TypeService.createManyTypes(payload);
};
