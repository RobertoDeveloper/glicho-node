var postgre = require('pg');

module.exports = {
    pgRun: pgRun,
    retrieveDatabaseConnectionString: retrieveDatabaseConnectionString,
    rollbackTransaction: rollbackTransaction
}

function pgRun(runObject, callback) {
    postgre.connect(retrieveDatabaseConnectionString(),
        function (err, client, done) {

            client.query(runObject.query,
                runObject.params, function (err, res) {

                    if (err) {
                        if (runObject.insertUpdate) {
                            client.query('ROLLBACK', function (err) {
                                done(err);
                            });
                        } else {
                            done();
                        }

                        callback(err);
                        return;
                    }

                    if (res) {
                        if (runObject.insertUpdate) {
                            client.query('COMMIT', done);
                        }else {
                            done();
                        }

                        callback(null, res);
                        return;
                    }
                    //fallback
                    callback(null, {result: 'no records'});
                });
        });
}

function retrieveDatabaseConnectionString() {
    return {
        user: "zslhoqnmgpppwd",
        password: "aOhMpGNxsUyGd2gWW3LrBeiAO7",
        database: "d5ued8bfgjgbk4",
        port: 5432,
        host: "ec2-107-21-118-56.compute-1.amazonaws.com",
        ssl: true
    };
}

function rollbackTransaction(client, done) {
    client.query('ROLLBACK', function (err) {
        done(err);
    });
}

function disconnect() {
    postgre.disconnect();
}