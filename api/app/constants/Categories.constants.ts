import { Category } from "@app/entities/models";

export const categoriesConstants: Pick<Category, "code" | "description">[] = [
  {
    code: "news",
    description: "Canales de Televisión de Noticias"
  },
];
