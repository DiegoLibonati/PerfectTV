import { gql } from "@apollo/client";

export default gql`
  query getChannel($numberChannel: Int) {
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
