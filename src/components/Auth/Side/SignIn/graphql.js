import gql from "graphql-tag";

export const LOG_IN = gql`
    mutation LogIn($username: String!, $password: String!) {
        logIn(username: $username, password: $password) {
            token
            user{
                id
                username
                profile_picture
                tasks{
                    id
                    position
                    text
                    done
                }
            }
        }
    }
`;