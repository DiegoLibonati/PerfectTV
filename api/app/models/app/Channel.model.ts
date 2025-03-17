import { Category, Source, Type } from "@app/entities/models";

class Channel {
  id: number;
  name: string;
  description: string;
  thumbUrl: string;
  url: string;
  number: number;
  type: Type;
  category: Category;
  source: Source;

  constructor(
    id: number,
    name: string,
    description: string,
    thumbUrl: string,
    url: string,
    number: number,
    type: Type,
    category: Category,
    source: Source
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.thumbUrl = thumbUrl;
    this.url = url;
    this.number = number;
    this.type = type;
    this.category = category;
    this.source = source;
  }
}

export default Channel;
