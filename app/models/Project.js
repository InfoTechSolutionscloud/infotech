import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    clientId:{
        type: mongoose.Types.ObjectId,
        ref: 'users'
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
    worker:{
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    statusId:{
        type: mongoose.Types.ObjectId,
        ref: 'status'
    }
});

export default mongoose.models.Project || mongoose.model("Project", projectSchema);