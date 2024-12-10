import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    clientPhone: {
        type: String,
        required: true
    },
    Portfolio: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    budget: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);
