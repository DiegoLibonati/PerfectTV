import { getSrcByIframe } from "@src/helpers/get_src_by_iframe.helper";

import { BaseService } from "@src/services/base.service";

export const manageBaseUrlByIframe = async (
  iframeUrl: string,
  idSource: number
): Promise<boolean> => {
  try {
    const srcUrl = await getSrcByIframe(iframeUrl);
    const baseUrl = srcUrl.split("?")[0];

    console.log("BaseURL to update: ", baseUrl);

    const baseExists = await BaseService.getBaseByIdSource(idSource);

    if (!baseExists) {
      await BaseService.createBase({baseUrl: baseUrl, idSource: idSource});
      return true;
    }

    await BaseService.updateBase(baseExists.id, { baseUrl: baseUrl });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
