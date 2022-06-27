const Post = {
    auther(parent, args, { db }, info){
        return db.users.find((user) => {
            return user.id === parent.auther
        })
    },
    comments(parent, args, { db }, info){
        return db.comments.filter((comment) => {
            return comment.post === parent.id
        })
    }
}

export { Post as default }