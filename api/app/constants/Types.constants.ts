import { Type } from "@app/entities/models";

export const typesConstants: Pick<Type, "code" | "description">[] = [
  {
    code: "public",
    description: "Canales de Televisión Públicos",
  },
  { code: "private", description: "Canales de Televisión Privados" },
];
