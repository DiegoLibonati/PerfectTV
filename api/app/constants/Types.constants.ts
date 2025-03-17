import { Type } from "@app/entities/models";

export const CODE_PUBLIC = "public";
export const CODE_PRIVATE = "private";

const typesConstants: Pick<Type, "code" | "description">[] = [
  {
    code: CODE_PUBLIC,
    description: "Canales de Televisión Públicos",
  },
  { code: CODE_PRIVATE, description: "Canales de Televisión Privados" },
];

export default typesConstants;
