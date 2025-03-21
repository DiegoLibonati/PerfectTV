import { Base } from "@app/entities/models";

import { CODE_YOUTUBE } from "@app/constants/Sources.constants";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";

const basesConstants: (Pick<Base, "baseUrl"> & { codeSource: string })[] = [
  {
    codeSource: CODE_YOUTUBE,
    baseUrl: "https://www.youtube.com/embed/live_stream",
  },
];

const getBasesConstantsParsed = async (): Promise<
  (Pick<Base, "baseUrl"> & {
    idSource: number;
  })[]
> => {
  return await Promise.all(
    basesConstants.map(async (baseConstant) => {
      const source = await sourceRepository.getSourceByCode(
        baseConstant.codeSource
      );

      return {
        baseUrl: baseConstant.baseUrl,
        idSource: source!.id,
      };
    })
  );
};

export default getBasesConstantsParsed;
