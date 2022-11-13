const Comment = {

    auther: async (parent, args, { prisma }, info) => {
        const user = await prisma.user.findUnique({
            where: {
                id: +parent.userId
            }
        })
        return user
    },

    post: async (parent, args, { prisma }, info) => {
        const post = await prisma.post.findUnique({
            where: {
                id: +parent.postId
            }
        })
        return post
    }
    
}

export { Comment as default }