const Item = require('../models/item');
const Category = require('../models/category')
const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");


exports.item_list = asyncHandler ( async ( req, res, next) => {
    const allItems = await Item.find({}, "name").sort({name: 1}).exec()
    res.render("item_list", {title: "All Items", item_list: allItems})
})

exports.item_detail = asyncHandler ( async ( req, res, next) => {
    const item = await Item.findById(req.params.id).populate("brand").populate("category").exec()
    if (item === null) {
        const error = new Error ('Item does not exist')
        error.status = 404
        return next(error)
    }
    res.render('item_detail', {title: "Item Detail", item:item })
})

exports.item_create_get = asyncHandler ( async ( req, res, next) => {
    const [ allBrands, allCategories ] = await Promise.all (
        [
            Brand.find().exec(),
            Category.find().exec()
        ]
    )
    res.render('item_form', { title: 'Create an Item', brands: allBrands, categories: allCategories})
})

exports.item_create_post = [
    (req, res, next) => {
        if (!(req.body.category instanceof Array)) {
            if (typeof req.body.category === "undefined") req.body.category = []
            else req.body.category = new Array(req.body.category)
        }
        next()
    },
    body("name", "Name must be at least 3 characters").trim().isLength({min: 3}).escape(),
    body('brand', "Brand must be at least 3 characters").trim().isLength({min: 3}).escape(),
    body("description", "Description must be at least 3 characters").trim().isLength({min: 3}).escape(),
    body('ingredients', "Ingredients must be at least 3 characters").trim().isLength({min:3}).escape(),
    body("category.*").escape(),
    body('price', "Must be numeric").trim().isCurrency( {require_symbol: false, allow_negatives: false, allow_decimal: true}).escape(),
    body('stock', 'Must be numeric').trim().isNumeric().escape(),
    asyncHandler ( async ( req, res, next) => {
        const errors = validationResult(req);
        const item = new Item (
            {
                name: req.body.name,
                brand: req.body.brand,
                description: req.body.description,
                ingredients: req.body.ingredients,
                category: req.body.category,
                price: req.body.price,
                stock: req.body.stock
            }
        )
        if (!errors.isEmpty()) {
            const [ allBrands, allCategories ] = await Promise.all (
                [
                    Brand.find().exec(),
                    Category.find().exec()
                ]
            )
            for (const category of allCategories) {
                if (item.category.indexOf(category._id) > -1) {
                    category.checked = "true"
                }
            }
            res.render('item_form', { title: "Create an item", brands: allBrands, categories: allCategories, item: item,
            errors:errors.array() })
        } else {
            await item.save()
            res.redirect(item.url)
        }
    
})
]

exports.item_delete_get = asyncHandler ( async ( req, res, next) => {
    const item = await Item.findById(req.params.id).populate('brand').populate('category').exec()
    if (item === null ) { 
        res.redirect('/collection/items')
    }
    res.render('item_delete', {title: "Delete an item", item: item})
})

exports.item_delete_post = asyncHandler ( async ( req, res, next) => {
    await Item.findByIdAndRemove(req.body.itemid)
    res.redirect('/collection/items')
})

exports.item_update_get = asyncHandler ( async ( req, res, next) => {
    const [ item, allBrands, allCategories] = await Promise.all (
        [
            Item.findById(req.params.id).populate('brand').populate('category').exec(),
            Brand.find().exec(),
            Category.find().exec()
        ]
    )
    if (item === null) {
        const error = new Error('Item not found')
        error.status = 404
        return next(error)
    } 
        for (const category of allCategories) {
            for (const item_c of item.category) {
              if (category._id.toString() === item_c._id.toString()) {
                category.checked = "true";
              }
            }
          }
        res.render('item_form', {title: 'Update an item', item: item, brand_list: allBrands, category_list: allCategories})
})

exports.item_update_post = [
    (req, res, next) => {
        if (!(req.body.category instanceof Array)) {
            if (typeof req.body.category === "undefined") req.body.category = []
            else req.body.category = new Array(req.body.category)
        }
        next()
    },
    body("name", "Name must be at least 3 characters").trim().isLength({min: 3}).escape(),
    body('brand', "Brand must be at least 3 characters").trim().isLength({min: 3}).escape(),
    body("description", "Description must be at least 3 characters").trim().isLength({min: 3}).escape(),
    body('ingredients', "Ingredients must be at least 3 characters").trim().isLength({min:3}).escape(),
    body("category.*").escape(),
    body('price', "Must be numeric").trim().isCurrency( {require_symbol: false, allow_negatives: false, allow_decimal: true}).escape(),
    body('stock', 'Must be numeric').trim().isNumeric().escape(),
    asyncHandler ( async ( req, res, next) => {
        const errors = validationResult(req)
        const item = new Item (
            {
                name: req.body.name,
                brand: req.body.brand,
                description: req.body.description,
                ingredients: req.body.ingredients,
                category: typeof req.body.genre === "undefined" ? [] : req.body.category,
                price: req.body.price,
                stock: req.body.stock,
                _id: req.params.id
            }
        )
        if (!errors.isEmpty()) {
            const [ allBrands, allCategories] = await Promise.all (
                [
                    Brand.find().exec(),
                    Category.find().exec()
                ]
            )
            for (const category of allCategories) {
                if (item.category.indexOf(category._id) > -1) {
                  category.checked = "true";
                }
              }
            res.render('item_form', {title: 'Update an item', item : item, brand_list: allBrands, category_list: allCategories, errors: errors.array()})
            return
        } else {
            const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {})
            res.redirect(updatedItem.url)
        }
})
]