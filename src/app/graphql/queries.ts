import { gql } from "apollo-angular";
//For Get all users
export const GET_ALL_USERS_QUERY = gql`
    query Users {
    users {
        id
        name
        email
    }
}`;
//For Get One User code lab details
export const GET_USER_CODE_LAB_QUERY = gql`
    query Codelabs($userId: ID!,$limit:Int,$page:Int) {
        user(id: $userId,limit:$limit,page:$page) {
          codelabs {
            totalCount
            data {
              name
              description
              id
              imageUrl
              liveUrl
            }
          }
        }
}`;