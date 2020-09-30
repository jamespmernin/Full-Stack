const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = new Schema(
  {
    name: { type: String, required: true },
    imgURL: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    reviews: [{
      author: { type: String, required: true },
      rating: { type: Number, required: true },
      description: { type: String, required: true },
    }]
  },
  { timestamps: true,
    toJSON: { virtuals: true } 
  },
)

// forEach example
// Product.virtual('rating').get(function () {
//   let totalRating = 0
//   this.reviews.forEach(review => {
//     totalRating = totalRating + review.rating
//   })
//   return totalRating / this.reviews.length
// })

// reduce example
Product.virtual('rating').get(function () {
  return this.reviews.reduce((total, review) => total + review.rating, 0) / this.reviews.length
})

module.exports = mongoose.model('products', Product)