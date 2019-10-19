export const defaults = {
    user: null,
    tasks: [],

    signup: false,
    token: null,
    side: false,
    filter: "SHOW_ACTIVE"
};

export const resolvers = {
    Mutation: {
        addTask: (root, { text } ) => {
            return {
                __typename: 'Task',
                id: `${+new Date()}`,
                text,
                position: 0,
                done: false,
            }
        },
        deleteTask: (root, { id, position }) => {
            return {
                __typename: 'Task',
                id,
                position
            }
        },
        updateTask: (root, { id, text, done }) => {
            return {
                __typename: 'Task',
                id,
                text,
                done
            }
        }
    }
};

export const typeDefs = `
  type User {
    id: ID
    username: String
    profile_picture: String
  }
  
  type Task {
    id: ID
    position: Int
    text: String
    done: Boolean
  }
  

  type Query {
    user: User
    tasks: [Task]
    filter: String
  }
`;