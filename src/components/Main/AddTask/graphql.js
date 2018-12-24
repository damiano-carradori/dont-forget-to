import gql from "graphql-tag";

export const ADD_TASK = gql`
    mutation AddTask($text: String!) {
        addTask(text: $text) {
            id
            position
            text
            done
        }
    }
`;
export const ADD_TASK_CLIENT = gql`
    mutation AddTask($text: String!) {
        addTask(text: $text) @client{
            id
            position
            text
            done
        }
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