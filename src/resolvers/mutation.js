import { hash, compare } from "bcryptjs"
import auth from "../middlewares/auth"

const Mutation = {
    signUp: async(parent, { data }, { prisma }, info) => {
        let { name, email, password } = data
        password = await hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        const token = auth.genToken(user.id)
        return { user, token }
    },

    login: async(parent, { email, password }, { prisma }, info) => {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(!user) throw new Error("user not found")

        let compared = await compare(password, user.password)
        if(!compared) throw new Error("wrong password")

        const token = auth.genToken(user.id)
        return { user, token }
    },

    getProfileData: async (parent, args, { prisma, authPayload }, info) => {
        const user = await prisma.user.findUnique({
            where: {
                id: authPayload.id
            }
        })
        if(!user) throw new Error("user not found")
        return user
    },

    deleteUser: async (parent, args, { prisma, authPayload }, info) => {
        const deleted = await prisma.user.delete({
            where: {
                id: +authPayload.id
            }
        })
        return deleted
    },

    updateUser: async (parent, { data }, { prisma, authPayload }, info) => {
        const user = prisma.user.update({
            where: {
                id: +authPayload.id
            },
            data
        })
        if(!user) throw new Error("user not found")
        return user
    },
    
    createPost: async (parent, { data }, { prisma, authPayload }, info) => {
        const { title, body, published } = data
        const post = await prisma.post.create({
            data: {
                title,
                body,
                published,
                userId: authPayload.id
            }
        })
        // pubsub.publish(`post`, { post: {
        //     mutation: 'CREATED',
        //     data: post
        //     } 
        // })
        return post
    },

    deletePost: async (parent, { id }, { prisma, authPayload }, info) => {
        let post = await prisma.post.findUnique({
            where: {
                id: +id
            }
        })
 
        if(post.userId != authPayload.id) throw new Error("unauthorized action")

        post = await prisma.post.delete({
            where: {
                id: +id
            }
        })
        // await prisma.comments.deleteMany({
        //     where: {
        //         post: +id
        //     }
        // })

        // pubsub.publish('post', {
        //     post: {
        //         mutation: "DELETED",
        //         data: post
        //     }
        // })

        return post
    },

    updatePost: async (parent, { id, data }, { prisma, authPayload }, info) => {
        let post = await prisma.post.findUnique({
            where: {
                id: +id
            }
        })
        if(!post) throw new Error("post not found")
        if(post.userId != authPayload.id) throw new Error("unauthorized action")

        post = await prisma.post.update({
            where: {
                id: +id
            },
            data
        })
        return post
    },

    createComment: async (parent, { data }, { prisma, authPayload }, info) => {
        const { text, post } = data
        const { id } = authPayload

        const postExisted = await prisma.post.findUnique({
            where: {
                id: +post
            }
        })
        if(!postExisted) throw new Error("post not found!")

        const comment = await prisma.comment.create({
            data: {
                text, 
                userId: +id, 
                postId: +post
            }
        })

        // pubsub.publish(`comment ${args.data.post}`, {
        //     comment: {
        //         mutation: "CREATED",
        //         data: comment
        //     }
        // })
        return comment
    },

    updateComment: async (parent, { id, text }, { prisma, authPayload }, info) => {
        let comment = await prisma.comment.findUnique({
            where: {
                id: +id
            }
        })
        if(!comment) throw new Error("comment not found")
        if(comment.userId != authPayload.id) throw new Error("unauthorized action")

        comment = await prisma.comment.update({
            where: {
                id: +id
            },
            data: {
                text
            }
        })

        // pubsub.publish(`comment ${comment.post}`, {
        //     comment: {
        //         mutation: "UPDATED",
        //         data: comment
        //     }
        // })

        return comment
    },
    
    deleteComment: async (parent, { id }, { prisma, authPayload }, info) => {
        let comment = await prisma.comment.findUnique({
            where: {
                id: +id
            }
        })
        if(!comment) throw new Error("comment not found")
        if(comment.userId != authPayload.id) throw new Error("unauthorized action")

        comment = await prisma.comment.delete({
            where: {
                id: +id
            }
        })
        return comment
    }
}

export { Mutation as default }