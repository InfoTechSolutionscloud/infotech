import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    clientEmail:{
        type: String,
        required: true
    }, 
    clientName: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        requried: true
    },
    projectTitle: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,
    },
    project_deadline: {
        type: Date,
        required: true
    },
    workerEmail:{
        type: String,
        required: true
    },
    statusId:{
        type: mongoose.Types.ObjectId,
        ref: 'status'
    }
});

export default mongoose.models.Project || mongoose.model("Project", projectSchema);