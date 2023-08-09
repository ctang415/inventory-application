const Item = require('../models/item');
const asyncHandler = require('express-async-handler');

exports.item_list = asyncHandler ( async ( req, res, next) => {
    const allItems = await Item.find({}, "name").sort({name: 1}).exec()
    res.render("item_list", {title: "All Items", item_list: allItems})
})

exports.item_detail = asyncHandler ( async ( req, res, next) => {
    
})

exports.item_create_get = asyncHandler ( async ( req, res, next) => {
    
})

exports.item_create_post = asyncHandler ( async ( req, res, next) => {
    
})

exports.item_delete_get = asyncHandler ( async ( req, res, next) => {
    
})

exports.item_delete_post = asyncHandler ( async ( req, res, next) => {
    
})

exports.item_update_get = asyncHandler ( async ( req, res, next) => {
    
})

exports.item_update_post = asyncHandler ( async ( req, res, next) => {
    
})