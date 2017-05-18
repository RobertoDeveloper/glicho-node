var bookModel = require('../../model/Book/bookModel');

module.exports.getCategories = getCategories;
module.exports.getBooksByCategoryId = getBooksByCategoryId;

function getCategories(callback) {
    bookModel.getCategories(callback);
}

function getBooksByCategoryId(id, callback) {
    bookModel.getBooksByCategoryId(id, callback);
}

