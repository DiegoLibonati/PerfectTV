import { Type } from "@app/entities/models";

export const typesConstants: Pick<Type, "name">[] = [
  {
    name: "public",
  },
  { name: "private" },
];
