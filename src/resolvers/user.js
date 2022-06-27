const User = {
    posts(parent, args, { db }, info){
        return db.posts.filter((post) => {
            return post.auther === parent.id
        })
    },
    comments(parent, args, { db }, info){
        return db.comments.filter((comment) => {
            return comment.auther === parent.id
        })
    }
}

export { User as default }