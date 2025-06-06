import { gql } from "@apollo/client";

export default gql`
  query getNumbersUsed {
    channels {
      code
      data {
        id
        number
      }
    }
  }
`;
