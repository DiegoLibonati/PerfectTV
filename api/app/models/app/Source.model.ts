import { Base, Channel } from "@app/entities/models";

class Source {
  id: number;
  code: string;
  description: string;
  channels: Channel[];
  base: Base;

  constructor(
    id: number,
    code: string,
    description: string,
    channels: Channel[] = [],
    base: Base | null = null
  ) {
    this.id = id;
    this.code = code;
    this.description = description;
    this.channels = channels;
    this.base = base!;
  }
}

export default Source;
