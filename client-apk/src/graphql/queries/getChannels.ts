import { gql } from "@apollo/client";

export default gql`
  query getChannels($reload: Boolean) {
    channels(reload: $reload) {
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
