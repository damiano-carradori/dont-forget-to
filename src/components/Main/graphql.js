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