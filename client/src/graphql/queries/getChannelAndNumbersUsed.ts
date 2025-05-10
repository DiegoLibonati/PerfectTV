import { gql } from "@apollo/client";

export default gql`
  query getChannelAndNumbersUsed($numberChannel: Int!, $reload: Boolean) {
    numbers: channels {
      code
      data {
        id
        number
      }
    }
    channel(numberChannel: $numberChannel, reload: $reload) {
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
