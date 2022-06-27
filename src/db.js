let users = [{
    id: '1',
    name: 'Mostafa',
    age: 24
} , {
    id: '2',
    name: 'Ahmed',
    age: 27
} , {
    id: '3',
    name: 'Mohamed'
}]

let posts = [{
    id: '25',
    title: 'Mostafa post',
    body: 'this is mostafa post',
    published: true,
    auther: '1'
} , {
    id: '29',
    title: 'Ahmed post',
    body: 'this is eslam post',
    published: true,
    auther: '2'
} , {
    id: '28',
    title: 'Mohamed post',
    body: 'this is Mohamed post',
    published: false,
    auther: '3'
}]

let comments = [{
    id: '101',
    text: 'here is comment 101 text',
    auther: '1',
    post: '25'
}, {
    id: '102',
    text: 'here is comment 102 text',
    auther: '1',
    post: '25'
}, {
    id: '103',
    text: 'here is comment 103 text',
    auther: '2',
    post: '28'
},{
    id: '104',
    text: 'here is comment 104 text',
    auther: '3',
    post: '29'
}]

const db = {
    users,
    posts,
    comments
}
export { db as default }