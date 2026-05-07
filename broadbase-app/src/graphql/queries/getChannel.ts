import { gql } from "@apollo/client";

export default gql`
  query getChannel($number: Int, $reload: Boolean) {
    channel(number: $number, reload: $reload) {
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
