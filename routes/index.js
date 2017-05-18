var router = require('express')(); 

var book = require('./Book/book');

/**
 * Defines simple GET Request, ensures server is up and running :)
 */

router.get('/', function(req, res, next) {
    res.send('Page is down!');
});


/**
 * Define APP Endpoints here
 */

const bookApiPrefix = '/api/bookstore/';

router.get(`${bookApiPrefix}getCategories`, book.getCategories);
router.get(`${bookApiPrefix}getBookByCategoryId/:categoryid`, book.getBooksByCategoryId);
router.post(`${bookApiPrefix}updateBook`, book.updateBook);


module.exports = router;



