const Query = {

    comments: async (parent, args, { prisma }, info) => {
        const comments = await prisma.comment.findMany({})
        return comments
    },

    users: async (parent, args, { prisma }, info) => {
        const users = await prisma.user.findMany({})
        return users
    },
    
    posts: async (parent, args, { prisma }, info) => {
        const posts = await prisma.post.findMany({})
        return posts
    }
    
}

export { Query as default }