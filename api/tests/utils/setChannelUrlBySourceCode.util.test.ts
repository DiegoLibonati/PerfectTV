import { setChannelUrlBySourceCode } from "@app/utils/setChannelUrlBySourceCode.util";
import { Channel, Source } from "@app/entities/models";
import channelRepository from "@app/models/dataAccess/ChannelRepository.model";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";

describe("setChannelUrlBySourceCode.util.ts", () => {
  let source: Source;
  let idChannelTest: number;

  const sourceTest: Pick<Source, "code" | "description"> = {
    code: "sourceTestsetChannelUrlBySourceCode",
    description: "source test setChannelUrlBySourceCode",
  };

  const channelTest: Record<string, string | number> = {
    name: "name",
    description: "description",
    thumbUrl: "https://logo.com/pepe.png",
    url: "url",
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
      const channels: Channel[] = await channelRepository.getChannels();
      const channelTest = channels.find(
        (channel) => channel.id === idChannelTest
      )!;
      const sourceById = await sourceRepository.getSourceById(source.id);
      const baseUrl = "https://hola.com/";

      const newChannels = await setChannelUrlBySourceCode(
        channels,
        sourceById!.code,
        baseUrl
      );

      const newChannelTest = newChannels.find(
        (channel) => channel.id === idChannelTest
      )!;

      expect(newChannelTest.url).toBe(`${baseUrl}${channelTest.url}`);
    });
  });

  describe("If code not exists.", () => {
    test("It must return the same channels that were entered.", async () => {
      const channels: Channel[] = await channelRepository.getChannels();
      const channelTest = channels.find(
        (channel) => channel.id === idChannelTest
      )!;
      const code = "code not exists";
      const baseUrl = "https://hola.com/";

      const newChannels = await setChannelUrlBySourceCode(
        channels,
        code,
        baseUrl
      );

      const newChannelTest = newChannels.find(
        (channel) => channel.id === idChannelTest
      )!;

      expect(newChannelTest.url).toBe(channelTest.url);
    });
  });
});
