
exports.up = function(knex) {
    return knex.schema.createTable('user_login', function (t) {
        t.increments('id').unsigned().primary();
        t.integer('email_id').unsigned();
        t.integer('key_id').unsigned();
        t.string('username').notNull().defaultTo("notset");
        t.string('pass').notNull().defaultTo("notset");
        t.string('name').notNull().defaultTo("notset");
        t.timestamp('date_created').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    let dropQuery = `DROP TABLE user_login`
    return knex.raw(dropQuery)
};
