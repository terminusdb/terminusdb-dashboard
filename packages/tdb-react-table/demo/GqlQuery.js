
import {gql} from "@apollo/client";

export const COLOR_QUERY = gql`
  query ColorQuery($offset: Int, $limit: Int) {
    Color(offset: $offset, limit: $limit) {
        id
        rgb
        name
    }
}`