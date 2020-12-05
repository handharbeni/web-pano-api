
exports.up = function(knex) {
    return knex.schema.createTable('m_tools', function (t) {
        t.increments('id').unsigned().primary();
        t.string('name').notNull().defaultTo("notset");
        t.string('value').notNull().defaultTo("notset");
        t.timestamp('date_created').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    let dropQuery = `DROP TABLE m_tools`
    return knex.raw(dropQuery)
};
