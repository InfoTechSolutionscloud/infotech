import dbConnect from "@/app/lib/mongoose";
import Blog from "@/app/models/Blog";
import { NextResponse } from "next/server";


//Admin can post blogs
export async function POST(request) {
    try {
        await dbConnect();
        const { blogTitle, blogImage, blog_description, blogContent, blog_slug, tags, createdBy } = await request.json();

        if (!blogTitle || !blog_description || !blogContent || !blog_slug || !tags || !createdBy) {
            return new Response(JSON.stringify({ message: "Missing Fields" }), { status: 400 });
        }

        const newBlog = new Blog({
            blogTitle, blogImage, blog_description, blogContent, blog_slug, tags, createdBy
        });
        await newBlog.save();
        return new Response(JSON.stringify({ message: "Blog Created!", url: `http://localhost:3000/blogs/${blog_slug}` }), { status: 200 });

    } catch (error){
        if(error.code == 11000){
            return new Response(JSON.stringify({message: "Slug is already exist!"}), {status: 400})
        }
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