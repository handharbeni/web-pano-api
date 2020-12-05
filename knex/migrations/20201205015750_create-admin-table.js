
exports.up = function(knex) {
    return knex.schema.createTable('admin', function (t) {
        t.increments('id').unsigned().primary();
        t.string('username').notNull().defaultTo("notset");
        t.string('pass').notNull().defaultTo("notset");
        t.string('nama').notNull().defaultTo("notset");
        t.timestamp('date_created').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    let dropQuery = `DROP TABLE admin`
    return knex.raw(dropQuery)
};
