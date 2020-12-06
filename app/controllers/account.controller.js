'use strict'
const helper = require('./../utils/helper.js');
const typedef = require('./../utils/typedef.js');

/**
 * @route POST /login-admin
 * @group Account
 * @param {AdminLogin.model} user.body.required - Login Admin
 * @produces application/json
 * @consumes application/json
 * @returns {object} 200 - { "success": true, "message": "Message Success, Message Error", "data": "if any, could be object / json" }
 */
exports.loginAdmin = (req, res) => {
  helper.start = new Date()

  helper.response.data = {}

  var table = 'admin'
  var body = req.body
  var dataSelect = {}
  dataSelect.username = body.username
  helper.getFromTable(table, dataSelect)
    .then(
      async (success) => {
        helper.response.success = false
        helper.response.message = 'User Not Found'
        if (success.length > 0) {
          let successUser = success[0]
          let passwordIsValid = helper.compareSync(body.pass, success[0].pass);
          passwordIsValid.then(
            async (success) => {
              if (success) {
                var dataPayload = {}
                dataPayload.id = helper.encrypt(String(successUser.id))

                await helper.jwtSign(dataPayload, helper.config.secretAdmin).then(
                  (success) => {
                    var end = (new Date() - helper.start)/1000

                    var dataResponse = {};
                    dataResponse.token = success

                    helper.response.success = true
                    helper.response.message = 'Login Success'
                    helper.response.data = dataResponse
                    helper.response.performance = `${end} ms`

                    helper.utils.sendStatus(res, 200, helper.response )
                  },
                  (error) => {
                    var end = (new Date() - helper.start)/1000

                    helper.response.success = false
                    helper.response.message = 'Failed Generating Token'
                    helper.response.data    = error
                    helper.response.performance = `${end} ms`

                    helper.utils.sendStatus(res, 200, helper.response )
                  }
                )

              }else{
                var end = (new Date() - helper.start)/1000

                helper.response.success = false
                helper.response.message = 'Password Didn\'t Match';
                helper.response.performance = `${end} ms`
                helper.utils.sendStatus(res, 200, helper.response )
              }
            },
            (error) => {
              var end = (new Date() - helper.start)/1000

              helper.response.success = false
              helper.response.performance = `${end} ms`
              helper.utils.sendStatus(res, 200, helper.response )
            }
          )
        }else{
          var end = (new Date() - helper.start)/1000

          helper.response.success = false
          helper.response.performance = `${end} ms`
          helper.utils.sendStatus(res, 200, helper.response )          
        }
      },
      (error) => {
        var end = (new Date() - helper.start)/1000

        helper.response.success = false
        helper.response.performance = `${end} ms`
        helper.utils.sendStatus(res, 200, helper.response )
      }
    )
}


/**
 * @route POST /login-member
 * @group Account
 * @param {MemberLogin.model} user.body.required - Login Member
 * @produces application/json
 * @consumes application/json
 * @returns {object} 200 - { "success": true, "message": "Message Success, Message Error", "data": "if any, could be object / json" }
 */
exports.loginMember = (req, res) => {
  helper.start = new Date()

  helper.response.data = {}

  var table = 'user_login'
  var body = req.body
  var dataSelect = {}
  dataSelect.username = body.username
  helper.getFromTable(table, dataSelect)
    .then(
      async (success) => {
        console.log(body);
        helper.response.success = false
        helper.response.message = 'User Not Found'

        if (success.length > 0) {
          let successUser = success[0]
          let passwordIsValid = helper.compareSync(body.pass, success[0].pass)
          passwordIsValid.then(
            async (success) => {
              if (success) {
                var dataPayload = {}
                dataPayload.id = helper.encrypt(String(successUser.id))

                await helper.jwtSign(dataPayload, helper.config.secretMahasiswa).then(
                  (success) => {
                    var end = (new Date() - helper.start)/1000

                    var dataResponse = {};
                    dataResponse.token = success

                    helper.response.success = true
                    helper.response.message = 'Login Success'
                    helper.response.data = dataResponse
                    helper.response.performance = `${end} ms`

                    helper.utils.sendStatus(res, 200, helper.response )
                  },
                  (error) => {
                    var end = (new Date() - helper.start)/1000

                    helper.response.success = false
                    helper.response.message = 'Failed Generating Token'
                    helper.response.performance = `${end} ms`

                    helper.utils.sendStatus(res, 200, helper.response )
                  }
                )

              }else{
                var end = (new Date() - helper.start)/1000

                helper.response.success = false
                helper.response.message = 'Password Didn\'t Match';
                helper.response.performance = `${end} ms`
                helper.utils.sendStatus(res, 200, helper.response )
              }
            },
            (error) => {
              var end = (new Date() - helper.start)/1000

              helper.response.success = false
              helper.response.performance = `${end} ms`
              helper.utils.sendStatus(res, 200, helper.response )
            }
          )
        }else{
          var end = (new Date() - helper.start)/1000

          helper.response.success = false
          helper.response.performance = `${end} ms`
          helper.utils.sendStatus(res, 200, helper.response )          
        }
      },
      (error) => {
        var end = (new Date() - helper.start)/1000

        helper.response.success = false
        helper.response.performance = `${end} ms`
        helper.utils.sendStatus(res, 200, helper.response )
      }
    )
}


/**
 * @route POST /insert
 * @group Account
 * @param {InsertEmail.model} user.body.required - Insert Email Mahasiswa
 * @produces application/json
 * @consumes application/json
 * @returns {object} 200 - { "success": true, "message": "Message Success, Message Error", "data": "if any, could be object / json" }
 * @security JWT
 */
exports.insertEmail = (req, res) => {
  var genPass = helper.generatePass(12);


  helper.start = new Date()

  helper.response.data = {}

  var table = 'm_email'
  var body = req.body
  var dataSelect = {}
  dataSelect.email = body.email
  helper.getFromTable(table, dataSelect).then(
    success => {
      if(success.length < 1){
        // data belum ada
        // 1. insert ke table m_email
        // 2. get id dari table m_email
        // 3. generate password
        // 4. insert ke table user_login dengan id
        var dataInsert = {}
        dataInsert.email = body.email;

        helper.insertToTable(table, dataInsert).then(
          success => {
            if (success.length > 0){
              var dataGenerateUserLogin = {}
              dataGenerateUserLogin.email_id = success[0];
              dataGenerateUserLogin.key_id = 1;
              dataGenerateUserLogin.name = body.email;
              dataGenerateUserLogin.username = body.email;
              dataGenerateUserLogin.pass = helper.hashSync(genPass);
              dataGenerateUserLogin.generated_body = genPass;

              helper.insertToTable('user_login', dataGenerateUserLogin).then(
                success => {
                  var end = (new Date() - helper.start)/1000

                  helper.response.success = true
                  helper.response.message = 'Success Generate User'
                  helper.response.performance = `${end} ms`
                  helper.utils.sendStatus(res, 200, helper.response )      
                }, 
                error => {
                  var end = (new Date() - helper.start)/1000

                  helper.response.success = false
                  helper.response.message = error
                  helper.response.performance = `${end} ms`
                  helper.utils.sendStatus(res, 200, helper.response )      
                }
              )
            } else {
              var end = (new Date() - helper.start)/1000

              helper.response.success = false
              helper.response.message = 'Failed to create user'
              helper.response.performance = `${end} ms`
              helper.utils.sendStatus(res, 200, helper.response )      
            }
          },
          error => {
            var end = (new Date() - helper.start)/1000

            helper.response.success = false
            helper.response.message = error
            helper.response.performance = `${end} ms`
            helper.utils.sendStatus(res, 200, helper.response )
          }
        )
      } else {
        // data sudah ada
        var end = (new Date() - helper.start)/1000

        helper.response.success = false
        helper.response.message = 'Data already exist'
        helper.response.performance = `${end} ms`
        helper.utils.sendStatus(res, 200, helper.response )
      }
    },
    error => {
        var end = (new Date() - helper.start)/1000

        helper.response.success = false
        helper.response.message = error
        helper.response.performance = `${end} ms`
        helper.utils.sendStatus(res, 200, helper.response )
    }
  )
  // helper.generatePass(12).then(
  //   success => {
  //     console.log(success);
  //   },
  //   error => {
  //     console.log(error);
  //   }
  // )
}


/**
 * @route GET /validate-token
 * @group Account
 * @produces application/json
 * @consumes application/json
 * @returns {object} 200 - { "success": true, "message": "Message Success, Message Error", "data": "if any, could be object / json" }
 * @security JWT
 */
exports.validateToken = (req, res) => {
  helper.start = new Date()

  helper.response.data = {}

  var end = (new Date() - helper.start)/1000

  helper.response.success = true
  helper.response.message = 'Validated Token'
  helper.response.performance = `${end} ms`
  helper.utils.sendStatus(res, 200, helper.response )
}


/**
 * @route GET /blast-email
 * @group Account
 * @produces application/json
 * @consumes application/json
 * @returns {object} 200 - { "success": true, "message": "Message Success, Message Error", "data": "if any, could be object / json" }
 * @security JWT
 */
exports.blastEmail = (req, res) => {
  helper.start = new Date()
  helper.response.data = {}


  var table = 'user_login';
  var dataSelect = {}
  dataSelect.send_email = 0;

  helper.getFromTable('user_login', dataSelect).then(
    success => {
      var count = 0;
      if (success.length > 0){
        success.forEach(data => {
          helper.ejs.renderFile('email.html', {
            username: data.username,
            password: data.generated_body
          }).then(
            success => {
              var emailTemplate = success;
              helper.utils.sendEmail(data.username, 'Invitation', emailTemplate);
              // res.send(emailTemplate)
              var dataCondition = {}
              dataCondition.id = data.id;

              var dataUpdate = {}
              dataUpdate.send_email = true;
              helper.updateToTable(table, dataCondition, dataUpdate);
            },
            error => {}
          )
          count++;
        });
      }
      var end = (new Date() - helper.start)/1000

      helper.response.success = true
      helper.response.message = 'Success Send '+count+' Email'
      helper.response.performance = `${end} ms`
      helper.utils.sendStatus(res, 200, helper.response )
    },
    error => {
      var end = (new Date() - helper.start)/1000

      helper.response.success = false
      helper.response.message = 'Failed to fetch Data'
      helper.response.performance = `${end} ms`
      helper.utils.sendStatus(res, 200, helper.response )
    }
  );
  // helper.ejs.compile('email.pug', {
  //   username: 'Beni',
  //   password: 'Beni'
  // })
  // console.log(tmphtml);
  // res.send(tmphtml);
  // helper.utils.sendStatus(res, 200, tmphtml )
}