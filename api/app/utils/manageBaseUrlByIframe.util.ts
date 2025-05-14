import baseRepository from "@app/models/dataAccess/BaseRepository.model";
import { getSrcByIframe } from "@app/utils/getSrcByIframe.util";

export const manageBaseUrlByIframe = async (
  iframeUrl: string,
  sourceId: number
): Promise<boolean> => {
  try {
    const srcUrl = await getSrcByIframe(iframeUrl);
    const baseUrl = srcUrl.split("?")[0];

    console.log("BaseURL to update: ", baseUrl);

    const baseExists = await baseRepository.getBaseByIdSource(sourceId);

    if (!baseExists) {
      await baseRepository.createBase(baseUrl, sourceId);
      return true;
    }

    await baseRepository.updateBase(baseExists.id, { baseUrl: baseUrl });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
