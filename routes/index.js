var express = require('express');
var router = express.Router();

const Item = require('../models/item')
const Category = require('../models/category')
const Brand = require('../models/brand')

/* GET home page. */
router.get('/',  async function(req, res, next) {
  const [ products, categories, brands ] = await Promise.all ( [
    Item.countDocuments().exec(), Category.countDocuments().exec(), Brand.countDocuments().exec()
  ])
  res.render('index', { 
    title: 'Asian Beauty Inventory Application', 
    products_count: products,
    categories_count: categories,
    brands_count: brands
 });
});

module.exports = router;
