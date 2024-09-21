import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
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
    service: {
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

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);
