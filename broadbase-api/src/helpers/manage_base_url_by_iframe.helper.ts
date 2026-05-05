import { getSrcByIframe } from "@/helpers/get_src_by_iframe.helper";

import { BaseService } from "@/services/base.service";

export const manageBaseUrlByIframe = async (
  iframeUrl: string,
  idSource: number
): Promise<boolean> => {
  try {
    const srcUrl = await getSrcByIframe(iframeUrl);
    const baseUrl = srcUrl.split("?")[0] ?? srcUrl;

    await BaseService.upsertBaseByIdSource(idSource, baseUrl);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
