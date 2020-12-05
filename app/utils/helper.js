var _this = this;

var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var config = require('../../tools/config');
var db = require('../../knex/knex');
var utils = require('../utils/utils')
var jwt = require('jsonwebtoken');
var pug = require('pug');
var ejs = require('ejs');



var algorithm = 'aes-256-cbc';
var key = crypto.randomBytes(32);
var iv = crypto.randomBytes(16);

exports.db = db
exports.utils = utils;
exports.jwt = require('jsonwebtoken');
exports.config = config;
exports.start = new Date()
exports.response = { success: false, message: 'No Message' };
exports.pug = pug;
exports.ejs = ejs;

exports.makeId = (length) => {
  return new Promise(function(resolve, reject){
    try{
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      resolve(result);
    }catch( e ){
      reject(e);
    }
  })
}

exports.mainDecrypt = (id, type = 'user') => {
  var separator = config.cryptoSeparator
  if (type === config.decryptTypeUser) {
    separator = config.cryptoSeparator
  }else if(type === config.decryptTypeGigs){
    separator = config.cryptoSeparatorGigs
  }else if(type === config.decryptTypeGigsPackage){
    separator = config.cryptoSeparatorGigsPackage
  }else if(type === config.decryptTypeTransaction){
    separator = config.cryptoSeparatorTransaction
  }else if(type === config.decryptTypeSchedule){
    separator = config.cryptoSeparatorSchedule
  }else if(type == config.decryptTypeRoom){
    separator = config.cryptoSeparatorRoom
  }
  let secret = _this.decrypt(String(id).split(separator)[0])
  let ids = _this.decryptCustom(String(id).split(separator)[1], String(secret))
  return ids;
}

exports.userEncrypt = (type, text) => {
  let secret = config.cryptoKeySecretCustomer
  if (type === config.typeAdmin) {
    secret = config.cryptoKeySecretAdmin
  }else if(type === config.typeMitra){
    secret = config.cryptoKeySecretMitra
  }else if(type === config.typeCustomer){
    secret = config.cryptoKeySecretCustomer
  }
  let separator = config.cryptoSeparator


  let encSecret = _this.encrypt(String(secret))
  let encText = _this.encryptCustom(text, secret)
  return `${encSecret}${separator}${encText}`
}

exports.gigsEncrypt = (text) => {
  let secret = config.cryptoKeySecretGigs
  let separator = config.cryptoSeparatorGigs

  let encSecret = _this.encrypt(String(secret))
  let encText = _this.encryptCustom(text, secret)
  return `${encSecret}${separator}${encText}`
}

exports.gigsPackageEncrypt = (text) => {
  let secret = config.cryptoKeySecretGigsPackage
  let separator = config.cryptoSeparatorGigsPackage

  let encSecret = _this.encrypt(String(secret))
  let encText = _this.encryptCustom(text, secret)
  return `${encSecret}${separator}${encText}`
}

exports.transactionEncrypt = (text) => {
  let secret = config.cryptoKeySecretTransaction
  let separator = config.cryptoSeparatorTransaction

  let encSecret = _this.encrypt(String(secret))
  let encText = _this.encryptCustom(text, secret)
  return `${encSecret}${separator}${encText}`
}

exports.scheduleEncrypt = (text) => {
  let secret = config.cryptoKeySecretSchedule
  let separator = config.cryptoSeparatorSchedule

  let encSecret = _this.encrypt(String(secret))
  let encText = _this.encryptCustom(text, secret)
  return `${encSecret}${separator}${encText}`
}

exports.roomEncrypt = (text) => {
  let secret = config.cryptoKeySecretRoom
  let separator = config.cryptoSeparatorRoom


  let encSecret = _this.encrypt(String(secret))
  let encText = _this.encryptCustom(text, secret)
  return `${encSecret}${separator}${encText}`
}



exports.encryptCustom = (text, secret) => {

  var mykey = crypto.createCipher(config.cryptoAlgorithm, secret);
  var mystr = mykey.update(text, config.cryptoType, config.cryptoPart)
  mystr += mykey.final(config.cryptoPart);

  return mystr;
}

exports.decryptCustom = (text, secret) => {
  var mykey = crypto.createDecipher(config.cryptoAlgorithm, secret);
  var mystr = mykey.update(text, config.cryptoPart, config.cryptoType)
  mystr += mykey.final(config.cryptoType);

  return mystr;
}


exports.encrypt = (text) => {

  var mykey = crypto.createCipher(config.cryptoAlgorithm, config.cryptoKeySecretAdmin);
  var mystr = mykey.update(text, config.cryptoType, config.cryptoPart)
  mystr += mykey.final(config.cryptoPart);

  return mystr;
}

exports.decrypt = (text) => {
  var mykey = crypto.createDecipher(config.cryptoAlgorithm, config.cryptoKeySecretAdmin);
  var mystr = mykey.update(text, config.cryptoPart, config.cryptoType)
  mystr += mykey.final(config.cryptoType);

  return mystr;
}

exports.sendStatus = (res, statusCode, response) => {
  Utils.sendStatus(res, statusCode, response)
}

exports.hashSync = (sHashed) => {
  return bcrypt.hashSync(sHashed, config.intHash)
}

exports.compareSync = (sHashed, sHashedOri) => {
  return new Promise(function(resolve, reject) {
    try {
      resolve(bcrypt.compareSync(sHashed, sHashedOri));
    } catch (e) {
      reject(e);
    }
  });
}

exports.jwtSign = (dataPayload, secret) => {
  return new Promise(function(resolve, reject) {
    try {
      resolve(jwt.sign(dataPayload, secret, {
          expiresIn: config.expiresSession
      }));
    } catch (e) {
      reject(e);
    }
  });
}

exports.checkRoles = (id_roles, menu, attribute) => {
  return new Promise(function(resolve, reject) {
    // m_privileges.create
    var query = `SELECT IF(count(*)>0, true, false) as resultRoles FROM m_roles
                  INNER JOIN m_privileges ON m_privileges.id_roles = m_roles.id
                  INNER JOIN m_menu ON m_menu.id = m_privileges.id_menu
                  WHERE m_roles.id = ${id_roles} AND m_menu.name = '${menu}' AND ${attribute} = 1`;
    db.raw(query)
        .then(resultQuery => {
          resolve(resultQuery[0])
        })
        .catch(error => {
          reject(error)
        })
  });
}

exports.insertToTable = (table, data) => {
  return new Promise((resolve, reject) => {
    db(table)
      .insert(data)
      .then(resultInsert => {
        resolve(resultInsert)
      })
      .catch(error => {
        reject(error)
      })
  });
}

exports.updateToTable = (table, dataSelect, dataUpdate) => {
  return new Promise((resolve, reject) => {
    db(table)
      .where(dataSelect)
      .update(dataUpdate)
      .then(resultUpdate => {
        resolve(resultUpdate)
      })
      .catch(error => {
        reject(error)
      })
  });
}

exports.getFromTable = (table, data) => {
  return new Promise(function(resolve, reject) {
    db(table)
      .where(data)
      .then(resultSelect => {
        resolve(resultSelect)
      })
      .catch(error => {
        reject(error)
      })
  });
}



exports.rawQuery = (query) => {
  return new Promise(function(resolve, reject) {
    db.raw(query)
      .then(resultQuery => {
        resolve(resultQuery[0])
      })
      .catch(error => {
        reject(error)
      })
  });
}

exports.generatePass = (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}