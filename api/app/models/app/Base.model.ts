import { Source } from "@app/entities/models";

class Base {
  id: number;
  baseUrl: string;
  source: Source;

  constructor(id: number, baseUrl: string, source: Source | null = null) {
    this.id = id;
    this.baseUrl = baseUrl;
    this.source = source!;
  }
}

export default Base;
