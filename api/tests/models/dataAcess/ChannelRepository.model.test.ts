import { Category, Channel, Source, Type } from "@app/entities/models";

import categoryRepository from "@app/models/dataAccess/CategoryRepository.model";
import channelRepository from "@app/models/dataAccess/ChannelRepository.model";
import sourceRepository from "@app/models/dataAccess/SourceRepository.model";
import typeRepository from "@app/models/dataAccess/TypeRepository.model";

describe("ChannelRepository.model.ts", () => {
  let types: Pick<Type, "id" | "code" | "description">[];
  let categories: Pick<Category, "id" | "code" | "description">[];
  let sources: Pick<Source, "id" | "code" | "description">[];
  let channelType: number;
  let channelCategory: number;
  let channelSource: number;

  const newUrl = "https://asd.com";
  const channelTest: Omit<Channel, "id" | "source" | "category" | "type"> = {
    name: "channelTest name",
    description: "channelTest description",
    thumbUrl: "https://logo23.com/pepe.png",
    url: "https://PROBANDO.test/channel",
    urlRest: "",
    number: 9999991,
  };

  beforeAll(async () => {
    types = await typeRepository.getTypes();
    categories = await categoryRepository.getCategories();
    sources = await sourceRepository.getSources();

    if (!types.length || !categories.length || !sources.length)
      throw "Add types, sources and categories firts.";

    channelType = types[0].id;
    channelCategory = categories[0].id;
    channelSource = sources[0].id;
  });

  describe("General Tests.", () => {
    test("It must create a new channel.", async () => {
      const channel = await channelRepository.createChannel(
        channelTest.name,
        channelTest.description,
        channelTest.thumbUrl,
        channelTest.url,
        channelTest.urlRest!,
        channelTest.number,
        channelType,
        channelCategory,
        channelSource
      );

      expect(channel.id).toBeTruthy();
      expect(channel.name).toEqual(channelTest.name);
      expect(channel.description).toEqual(channelTest.description);
      expect(channel.thumbUrl).toEqual(channelTest.thumbUrl);
      expect(channel.url).toEqual(channelTest.url);
      expect(channel.urlRest).toEqual(channelTest.urlRest);
      expect(channel.number).toEqual(channelTest.number);
      expect(channel.type?.id).toEqual(channelType);
      expect(channel.category?.id).toEqual(channelCategory);
      expect(channel.source?.id).toEqual(channelSource);
    });

    test("It must obtain all channels.", async () => {
      const channels = await channelRepository.getChannels();

      expect(channels.length > 0).toBeTruthy();
      expect(
        channels.find(
          (c) =>
            c.name === channelTest.name &&
            c.number === channelTest.number &&
            c.url === channelTest.url
        )
      ).toBeTruthy();
    });

    test("It must get one channel by name and number.", async () => {
      const channel = await channelRepository.getChannelByNameNumber(
        channelTest.name,
        channelTest.number
      );

      expect(channel!.id).toBeTruthy();
      expect(channel!.name).toEqual(channelTest.name);
      expect(channel!.description).toEqual(channelTest.description);
      expect(channel!.thumbUrl).toEqual(channelTest.thumbUrl);
      expect(channel!.url).toEqual(channelTest.url);
      expect(channel!.urlRest).toEqual(channelTest.urlRest);
      expect(channel!.number).toEqual(channelTest.number);
      expect(channel!.type?.id).toEqual(channelType);
      expect(channel!.category?.id).toEqual(channelCategory);
      expect(channel!.source?.id).toEqual(channelSource);
    });

    test("It must get one channel by id.", async () => {
      const channelByNameNumberUrl =
        await channelRepository.getChannelByNameNumber(
          channelTest.name,
          channelTest.number
        );
      const channel = await channelRepository.getChannelById(
        channelByNameNumberUrl!.id
      );

      expect(channel!.id).toBeTruthy();
      expect(channel!.name).toEqual(channelTest.name);
      expect(channel!.description).toEqual(channelTest.description);
      expect(channel!.thumbUrl).toEqual(channelTest.thumbUrl);
      expect(channel!.url).toEqual(channelTest.url);
      expect(channel!.urlRest).toEqual(channelTest.urlRest);
      expect(channel!.number).toEqual(channelTest.number);
      expect(channel!.type?.id).toEqual(channelType);
      expect(channel!.category?.id).toEqual(channelCategory);
      expect(channel!.source?.id).toEqual(channelSource);
    });

    test("It must update a specific field of the channel.", async () => {
      const channelByNameNumberUrl =
        await channelRepository.getChannelByNameNumber(
          channelTest.name,
          channelTest.number
        );
      const data = { url: newUrl };

      const channel = await channelRepository.updateChannel(
        channelByNameNumberUrl!.id,
        data
      );

      expect(channel!.id).toBeTruthy();
      expect(channel!.name).toEqual(channelTest.name);
      expect(channel!.description).toEqual(channelTest.description);
      expect(channel!.thumbUrl).toEqual(channelTest.thumbUrl);
      expect(channel!.url).toEqual(newUrl);
      expect(channel!.urlRest).toEqual(channelTest.urlRest);
      expect(channel!.number).toEqual(channelTest.number);
      expect(channel!.type?.id).toEqual(channelType);
      expect(channel!.category?.id).toEqual(channelCategory);
      expect(channel!.source?.id).toEqual(channelSource);
    });

    test("It must delete all test channel created.", async () => {
      const channelByNameNumberUrl =
        await channelRepository.getChannelByNameNumber(
          channelTest.name,
          channelTest.number
        );

      const channelDeleted = await channelRepository.deleteChannel(
        channelByNameNumberUrl!.id
      );

      expect(channelDeleted!.id).toBeTruthy();
      expect(channelDeleted!.name).toEqual(channelTest.name);
      expect(channelDeleted!.description).toEqual(channelTest.description);
      expect(channelDeleted!.thumbUrl).toEqual(channelTest.thumbUrl);
      expect(channelDeleted!.url).toEqual(newUrl);
      expect(channelDeleted!.urlRest).toEqual(channelTest.urlRest);
      expect(channelDeleted!.number).toEqual(channelTest.number);
      expect(channelDeleted!.type?.id).toEqual(channelType);
      expect(channelDeleted!.category?.id).toEqual(channelCategory);
      expect(channelDeleted!.source?.id).toEqual(channelSource);
    });
  });
});
