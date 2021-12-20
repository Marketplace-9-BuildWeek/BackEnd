exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('listings')
    .then(function () {
      // Inserts seed entries
      return knex('listings').insert([
        {listing_id: 1, name: 'eggs', category: "animal products", description: "Buy my product", price: 10, location_id: 1 },
        {listing_id: 2, name: 'corn', category: "vegetable", description: "Buy my product", price: 10, location_id: 2 },
        {listing_id: 3, name: 'mangos', category: "fruit", description: "Buy my product", price: 10, location_id: 3 },
        {listing_id: 4, name: 'beef', category: "animal products", description: "Buy my product", price: 10, location_id: 4 },
        {listing_id: 5, name: 'peas', category: "vegetables", description: "Buy my product", price: 10, location_id: 5 },
        {listing_id: 6, name: 'hardwood', category: "materials", description: "Buy my product", price: 10, location_id: 6 },
        {listing_id: 7, name: 'autograph', category: "miscellaneous", description: "Buy my product", price: 10, location_id: 6 },
      ]);
    });
};
