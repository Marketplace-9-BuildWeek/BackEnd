exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('locations')
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {location_id: 1, location_name: 'north-west'},
        {location_id: 2, location_name: 'north-central'},
        {location_id: 3, location_name: 'north-east'},
        {location_id: 4, location_name: 'central'},
        {location_id: 5, location_name: 'south-west'},
        {location_id: 6, location_name: 'south-east'},
      ]);
    });
};
