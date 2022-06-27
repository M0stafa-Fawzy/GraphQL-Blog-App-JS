import { v4 as uuidv4 } from 'uuid'

const Mutation = {
    createUser(parent, args, { db }, info){
        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user)
        return user
    },

    deleteUser(parent, args, { db }, info){
        const index = db.users.findIndex((user) => user.id === args.id)
        const deleted = db.users.splice(index, 1)

        db.posts = db.posts.filter((post) => {
            return post.auther != deleted[0].id
        })

        
        db.comments = db.comments.filter((comment) => {
            return comment.auther != deleted[0].id
        })

        return deleted[0]
    },
    updateUser(parent, args, { db }, info){
        const user = db.users.find(user => user.id === args.id)
        if(!user){
            throw new Error("user not found")
        }

        if(typeof args.data.name === "string"){
            user.name = args.data.name
        }

        if(typeof args.data.age !== "undefined"){
            user.age = args.data.age
        }

        return user
    },
    createPost(parent, args, { db, pubsub }, info){
        const { title, body, published, auther } = args.data
        const post = { id: uuidv4(), title, body, published, auther }
        // const post = { id: uuidv4(), title: args.title
        //     , body: args.body, published: args.published, auther: args.auther }

        db.posts.push(post)
        pubsub.publish(`post`, { post: {
            mutation: 'CREATED',
            data: post
            } 
        })
        return post

    },
    deletePost(parent, args, { db, pubsub }, info){
        const index = db.posts.findIndex(post => post.id === args.id)
        const [post] = db.posts.splice(index, 1)

        db.comments = db.comments.filter(comment => comment.post !== args.id)

        pubsub.publish('post', {
            post: {
                mutation: "DELETED",
                data: post
            }
        })

        return post
    },
    updatePost(parent, args, { db, pubsub }, info){
        const { id, data } = args
        const post = db.posts.find(post => post.id === id)
        const originalpost = { ...post }
        if(!post){
            throw new Error("post not found")
        }

        if(typeof data.title === "string"){
            post.title = data.title
        }

        if(typeof data.body === "string"){
            post.body = data.body
        }

        if(typeof data.published === "boolean"){
            post.published = data.published

            if(originalpost.published && !post.published){
                pubsub.publish('post', {
                    post: {
                        mutation: "DELETED",
                        data: originalpost
                    }
                })
            }else if(!originalpost.published && post.published){
                pubsub.publish('post', {
                    post: {
                        mutation: "CREATED",
                        data: post
                    }
                })
            }
        }else if(post.published){
            pubsub.publish('post', {
                post: {
                    mutation: "UPDATED",
                    data: post
                }
            })
        }

        return post
    },
    createComment(parent, args, { db, pubsub }, info){
        // const { text, auther } = args
        const comment = {
            id: uuidv4(),
            ...args.data
        }
        db.comments.push(comment)

        pubsub.publish(`comment ${args.data.post}`, {
            comment: {
                mutation: "CREATED",
                data: comment
            }
        })
        return comment
    },
    updateComment(parent, args, { db, pubsub }, info){
        const { id, data } = args
        const comment = db.comments.find(comment => comment.id === id)
        if(!comment){
            throw new Error('comment not forund')
        }

        if(typeof data.text === "string"){
            comment.text = data.text
        }

        pubsub.publish(`comment ${comment.post}`, {
            comment: {
                mutation: "UPDATED",
                data: comment
            }
        })

        return comment
    },
    deleteComment(parent, args, { db, pubsub }, info){
        const index = db.comments.findIndex(comment => comment.id === args.id)
        const [comment] = db.comments.splice(index, 1)

        pubsub.publish(`comment ${comment.post}`, {
            comment: {
                mutation: "DELETED",
                data: comment
            }
        })
        return comment
    }
}

export { Mutation as default }