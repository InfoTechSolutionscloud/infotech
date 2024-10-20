import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    title: { type: String, required: true},
    image: {type: String, required: true},
    short_description: {type:String},
    category: {type: String, required: true},
    url: {type: String}

})

export default mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);
