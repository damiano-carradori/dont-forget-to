import gql from 'graphql-tag'

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