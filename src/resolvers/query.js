const Query = {
    comments(parent, args, { db }, info){
        return db.comments
    },
    users(parent, args, { db }, info){
        if(!args.query){
            return db.users
        }
        return db.users.filter( (user) => {
            return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
        })
    },
    posts(parent, args, { db }, info){
        if(!args.query){
            return db.posts
        }
        return db.posts.filter( (post) => {
            return post.published === true
        })
    },
    me(){
        return {
            id: '12356265263',
            name: 'Mo Salah'
        }
    },
    post(){
        return {
            id: '12303201',
            title: 'My First Post',
            body: 'My First Post My First PostMy First Post',
            published: true
        }
    }
}

export { Query as default }