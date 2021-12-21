exports.up = async (knex) => {
  await knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('username', 200).notNullable().unique()
      users.string('password', 200).notNullable()
      users.timestamps(false, true)
    })
    .createTable('locations', (locations) => {
      locations.increments('location_id')
      locations.string('location_name')
    })
    .createTable('listings', (listings) => {
      listings.increments('listing_id')
      listings.string('name', 50).notNullable()
      listings.string('category', 50).notNullable()
      listings.string('description', 150).notNullable()
      listings.integer('price').notNullable().unsigned()
      listings.integer('location_id')
        .unsigned()
        .notNullable()
        .references('location_id')
        .inTable('locations')
        
    })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('listings')
  await knex.schema.dropTableIfExists('locations')
  await knex.schema.dropTableIfExists('users')
}
