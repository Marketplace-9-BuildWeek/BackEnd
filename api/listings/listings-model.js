const db = require('../data/db-config')

module.exports = {
    getAll, 
    create
}

function getAll() {
    return db('listings')
}

async function create(listing) {
    const [newListing] = await db('listings').insert(listing, ['listing_id', 'name', 'category', 'description', 'price', 'location_id'])
    return newListing
}