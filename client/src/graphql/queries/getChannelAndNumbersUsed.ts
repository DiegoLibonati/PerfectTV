import { gql } from "@apollo/client";

export default gql`
  query getChannelAndNumbersUsed($number: Int!, $reload: Boolean) {
    numbers {
      code
      data
    }
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
