import authMiddleware from "@/app/lib/authMiddleware";
import dbConnect from "@/app/lib/mongoose";
import Blog from "@/app/models/Blog";
import { NextResponse } from "next/server";


//Admin can post blogs
async function createBlog(request) {
    await dbConnect();
    try {
        const user = request.user;
        if(user.role !== 'admin' && user.role !== 'blogger') return new Response(JSON.stringify({message: "You are not admin or blogger"}), {status: 403})
        
        const { blogTitle, blogImage, blog_description, blogContent, blog_slug, tags, createdBy } = await request.json();

        if (!blogTitle || !blog_description || !blogContent || !blog_slug || !tags || !createdBy) {
            return new Response(JSON.stringify({ message: "Missing Fields" }), { status: 400 });
        }
        const readyTags = tags.split(',');
        const count = await Blog.countDocuments({ blog_slug });
        let newslug;
        if (count > 0) {
            newslug = blog_slug + '-' + (count + 1);
        } else {
            newslug = blog_slug;
        }
        const newBlog = new Blog({
            blogTitle, blogImage, blog_description, blogContent, blog_slug: newslug, tags: readyTags, createdBy
        });
        await newBlog.save();
        return new Response(JSON.stringify({ message: "Blog Created!", url: `${blog_slug}` }), { status: 200 });

    } catch (error){
        if(error.code == 11000){
            return new Response(JSON.stringify({message: "Slug is already exist!"}), {status: 400})
        }
        console.log(error);
        return new Response(JSON.stringify({message: "Error Occured", error: error}))
    }
}

//Update Blog
async function updateBlog(request) {
    await dbConnect();
    try {
        const user = request.user;
        if(user.role !== 'admin' && user.role !== 'blogger') return new Response(JSON.stringify({message: "You are not admin or blogger"}), {status: 403})
        
        const { _id, blogTitle, blogImage, blog_description, blogContent, blog_slug, tags } = await request.json();
        const id = _id;
        if (!id) {
            return new Response(JSON.stringify({ message: "Missing ID" }), { status: 400 });
        }
        const readyTags = tags.split(',');
        const blog = await Blog.findByIdAndUpdate(id, {$set:{
            blogTitle, blogImage, blog_description, blogContent, tags: readyTags, updatedAt: Date.now()
        }});
        if (!blog) {
            return new Response(JSON.stringify({ message: "Blog not found" }), { status: 404 });
        }
        return new Response(JSON.stringify({ message: "Blog Updated!", data: blog }), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message: "Error Occured", error: error}))
    }
}

//Get All Blogs
export async function GET(request){
    try {
        await dbConnect();
        const getAllBlogs = await Blog.find({});
        return NextResponse.json(getAllBlogs);
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message: "Something went wrong! Try again"}))
    }
}

export const POST = authMiddleware(createBlog)
export const PUT = authMiddleware(updateBlog)