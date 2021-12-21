const db = require('../data/db-config')

module.exports = {
    find, 
    findBy, 
    findById, 
    create,
}

function find() {
    return db('users')
}

function findBy(filter) {
    return db('users').where(filter)
}

function findById(id) {
    return db('users')
        .where('user_id', id)
        .first()
}

async function create(user) {
    const [newUser] = await db('users').insert(user, ['user_id', 'username', 'password'])
    return newUser
}