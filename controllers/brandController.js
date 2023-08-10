const Brand = require('../models/brand');
const Item = require('../models/item')
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.brand_list = asyncHandler ( async ( req, res, next) => {
    const allBrands = await Brand.find({}, "name").sort({name: 1}).exec()
    res.render('brand_list', {title: "All Brands", brand_list: allBrands})
})

exports.brand_detail = asyncHandler ( async ( req, res, next) => {
    const [ brand, allItemsInBrand] = await Promise.all (
        [
            Brand.findById(req.params.id).exec(),
            Item.find({ brand: req.params.id }, "name description stock" ).sort({name: 1}).exec()
        ]
    )
    if (brand === null) {
        const error = new Error('Brand not found')
        error.status = 404
        return next(error)
    }
    res.render('brand_detail', {title: "Detail", brand: brand, brand_products: allItemsInBrand})
})

exports.brand_create_get = asyncHandler ( async ( req, res, next) => {
    res.render('brand_form', {title: "Create a Brand"})
})

exports.brand_create_post = [
    body("name", "Brand name must be at least 3 characters").trim().isLength({min: 3}).escape(),
    asyncHandler ( async ( req, res, next) => {
        const errors = validationResult(req)
        const brand = new Brand (
            {
                name: req.body.name
            })
        if (!errors.isEmpty()) {
            res.render('brand_form', { title: "Create brand", brand: brand, errors: errors.array()})
            return
        } else {
            const brandExists = await Brand.findOne({ name: req.body.name }).exec();
            if (brandExists) {
                res.redirect(brandExists.url)
            } else {
                await brand.save()
                res.redirect(brand.url)
            }
        }
})
]

exports.brand_delete_get = asyncHandler ( async ( req, res, next) => {
    const [brand, allItemsByBrand ] = await Promise.all ( 
        [
            Brand.findById(req.params.id).exec(),
            Item.find({ brand: req.params.id}, 'name').exec()
        ]
    )
    if (brand === null) {
        res.redirect('/collection/brands')
    }
    res.render('brand_delete', {title: "Delete brand", brand: brand, brand_items: allItemsByBrand})
})

exports.brand_delete_post = asyncHandler ( async ( req, res, next) => {
    const [brand, allItemsByBrand ] = await Promise.all ( 
        [
            Brand.findById(req.params.id).exec(),
            Item.find({ brand: req.params.id}, 'name').exec()
        ]
    )
    if (allItemsByBrand.length > 0) {
        res.render('brand_delete', {title: "Delete a brand", brand: brand, brand_items: allItemsByBrand})
        return
    } else {
        await Brand.findByIdAndRemove(req.body.brandid)
        res.redirect('/collection/brands')
    }
})

exports.brand_update_get = asyncHandler ( async ( req, res, next) => {
    const brand = await Brand.findById(req.params.id).exec()
    if (brand == null) {
        const error = new Error('Brand not found')
        error.status = 404
        return next(error)
    }
    res.render('brand_form', {title: "Update brand", brand: brand})
})

exports.brand_update_post = [
    body("name", "Brand name must be at least 3 characters").trim().isLength({min: 3}).escape(),
    asyncHandler ( async ( req, res, next) => {
    const errors = validationResult(req)
    const brand = new Brand (
        {
            name: req.body.name,
            _id: req.params.id
        }
    )
    if (!errors.isEmpty()) {
        res.render('brand_form', {title: 'Update a brand', brand: brand, errors: errors.array()})
        return
    } else {
        const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, brand)
        res.redirect(updatedBrand.url)
    }
})
]