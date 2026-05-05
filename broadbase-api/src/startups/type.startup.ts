import type { TypeCreatePayload } from "@/types/payloads";

import { TypeService } from "@/services/type.service";

export const TypesStartUp = async (payload: TypeCreatePayload[]): Promise<void> => {
  const types = await TypeService.getAllTypes();

  if (types.length) return;

  await TypeService.createManyTypes(payload);
};
