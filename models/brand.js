const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BrandSchema = new Schema (
    {
        name: { type: String, minLength: 2, maxLength:100, required: true},
        description: { type: String, minLength: 2, maxLength:100, required: true},
        products: [{ type: Schema.Types.ObjectId, ref: "Item" }]
    }
)

BrandSchema.virtual('url').get( function () {
    return `/collection/brand/${this._id}`
})

module.exports = mongoose.model("Brand", BrandSchema)