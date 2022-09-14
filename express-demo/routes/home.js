const express = require('express');
//when you seperate the file, your dont call app = express(), you call const router = express.Router(); instead
const router = express.Router();

//defining a route with express
router.get('/', (req, res) => {
    //calling the view template
    res.render('../index', {title: 'My Express App', message: 'Hello'});
});

module.exports = router;