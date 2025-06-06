import { gql } from "@apollo/client";

export default gql`
  query getChannel($numberChannel: Int, $reload: Boolean) {
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
