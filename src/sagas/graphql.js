import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
    uri: "https://floating-reaches-16037.herokuapp.com/"
});

const LOG_IN = gql`
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
const GET_USER = gql`
    {
        me{
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
`;
const ADD_TASK = gql`
    mutation AddTask($text: String!) {
        addTask(text: $text) {
            id
            position
            text
            done
        }
    }
`;
const DELETE_TASK = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
            id
            position
            text
            done
        }
    }
`;
const UPDATE_TASK = gql`
    mutation UpdateTask($id: ID!, $text: String, $done: Boolean) {
        updateTask(id: $id, text: $text, done: $done) {
            id
            position
            text
            done
        }
    }
`;
const MOVE_TASK = gql`
    mutation MoveTask($user: String!, $from: Int!, $to: Int!) {
        moveTask(user: $user, from: $from, to: $to) {
            id
            position
            text
            done
        }
    }
`;

const GraphQL = {
    logIn: async (username, password) => {
        let response = await client.mutate({
            mutation: LOG_IN,
            variables: {username, password}
        });
        return response.data.logIn;
    },
    getUser: async token => {
        let response = await client.query({
            query: GET_USER,
            context:{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        });
        return response.data.me;
    },
    addTask: async (token, text) => {
        let response = await client.mutate({
            mutation: ADD_TASK,
            variables: {text},
            context:{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        });
        return response.data.addTask;
    },
    deleteTask: async (token, id) => {
        let response = await client.mutate({
            mutation: DELETE_TASK,
            variables: {id},
            context:{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        });
        return response.data.deleteTask;
    },
    updateTask: async (token, id, {text, done}) => {
        let response = await client.mutate({
            mutation: UPDATE_TASK,
            variables: {
                id,
                ...(text !== undefined && {text}),
                ...(done !== undefined && {done})
            },
            context:{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        });
        return response.data.updateTask;
    },
    moveTask: async (token, from, to) => {
        let response = await client.mutate({
            mutation: MOVE_TASK,
            variables: {from, to},
            context:{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        });
        return response.data.moveTask;
    }
};

export default GraphQL