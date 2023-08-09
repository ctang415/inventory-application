const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema (
    {
        name: { type: String, minLength: 2, maxLength:100, required: true},
        brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true},
        description: { type: String, minLength: 2, required: true},
        ingredients: { type: String, minLength: 2, required: true},
        category: [{ type: Schema.Types.ObjectId, ref: "Category", required: true}],
        price: { type: Number, required: true},
        stock: { type: Number}
    }
)

ItemSchema.virtual('url').get( function () {
    return `/collection/item/${this._id}`
})

module.exports = mongoose.model("Item", ItemSchema)