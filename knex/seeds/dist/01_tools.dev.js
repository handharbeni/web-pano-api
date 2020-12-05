"use strict";

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('m_tools').del().then(function () {
    // Inserts seed entries
    return knex('m_tools').insert([{
      id: 1,
      name: 'MULTI_LOGIN',
      value: 'true'
    }, {
      id: 2,
      name: 'mail_host',
      value: 'smtp.googlemail.com'
    }, {
      id: 3,
      name: 'mail_port',
      value: '465'
    }, {
      id: 4,
      name: 'mail_secure',
      value: 'true'
    }, {
      id: 5,
      name: 'mail_user',
      value: 'your username'
    }, {
      id: 6,
      name: 'mail_pass',
      value: 'your password'
    }]);
  });
};