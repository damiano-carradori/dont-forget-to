import gql from 'graphql-tag'

export const EDIT_TASK = gql`
    mutation UpdateTask($id: ID!, $text: String, $done: Boolean) {
        updateTask(id: $id, text: $text, done: $done) {
            id
            text
        }
    }
`;

export const EDIT_TASK_CLIENT = gql`
    mutation UpdateTask($id: ID!, $text: String, $done: Boolean) {
        updateTask(id: $id, text: $text, done: $done) @client{
            id
            text
        }
    }
`;

export const TEXT_TASK_FRAGMENT = gql`
    fragment taskText on Task {
        text
    }
`;