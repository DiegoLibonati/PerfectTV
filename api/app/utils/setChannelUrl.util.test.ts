import { Channel, Source } from "@app/entities/models";

import channelRepository from "@app/models/dataAccess/ChannelRepository.model";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";

import { setChannelUrl } from "@app/utils/setChannelUrl.util";

describe("setChannelUrl.util.ts", () => {
  let source: Source;
  let idChannelTest: number;

  const sourceTest: Pick<Source, "code" | "description"> = {
    code: "sourceTestsetChannelUrl",
    description: "source test setChannelUrl",
  };

  const channelTest: Record<string, string | number> = {
    name: "name",
    description: "description",
    thumbUrl: "https://logo.com/pepe.png",
    url: "url",
    urlRest: "32",
    number: 233,
    idType: 1,
    idCategory: 1,
  };

  beforeAll(async () => {
    source = await sourceRepository.createSource(
      sourceTest.code,
      sourceTest.description
    );
    const channel = await channelRepository.createChannel(
      channelTest.name as string,
      channelTest.description as string,
      channelTest.thumbUrl as string,
      channelTest.url as string,
      channelTest.urlRest as string,
      channelTest.number as number,
      channelTest.idType as number,
      channelTest.idCategory as number,
      source.id
    );
    idChannelTest = channel.id;
  });

  afterAll(async () => {
    await channelRepository.deleteChannel(idChannelTest);
    await sourceRepository.deleteSource(source.id);
  });

  describe("If code exists.", () => {
    test("It should return the updated channels based on the new URLs set.", async () => {
      const channel: Channel | null = await channelRepository.getChannelById(
        idChannelTest
      );
      const baseUrl = "https://hola.com/";

      const newChannelTest = await setChannelUrl(channel!, baseUrl);

      expect(newChannelTest.url).toBe(`${baseUrl}${channelTest.urlRest}`);
    });
  });

  describe("If code not exists.", () => {
    test("It must return the same channels that were entered.", async () => {
      const channel: Channel | null = await channelRepository.getChannelById(
        idChannelTest
      );
      const baseUrl = "https://hola.com/";

      const newChannelTest = await setChannelUrl(channel!, baseUrl);

      expect(newChannelTest.url).toBe(channel!.url);
    });
  });
});
