const router = require('express').Router();
const path = require('path');

// router.use('/path', require('./api/path'));

router.get('/', function(req, res){
	  res.sendFile(path.join(__base + '../public/index.html'));

});

module.exports = router;