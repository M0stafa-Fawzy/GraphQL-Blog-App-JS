const Comment = {
    auther(parent, args, { db }, info){
        return db.users.find((user) => {
            return user.id === parent.auther
        })
    },
    post(parent, args, { db }, info){
        return db.posts.find((post) => {
            return post.id === parent.post
        })
    }
}

export { Comment as default }