import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
    uri: "https://graph-ql-fargdjqiqg.now.sh"
});

const ADD_TASK = gql`
    mutation AddTask($text: String!) {
        addTask(text: $text) {
            _id
            text
            done
        }
    }
`;

const getUser = async () => {
    let response = await client.query({
        query: gql`
            {
                tasks {
                    _id
                    text
                    done
                }
            }
        `
    });
    return response.data.tasks.map( task => ({ ...task, id: task._id }) );
};

const addTask = async text => {
    let response = await client.mutate({
        mutation: ADD_TASK,
        variables : { text }
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
};

export {
    getUser,
    addTask
}