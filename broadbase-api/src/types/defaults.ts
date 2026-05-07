export interface DefaultBase {
  baseUrl: string;
  codeSource: string;
}

export interface DefaultChannel {
  name: string;
  description: string;
  thumbUrl: string;
  url: string;
  urlRest: string | null;
  number: number;
  codeType: string;
  codeCategory: string;
  codeSource: string;
}
