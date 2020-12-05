"use strict";

exports.up = function (knex) {
  return knex.schema.createTable('m_keys', function (t) {
    t.increments('id').unsigned().primary();
    t.string('name').notNull().defaultTo("notset");
    t.timestamp('date_created').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  var dropQuery = "DROP TABLE m_keys";
  return knex.raw(dropQuery);
};