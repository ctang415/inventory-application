const Category = require('../models/category');
const Item = require('../models/item')
const asyncHandler = require('express-async-handler');

exports.category_list = asyncHandler ( async ( req, res, next) => {
    const allCategories = await Category.find({}, "name description").sort( {name: 1}).exec()
    res.render("category_list", { title: "All Categories", category_list: allCategories});
})

exports.category_detail = asyncHandler ( async ( req, res, next) => {
    const [category, allItemsInCategory] = await Promise.all(
        [
            Category.findById(req.params.id).exec(),
            Item.find( {category: req.params.id}, "name description stock").exec()
        ]
    )
    if (category === null) {
        const error = new Error("Category not found")
        error.status = 404
        return next(error)
    }
    res.render("category_detail", { title: "Category Detail", category: category, category_products: allItemsInCategory})
})

exports.category_create_get = asyncHandler ( async ( req, res, next) => {
    
})

exports.category_create_post = asyncHandler ( async ( req, res, next) => {
    
})

exports.category_delete_get = asyncHandler ( async ( req, res, next) => {
    
})

exports.category_delete_post = asyncHandler ( async ( req, res, next) => {
    
})

exports.category_update_get = asyncHandler ( async ( req, res, next) => {
    
})

exports.category_update_post = asyncHandler ( async ( req, res, next) => {
    
})