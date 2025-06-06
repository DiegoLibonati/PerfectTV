import { gql } from "@apollo/client";

export default gql`
  query getChannelAndNumbersUsed($numberChannel: Int!, $reload: Boolean) {
    numbers {
      code
      data
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
