import gql from 'graphql-tag'

export const GET_TASKS = gql`
    query GetTasks {
        tasks @client {
            id
            position
            text
            done
        }
    }
`;