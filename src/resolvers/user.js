const User = {
    posts: async (parent, args, { prisma }, info) => {
        const posts = await prisma.post.findMany({
            where: {
                user: +parent.user
            }
        })
        return posts
    },
    comments: async (parent, args, { prisma }, info) => {
        const comments = await prisma.comment.findMany({
            where: {
                user: +parent.user
            }
        })
        return comments
    }
}

export { User as default }