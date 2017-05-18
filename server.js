var express = require('express');

var bodyParser = require('body-parser');

var application = express();

application.use(bodyParser.json({limit: '100mb'}));

application.all('/*', function(req, res, next) {
    var dev = true; 

    var allowedDomains = ["https://glicho-react.netlify.com/"];
    var host = req.header('Origin');

    if(allowedDomains.indexOf(host) > -1 || dev) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    }else {
        res.status(401).end();
        return;
    }
    
    if(req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

//we can add middleware here, for example to validate request

application.use('/', require('./routes'));

application.use(function(req, res, next) {
    var err = new Error('Not Found!');
    err.status = 404;
    next(err);
});

application.set('port', process.env.PORT || 3050);

var server = application.listen(application.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});

