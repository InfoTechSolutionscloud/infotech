"use client"
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Image from "next/image";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const page = () => {

    const [blog, setBlog] = useState({
        blogTitle: "",
        blogImage: "",
        blog_description: "",
        blogContent: "",
        blog_slug: "",
        tags: "",
        createdBy: "",
    })
    const [message, setMessage] = useState();
    const [pending, setPending] = useState();
    const [image, setImage] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!image) return;
        setPending(true)
        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setPending(false)
                setBlog({ ...blog, blogImage: data.url });
            } else {
                alert("Image upload failed!");
                setPending(false)
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image!");
            setPending(false)
        }
    };

    const createBlog = async (e) => {
        setPending(true);
        try {
            e.preventDefault()
            const res = await axios.post('/api/blogs', blog, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.status == 200) {
                setMessage(`Blog created successfully! Visit ${location.origin}/blogs/${res.data.url}`)
                setPending(false);
            }
        } catch (error) {
            setMessage(`Failed to create blog: ${error.response.data.message}`);
            setPending(false);
        }
       
    }
    const handleContentChange = (content) => {
        setBlog({ ...blog, blogContent: content });
    };
    return (
        <div className='bg-gray-900 w-full p-5 px-10'>
            <h3 className='text-4xl text-white font-bold py-5 text-left merriweather'>Create Blog</h3>

            <p className='text-gray-300 text-sm pb-5 raleway'>Create a best blog that gives you rank on Google!</p>
            <div className="flex flex-col justify-center items-center gap-y-1 py-2">
                <Image src={blog.blogImage == "" ? "https://placehold.co/600x400/jpeg" : blog.blogImage} width={200} height={200} alt="blogimage" />
                <label className='text-white font-semibold mr-2 luto'>Upload Image</label>
                <input type="file" className="text-white" onChange={handleFileChange} />
                <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    {pending ? "Uploading..." : "Upload"}
                </button>
            </div>
            <form onSubmit={(e) => createBlog(e)} className='w-full md:w-2/3 py-5 mx-auto'>
                <label className='text-2xl text-white font-semibold mr-2 luto'>Blog Title</label>
                <input className='w-full text-2xl text-white bg-transparent border-2 border-secondary-600 rounded-md mb-4 focus:shadow-md p-2 focus:shadow-secondary-400' type="text" name='blogTitle' value={blog.blogTitle} onChange={(e) => setBlog({ ...blog, [e.target.name]: e.target.value })} />


                <label className='text-white font-semibold mr-2 luto'>Blog Description (Meta Description)</label>
                <textarea className='w-full text-white bg-transparent border-2 border-secondary-600 rounded-md mb-4 focus:shadow-md p-2 focus:shadow-secondary-400' type="text" name='blog_description' value={blog.blog_description} onChange={(e) => setBlog({ ...blog, [e.target.name]: e.target.value })} ></textarea>


                <label className='text-white font-semibold mr-2 luto'>Content</label>
                <ReactQuill
                    className='text-black bg-white border-2 border-secondary-600 rounded-md mb-4'
                    theme="snow"
                    value={blog.blogContent}
                    onChange={handleContentChange}
                />
                <label className='text-white font-semibold mr-2 luto'>Blog Slug</label>
                <input className='w-full text-white bg-transparent border-2 border-secondary-600 rounded-md mb-4 focus:shadow-md p-2 focus:shadow-secondary-400' type="text" name='blog_slug' value={blog.blog_slug} onChange={(e) => setBlog({ ...blog, [e.target.name]: e.target.value })} />

                <label className='text-white font-semibold mr-2 luto'>Blog Tags</label>
                <input className='w-full text-white bg-transparent border-2 border-secondary-600 rounded-md mb-4 focus:shadow-md p-2 focus:shadow-secondary-400' type="text" name='tags' value={blog.tags} onChange={(e) => setBlog({ ...blog, [e.target.name]: e.target.value })} />

                <label className='text-white font-semibold mr-2 luto'>Created By</label>
                <input className='w-full text-white bg-transparent border-2 border-secondary-600 rounded-md mb-4 focus:shadow-md p-2 focus:shadow-secondary-400' type="text" name='createdBy' value={blog.createdBy} onChange={(e) => setBlog({ ...blog, [e.target.name]: e.target.value })} />
                {message && <div className="text-sm font-semibold text-secondary-400 py-2 text-center">{message}</div>}
                <button type="submit" className="bg-secondary-800 text-white px-3 py-2 rounded-md disabled:bg-gray-800 disabled:text-gray-500" disabled={pending}>{pending ? "Creating..." : "Create Blog"}</button>
            </form>
        </div>
    )
}

export default page
