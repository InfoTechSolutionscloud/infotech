import mongoose from 'mongoose'

const portfolioSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    reviews: {
        type: [{
            username: {type: String, required: true},
            rating: {type: Number, required: true, default: 0},
            review: {type: String, required: true}
        }],
        default: []
    }
})

export default mongoose.models.portfolio || mongoose.model("portfolio", portfolioSchema);
