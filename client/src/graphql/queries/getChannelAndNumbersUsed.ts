import { gql } from "@apollo/client";

export default gql`
  query getChannelAndNumbersUsed($numberChannel: Int!) {
    numbers: channels {
      code
      data {
        id
        number
      }
    }
    channel(numberChannel: $numberChannel) {
      code
      data {
        id
        name
        description
        number
        url
        thumbUrl
        source {
          id
          code
        }
      }
    }
  }
`;
