import { Channel as ChannelT } from "@app/entities/models";

import Channel from "@app/models/app/Channel.model";

describe("Channel.model.ts", () => {
  const channelTest: ChannelT = {
    id: 2,
    name: "name",
    description: "description",
    thumbUrl: "https://logo.com/pepe.png",
    url: "urlcito",
    number: 23,
    type: {
      id: 1,
      code: "ft",
      description: "description test",
    },
    category: {
      id: 12,
      code: "ft cat",
      description: "description test cat",
    },
    source: {
      id: 15,
      code: "ft source ",
      description: "description test source",
    },
  };

  describe("General Tests.", () => {
    test("It must initialize the class correctly.", () => {
      const channel = new Channel(
        channelTest.id,
        channelTest.name,
        channelTest.description,
        channelTest.thumbUrl,
        channelTest.url,
        channelTest.number,
        channelTest.type,
        channelTest.category,
        channelTest.source
      );

      expect(channelTest.id).toEqual(channel.id);
      expect(channelTest.name).toEqual(channel.name);
      expect(channelTest.description).toEqual(channel.description);
      expect(channelTest.thumbUrl).toEqual(channel.thumbUrl);
      expect(channelTest.url).toEqual(channel.url);
      expect(channelTest.number).toEqual(channel.number);
      expect(channelTest.type).toEqual(channel.type);
      expect(channelTest.category).toEqual(channel.category);
      expect(channelTest.source).toEqual(channel.source);
    });
  });
});
