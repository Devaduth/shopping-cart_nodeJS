var express = require('express');
const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
/* GET home page. */
router.get('/', function (req, res, next) {
  productHelpers.getAllProducts().then((products) => {
    console.log(products);
    res.render('user/view-products', { admin: true,  products })
  })

});

module.exports = router;
