import { Channel } from "@app/entities/models";

class Type {
  id: number;
  name: string;
  channels: Channel[];

  constructor(id: number, name: string, channels: Channel[] = []) {
    this.id = id;
    this.name = name;
    this.channels = channels;
  }
}

export default Type;
