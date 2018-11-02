import gql from "graphql-tag";

export const MOVE_TASK = gql`
    mutation MoveTask($from: Int!, $to: Int!) {
        moveTask(from: $from, to: $to) {
            id
            position
            text
            done
        }
    }
`;

export const GET_TOKEN = gql`
    {
        token @client
    }
`;

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