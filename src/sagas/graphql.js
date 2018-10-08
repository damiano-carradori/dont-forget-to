import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
    uri: "https://graph-ql-fargdjqiqg.now.sh"
});

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

const addTask = async () => {

};

export {
    getUser,
    addTask
}