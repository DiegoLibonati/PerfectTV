import { TypeFlat } from "@src/entities/app";

import { TypeService } from "@src/services/type.service";

export const TypesStartUp = async (typesFlat: TypeFlat[]): Promise<void> => {
  const types = await TypeService.getAllTypes();

  if (types?.length) return;

  await TypeService.createManyTypes(typesFlat);
};
