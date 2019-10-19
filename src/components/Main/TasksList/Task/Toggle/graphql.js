import gql from 'graphql-tag'

export const TOGGLE_TASK = gql`
    mutation UpdateTask($id: ID!, $text: String, $done: Boolean) {
        updateTask(id: $id, text: $text, done: $done) {
            id
            done
        }
    }
`;