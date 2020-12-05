'use strict';
var config = require('../../tools/config');
var multer  = require('multer');
var path = require('path');

var storageFiles = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, config.filePath)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now()+'-'+file.originalname)
        }
    })

var uploadFiles = multer({ storage: storageFiles })
module.exports = function(app) {
    var general = require('../controllers/general.controller');
    var verifyToken = require('../controllers/token.controller');
    var account = require('../controllers/account.controller');

	app.route('/').post(general.index).get(general.index).put(general.index).delete(general.index);
	app.route('/login-admin').post(account.loginAdmin);
	app.route('/login-member').post(account.loginMember);
	app.route('/insert').post(verifyToken.admin, account.insertEmail);
	app.route('/validate-token').get(verifyToken.mahasiswa, account.validateToken);
	app.route('/blast-email').get(account.blastEmail)
}
