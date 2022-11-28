const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: true
    },
    size: {
        type: Array
    },
    color: {
        type: Array
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    }

}, { timestamps: true })

module.exports = ProductSchema