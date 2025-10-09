import { BaseFlat } from "@src/entities/app";

import { BaseService } from "@src/services/base.service";

export const BasesStartUp = async (
  basesFlat: BaseFlat[]
): Promise<void> => {
  const bases = await BaseService.getAllBases();

  if (bases.length) return;

  await BaseService.createManyBases(basesFlat);
};
