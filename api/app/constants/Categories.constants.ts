import { Category } from "@app/entities/models";

export const CODE_NEWS = "news"

const categoriesConstants: Pick<Category, "code" | "description">[] = [
  {
    code: CODE_NEWS,
    description: "Canales de Televisión de Noticias",
  },
];

export default categoriesConstants;
