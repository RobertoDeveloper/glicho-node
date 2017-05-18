var dbConn = require('../../connect/databaseConnection');

module.exports.getCategories = getCategories;
module.exports.getBooksByCategoryId = getBooksByCategoryId;
module.exports.updateBook = updateBook;

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

function updateBook(bookObject, callback) {
    //update book logic can be added here

    var status = ""; // create twitter status
    insertBook(bookObject, status, callback);
}


function insertBook(bookObject, status, callback) {
    var query = "insert into Book.Book (userid_fk, name, categoryid_fk, author, price, description) " +
        "Values($1, $2, $3, $4, $5, $6)";

    var params = [bookObject.userid_fk, bookObject.name, bookObject.categoryid_fk, bookObject.author, bookObject.price, bookObject.description];

    dbConn.pgRun({query: query, params : params, insertUpdate: true}, function (err, result) {
        if (err) {
            callback(err);
        } else {
            //we can also use twitter api to post book on twitter
            callback(null, {status: "OK", data: {rows: result.rows}});
        }
    });
}


