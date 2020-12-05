
exports.up = function(knex) {
    return knex.schema
    .alterTable('user_login', (table) => {
      table.boolean('send_email').defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema
    .alterTable('user_login', table => {
      table.dropColumn('send_email');
    });
};
