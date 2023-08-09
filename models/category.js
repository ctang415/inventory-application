const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema (
    {
        name: { type: String, minLength: 2, maxLength: 100, required: true},
        description: { type: String, minLength: 3, maxLength: 100, required: true},
        products:  [{ type: Schema.Types.ObjectId, ref: "Story" }]
    }
)

CategorySchema.virtual('url').get( function () {
    return `/collection/category/${this._id}`
})

module.exports = mongoose.model("Category", CategorySchema)