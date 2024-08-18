import mongoose from 'mongoose'

const StatusSchema = mongoose.Schema({
    projectId:{
        type: mongoose.Types.ObjectId,
        ref: 'project'
    },
    status: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    completion_date: {
        type: Date,
        required: true
    }
})

export default mongoose.models.Status || mongoose.model("Status", StatusSchema);
