import { Channel } from "@app/entities/models";

class Category {
  id: number;
  code: string;
  description: string;
  channels: Channel[];

  constructor(
    id: number,
    code: string,
    description: string,
    channels: Channel[] = []
  ) {
    this.id = id;
    this.code = code;
    this.description = description;
    this.channels = channels;
  }
}

export default Category;
