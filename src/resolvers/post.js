const Post = {
    auther: async (parent, args, { prisma }, info) => {
        const auther  = await prisma.user.findUnique({
            where: {
                id: +parent.userId
            }
        })
        return auther
    },

    // error here need to be fixed
    comments: async (parent, args, { prisma }, info) => {
        const comments = await prisma.comment.findMany({
            where: {
                postId: +parent.id
            }
        })
        return comments
    }
}

export { Post as default }