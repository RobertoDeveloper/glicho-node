var bookModel = require('../../model/Book/bookModel');

module.exports.getCategories = getCategories;
module.exports.getBooksByCategoryId = getBooksByCategoryId;
module.exports.updateBook = updateBook;

function getCategories(callback) {
    bookModel.getCategories(callback);
}

function getBooksByCategoryId(id, callback) {
    bookModel.getBooksByCategoryId(id, callback);
}

function updateBook(bookObj, callback) {
    bookObj.categoryid_fk = bookObj.selectedCategory;
    bookObj.description = bookObj.condition;
    bookObj.name = bookObj.title;

    //test userid value for now... 
    bookObj.userid_fk = 160; 

    bookModel.updateBook(bookObj, callback);
}

