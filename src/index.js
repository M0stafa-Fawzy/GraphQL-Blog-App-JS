import { GraphQLServer } from "graphql-yoga"
import { PrismaClient } from "@prisma/client"
import Query from "./resolvers/query"
import User from "./resolvers/user"
import Post from "./resolvers/post"
import Comment from "./resolvers/comment"
import Mutation from "./resolvers/mutation"
import auth from "../src/middlewares/auth"

const prisma = new PrismaClient()

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query,
        User,
        Post,
        Comment,
        Mutation
    },
    context: (req) => {
        return {
            prisma,
            authPayload: req.request.headers.authorization ? auth.verifyToken(req.request.headers.authorization) : null 
        }
    }
})

server.start(() => console.log('server is up'))


