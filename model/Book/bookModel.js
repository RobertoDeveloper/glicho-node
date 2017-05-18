var dbConn = require('../../connect/databaseConnection');

module.exports.getCategories = getCategories;
module.exports.getBooksByCategoryId = getBooksByCategoryId;

function getCategories(callback) {
    var query = "SELECT CategoryId, Name FROM Book.Category;";

    dbConn.pgRun({query: query, insertUpdate: false}, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, {status: "OK", data: {rows: result.rows}});
        }
    });
}

function getBooksByCategoryId(categoryid, callback) {
    var query = "SELECT userid_fk, bookid, name, author, price, description FROM Book.Book " +
        "WHERE categoryid_fk = $1 order by bookid desc;";

    var params = [categoryid];

    dbConn.pgRun({query: query, params : params, insertUpdate: false}, function (err, result) {
        if (err) {
            callback(err);
        } else {
            callback(null, {status: "OK", data: {rows: result.rows}});
        }
    });
}