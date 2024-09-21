import authMiddleware from "@/app/lib/authMiddleware";
import dbConnect from "@/app/lib/mongoose";
import Blog from "@/app/models/Blog";
import { NextResponse } from "next/server";

//Get Specific blog
export async function GET(request, params) {
    const { id } = params.params; //Fetch id from params [id]
    try {
        await dbConnect();
        const blog = await Blog.findOne({ blog_slug: id });
        if (!blog) {
            return new Response(JSON.stringify({ message: "Blog Not Found" }), { status: 404 });
        }
        await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
        return new Response(JSON.stringify({ data: blog }), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Error Occured" }), { status: 500 });
    }
}

//Update specific blog
async function update(request, params) {
    try {
        const user = request.user;
        if(user.role !== 'admin' && user.role !== 'blogger') return new Response(JSON.stringify({message: "You are not admin"}), {status: 403})

        const { id } = params.params;
        const isExist = await Blog.findOne({ blog_slug: id });

        const { blogTitle, blogImage, blog_description, blogContent, blog_slug, tags } = await request.json();

        if (!isExist) {
            return NextResponse.json(JSON.stringify({ message: "Blog Not Found" }), { status: 404 });
        } else {
            const updateBlog = await Blog.findByIdAndUpdate(isExist._id, {
                $set: {
                    blogTitle, blogImage, blog_description, blogContent, blog_slug, tags
                }
            })
            if (updateBlog) {
                return NextResponse.json({ message: "Blog Updated" }, { status: 200 })
            }
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error occured", error: error.message }, { status: 500 })
    }
}

//Delete specific blog
async function deleteblog(request, {params}){
    try {
        const user = request.user;
        if(user.role !== 'admin' && user.role !== 'blogger') return new Response(JSON.stringify({message: "You are not admin"}), {status: 403})
        const id = params.id;
        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return NextResponse.json(({ message: "Blog Not Found" }), { status: 404 });
        }
        return NextResponse.json(({ message: "Blog Deleted" }), { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(({ message: "Error Occured", error: error.message }), { status: 500 });
    }
}

export const DELETE = authMiddleware(deleteblog)
export const PUT = authMiddleware(update)