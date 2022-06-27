import { GraphQLServer, PubSub } from "graphql-yoga"
import db from "./db"
import Query from "./resolvers/query"
import Subscription from "./resolvers/subscription" 
import User from "./resolvers/user"
import Post from "./resolvers/post"
import Comment from "./resolvers/comment"
import Mutation from "./resolvers/mutation"

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query,
        User,
        Post,
        Comment,
        Mutation,
        Subscription
    },
    context: {
        db,
        pubsub
    }
})

server.start(() => console.log('server is up'))