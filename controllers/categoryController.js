const Category = require('../models/category');
const Item = require('../models/item')
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

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
    res.render('category_form', {title: "Create a Category"})
})

exports.category_create_post = [
    body('name', 'Name must be at least 3 characters'),
    body('description', 'Description must be at least 3 characters'),
    asyncHandler ( async ( req, res, next) => {
        const errors = validationResult(req)
        const category = new Category (
            {
                name: req.body.name,
                description: req.body.description
            }
        )
        if (!errors.isEmpty()) {
            res.render('category_form',{ 
                title: 'Create a Category',
                category: category,
                errors: errors.array()
            })
            return
        } else {
            const categoryExists = await Category.findOne( {name: req.body.name}).exec()
            if (categoryExists) {
                res.redirect(categoryExists.url)
            } else {
                await category.save()
                res.redirect(category.url)
            }
        }
})
]

exports.category_delete_get = asyncHandler ( async ( req, res, next) => {
    const [ category, allItemsByCategory ] = await Promise.all (
        [
            Category.findById(req.params.id).exec(),
            Item.find( {category: req.params.id}, 'name').exec()
        ]
    )
    if (category === null) {
        res.redirect('/collection/categories')
    }
    res.render('category_delete', { title: 'Delete a Category', category: category, category_items: allItemsByCategory})
})

exports.category_delete_post = asyncHandler ( async ( req, res, next) => {
    const [ category, allItemsByCategory ] = await Promise.all (
        [
            Category.findById(req.params.id).exec(),
            Item.find( {category: req.params.id}, 'name').exec()
        ]
    )
    if (allItemsByCategory.length > 0) {
        res.render('category_delete', {title: 'Delete a Category', category: category, category_items: allItemsByCategory})
        return
    } else {
        await Category.findByIdAndRemove(req.body.categoryid)
        res.redirect('/collection/categories')
    }
})

exports.category_update_get = asyncHandler ( async ( req, res, next) => {
    const category = await Category.findById(req.params.id).exec()
    if (category === null) {
        const error = new Error("Category not found")
        error.status = 404;
        return next(error)
    }
    res.render('category_form', { title: "Update a category", category: category})
})

exports.category_update_post = [
    body('name', 'Name must be at least 3 characters'),
    body('description', 'Description must be at least 3 characters'),
    asyncHandler ( async ( req, res, next) => {
    const errors = validationResult(req);
    const category = new Category (
        {
            name: req.body.name,
            description: req.body.description,
            _id: req.params.id
        }
    )
    if (!errors.isEmpty()) {
        res.render('category_form', {title: 'Update a category', category: category, errors: errors.array()})
        return
    } else {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category)
        res.redirect(updatedCategory.url)
    }
})
]