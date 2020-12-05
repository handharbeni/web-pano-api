"use strict";

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('m_keys').del().then(function () {
    // Inserts seed entries
    return knex('m_keys').insert([{
      id: 1,
      name: 'MAHASISWA'
    }, {
      id: 2,
      name: 'UNDANGAN1'
    }, {
      id: 3,
      name: 'UNDANGAN2'
    }]);
  });
};