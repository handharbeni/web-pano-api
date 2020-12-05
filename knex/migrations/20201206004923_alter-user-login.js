
exports.up = function(knex) {
    return knex.schema
    .alterTable('user_login', (table) => {
      table.string('generated_body').defaultTo('notset');
    });
};

exports.down = function(knex) {
    return knex.schema
    .alterTable('user_login', table => {
      table.dropColumn('generated_body');
    });
};
