var compression = require('compression');
var helmet = require('helmet');
var config = require('./tools/config');
var cors = require('cors')
var express = require('express'),
    app = express(),
    port = process.env.PORT || config.server_port,
    bodyParser = require('body-parser');
var reviver = require('./tools/reviver')
var expressSwagger = require('express-swagger-generator')(app);
let options = {
    swaggerDefinition: {
        info: {
            description: 'E-PRASMUL API Documentation',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: `${config.server}:${config.server_port}`,
        // basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'access-token',
                description: "",
            }
        }
    },
    basedir: __dirname,
    files: ['./app/**/*.js']
};

app.set("view engine", "ejs");
app.use(cors())
app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({
    reviver: reviver
}));


var routes = require('./app/routes/route');
routes(app);
var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});
expressSwagger(options)
