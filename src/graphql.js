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

export const GET_VISIBILITY_FILTER = gql`
    {
        filter @client
    }
`;

export const TOGGLE_TASK = gql`
    mutation UpdateTask($id: ID!, $text: String, $done: Boolean) {
        updateTask(id: $id, text: $text, done: $done) {
            id
            done
        }
    }
`;

export const TOGGLE_TASK_CLIENT = gql`
    mutation UpdateTask($id: ID!, $text: String, $done: Boolean) {
        updateTask(id: $id, text: $text, done: $done) @client{
            id
            done
        }
    }
`;

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

export const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
            id
            position
        }
    }
`;

export const DELETE_TASK_CLIENT = gql`
    mutation DeleteTask($id: ID!, $position: Int) {
        deleteTask(id: $id, position: $position) @client{
            id
            position
        }
    }
`;

export const GET_USER = gql`
    {
        user @client{
            username
            profile_picture
        }
    }
`;

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

export const GET_SIDE_INFO = gql`
    {
        token @client
        side @client
    }
`;

export const GET_ME = gql`
    {
        me{
            id
            username
            profile_picture
        }
    }
`;

export const DONE_TASK_FRAGMENT = gql`
    fragment taskDone on Task {
        done
    }
`;

export const TEXT_TASK_FRAGMENT = gql`
    fragment taskText on Task {
        text
    }
`;