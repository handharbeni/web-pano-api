'use strict';

var jwt = require('jsonwebtoken');

var config = require('../../tools/config');

var db = require('../../knex/knex');

var Utils = require('../utils/utils');

var sqlite = require('../../tools/sqlite');

var helper = require('./../utils/helper.js'); // exports.tokenGeneral = (req, res, next) => {
//     var arrType = ['mahasiswa','undangan1','undangan2'];
//     var token = req.headers['access-token'];
//     var type = req.params.type
//     if (arrType.indexOf(type)>=0) {
//       if (!token) return Utils.sendStatus(res, 200, { success: false, message: 'No token provided.' });
//       db.from('m_tools').select('*')
//         .where('name', 'MULTI_LOGIN')
//         .then(async (value)=>{
//           try {
//             if(value.length > 0){
//               var boolValue = JSON.parse(value[0].value);
//               var secret = config.secretMahasiswa;
//               if (type == 'mahasiswa') {
//                 secret = config.secretMahasiswa
//               }else if(type == 'undangan1'){
//                 secret = config.secretUndangan1
//               }else if(type == 'undangan2'){
//                 secret = config.secretUndangan2
//               }
//               jwt.verify(token, secret, function(err, decoded) {
//                 if (err) return Utils.sendStatus(res, 200, { success: false, message: 'Failed to authenticate token.' });
//                 req.id = helper.decrypt(decoded.id);
//                 next();
//               });
//             }else{
//               Utils.sendStatus(res, 200, { success: false, message: 'Failed to authenticate token.' });
//             }
//           } catch (error) {
//             Utils.sendStatus(res, 200, { success: false, message: 'Failed to authenticate token.', data:error });
//           }
//         })
//         .catch((err)=>{
//           Utils.sendStatus(res, 200, { success: false, message: 'Failed to authenticate token.' });
//         })
//         .finally(()=>{
//         });
//     }else{
//       Utils.sendStatus(res, 200, { success: false, message: 'Failed to authenticate token.' });
//     }
// }


exports.admin = function (req, res, next) {
  var token = req.headers['access-token'];
  if (!token) return Utils.sendStatus(res, 200, {
    success: false,
    message: 'No token provided.'
  });
  db.from('m_tools').select('*').where('name', 'MULTI_LOGIN').then(function _callee(value) {
    var boolValue, secret;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              if (value.length > 0) {
                boolValue = JSON.parse(value[0].value);
                secret = config.secretAdmin;
                jwt.verify(token, secret, function (err, decoded) {
                  if (err) return Utils.sendStatus(res, 200, {
                    success: false,
                    message: 'Failed to authenticate token.'
                  });
                  req.id = helper.decrypt(decoded.id);
                  next();
                });
              } else {
                Utils.sendStatus(res, 200, {
                  success: false,
                  message: 'Failed to authenticate token.'
                });
              }
            } catch (error) {
              Utils.sendStatus(res, 200, {
                success: false,
                message: 'Failed to authenticate token.',
                data: error
              });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  })["catch"](function (err) {
    Utils.sendStatus(res, 200, {
      success: false,
      message: 'Failed to authenticate token.'
    });
  })["finally"](function () {});
};

exports.mahasiswa = function (req, res, next) {
  var token = req.headers['access-token'];
  if (!token) return Utils.sendStatus(res, 200, {
    success: false,
    message: 'No token provided.'
  });
  db.from('m_tools').select('*').where('name', 'MULTI_LOGIN').then(function _callee2(value) {
    var boolValue, secret;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              if (value.length > 0) {
                boolValue = JSON.parse(value[0].value);
                secret = config.secretMahasiswa;
                jwt.verify(token, secret, function (err, decoded) {
                  if (err) return Utils.sendStatus(res, 200, {
                    success: false,
                    message: 'Failed to authenticate token.'
                  });
                  req.id = helper.decrypt(decoded.id);
                  next();
                });
              } else {
                Utils.sendStatus(res, 200, {
                  success: false,
                  message: 'Failed to authenticate token.'
                });
              }
            } catch (error) {
              Utils.sendStatus(res, 200, {
                success: false,
                message: 'Failed to authenticate token.',
                data: error
              });
            }

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  })["catch"](function (err) {
    Utils.sendStatus(res, 200, {
      success: false,
      message: 'Failed to authenticate token.'
    });
  })["finally"](function () {});
};