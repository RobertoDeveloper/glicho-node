var bookLib = require('../../lib/Book/book');

module.exports.getCategories = getCategories;
module.exports.getBooksByCategoryId = getBooksByCategoryId;

function getCategories(req, res, next) {
    bookLib.getCategories(function(err, result) {
        if(err) {
            return next(err);
        } else {
            res.json(result);
        }
    });
}

function getBooksByCategoryId(req, res, next) {
    var categoryId = req.params.categoryid;

    if(isNaN(categoryId) || (!isNaN(categoryId) && categoryId <= 0)){
        res.status(500); 
        res.json('categoryId is not valid');
    }
    else {
        bookLib.getBooksByCategoryId(categoryId, function(err, result) {
            if(err) {
                return next(err);
            }else {
                res.json(result);
            }
        });
    }
}