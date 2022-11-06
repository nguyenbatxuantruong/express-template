var express = require('express');
var router = express.Router();
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
/* GET home page. */
router.get('/', async (req, res, next) => {
  await timeout(3000);
  res.send('home');
});

module.exports = router;
