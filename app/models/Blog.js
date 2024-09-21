import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    blogTitle:{
        type: String,
        required: true,
    },
    blogImage:{
        type: String
    },
    blog_description:{
        type: String,
    },
    blogContent:{
        type: String,
        required: true,
    },
    blog_slug:{
        type: String,
        unique: true
    },
    tags: {
        type: Array,
        default: [],
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    views: {
        type: Number,
        default: 0
    }
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);