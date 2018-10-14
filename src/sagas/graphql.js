import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
    uri: "https://apollo-graphql-iqecpfrrdc.now.sh"
});

const GET_USER = gql`
    query getUser($id: ID!){
        user(id: $id){
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
    mutation AddTask($user: ID!, $text: String!) {
        addTask(user: $user, text: $text) {
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
    mutation UpdateTask($id: ID!, $text: String, $done: Boolean, $position: Int) {
        updateTask(id: $id, text: $text, done: $done, position: $position) {
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
    getUser: async id => {
        let response = await client.query({
            query: GET_USER,
            variables: {id}
        });
        return response.data.user;
    },
    addTask: async (user, text) => {
        let response = await client.mutate({
            mutation: ADD_TASK,
            variables: {user, text}
        });
        // response:
        // {
        //     data: {
        //         addTask {
        //
        //         }
        //     }
        // }
        return response.data.addTask;
    },
    deleteTask: async id => {
        let response = await client.mutate({
            mutation: DELETE_TASK,
            variables: {id}
        });
        return response.data.deleteTask;
    },
    updateTask: async (id, {text, done}) => {
        let response = await client.mutate({
            mutation: UPDATE_TASK,
            variables: {
                id,
                ...(text !== undefined && {text}),
                ...(done !== undefined && {done})
            }
        });
        return response.data.updateTask;
    },
    moveTask: async (id, from, to) => {
        let response = await client.mutate({
            mutation: MOVE_TASK,
            variables: {id, from, to}
        });
        return response.data.moveTask;
    }
};

export default GraphQL