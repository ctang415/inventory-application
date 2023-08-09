const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema (
    {
        name: { type: String, minLength: 2, maxLength:100, required: true},
        brand: { type: Schema.Types.ObjectId, ref: "Brand"},
        description: { type: String, minLength: 2, maxLength:100, required: true},
        category: [{ type: Schema.Types.ObjectId, ref: "Category"}],
        price: { type: Number, required: true},
        stock: { type: Number, required: true}
    }
)

ItemSchema.virtual('url').get( function () {
    return `/collection/item/${this._id}`
})

module.exports = mongoose.model("Item", ItemSchema)