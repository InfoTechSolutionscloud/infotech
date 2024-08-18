import dbConnect from "@/app/lib/mongoose";
import Blog from "@/app/models/Blog";
import { NextResponse } from "next/server";


export async function GET(request, params) {
    console.log(params);
    const { id } = params.params;
    console.log(id)
    try {
        await dbConnect();
        const blog = await Blog.findOne({ blog_slug: id });
        if (!blog) {
            return new Response(JSON.stringify({ message: "Blog Not Found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ data: blog }), { status: 200 })

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "Error Occured" }), { status: 500 });
    }
}

export async function PUT(request, params) {
    try {
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

export async function DELETE(request, params){
    try {
        const { id } = params.params;
        const blog = await Blog.findOneAndDelete({ blog_slug: id });
        if (!blog) {
            return NextResponse.json(({ message: "Blog Not Found" }), { status: 404 });
        }
        return NextResponse.json(({ message: "Blog Deleted" }), { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(({ message: "Error Occured", error: error.message }), { status: 500 });
    }
}