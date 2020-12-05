exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admin').del()
    .then(function () {
      // Inserts seed entries
      return knex('admin').insert([
        {id: 1, nama: 'Admin1', username:'admin1', pass: '$2y$06$FYb9JtLLVxWxy9wd4b8vIOieRrFZveTo3q55.40DVCJuJNHFUi6n2'}
      ]);
    });
};
