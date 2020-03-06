const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    //res.send('Hello World');
    res.render('index', { title : "My Express App - Vidly", message : "Hello"});
});

module.exports = router;