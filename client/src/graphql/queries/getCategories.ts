import { gql } from "@apollo/client";

export default gql`
  query getCategories {
    categories {
      code
      data {
        id
        code
        channels {
            id
            name
            description
            number
            thumbUrl
        }
      }
    }
  }
`;
