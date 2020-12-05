
exports.up = function(knex) {
    return knex.schema.createTable('m_email', function (t) {
        t.increments('id').unsigned().primary();
        t.string('email').notNull().defaultTo("notset");
        t.timestamp('date_created').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    let dropQuery = `DROP TABLE m_email`
    return knex.raw(dropQuery)
};
