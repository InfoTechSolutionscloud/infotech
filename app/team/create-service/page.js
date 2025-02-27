"use client"
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Image from "next/image";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const page = () => {

    const [service, setService] = useState({
        title: "",
        image: "",
        short_description: "",
        description: "",
        slug: ""
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
                setService({ ...service, image: data.url });
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

    const createService = async (e) => {
        e.preventDefault()
        const res = await axios.post('/api/service', service, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(res);
        if (res.status == 200) {
            setMessage(`Service created successfully!`)
        }
    }
    const handleContentChange = (content) => {
        setService({ ...service, description: content });
    };
    return (
        <div className='bg-gray-900 w-full p-5 px-10'>
            <h3 className='text-4xl text-white font-bold py-5 text-left merriweather'>Create Service</h3>
            
           <div className="flex flex-col justify-center items-center gap-y-1 py-2"> 
            <Image src={service.image == "" ? "https://placehold.co/600x400/jpeg" : service.image} width={200} height={200} alt="serviceImage" />
                <label className='text-white font-semibold mr-2 luto'>Upload Image</label>
                <input type="file" className="text-white" onChange={handleFileChange} />
                <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    {pending ? "Uploading..." : "Upload"}
                </button>
                </div>
            <form onSubmit={(e) => createService(e)} className='w-full md:w-2/3 py-5 mx-auto'>
                <label className='text-2xl text-white font-semibold mr-2 luto'>Service Title</label>
                <input className='w-full text-2xl text-white bg-transparent border-2 border-secondary-600 rounded-md mb-4 focus:shadow-md p-2 focus:shadow-secondary-400' type="text" name='title' value={service.title} onChange={(e) => setService({ ...service, [e.target.name]: e.target.value })} />


                <label className='text-white font-semibold mr-2 luto'>Short Description (Meta Description)</label>
                <textarea className='w-full text-white bg-transparent border-2 border-secondary-600 rounded-md mb-4 focus:shadow-md p-2 focus:shadow-secondary-400' type="text" name='short_description' value={service.short_description} onChange={(e) => setService({ ...service, [e.target.name]: e.target.value })} ></textarea>


                <label className='text-white font-semibold mr-2 luto'>Description</label>
                <ReactQuill
                    className='text-black bg-white border-2 border-secondary-600 rounded-md mb-4'
                    theme="snow"
                    value={service.description}
                    onChange={handleContentChange}
                />
                <label className='text-white font-semibold mr-2 luto'>Service Slug</label>
                <input className='w-full text-white bg-transparent border-2 border-secondary-600 rounded-md mb-4 focus:shadow-md p-2 focus:shadow-secondary-400' type="text" name='slug' value={service.slug} onChange={(e) => setService({ ...service, [e.target.name]: e.target.value })} />
                {message && <div className="text-sm font-semibold text-secondary-400 py-2 text-center">{message}</div>}
                <button type="submit" className="bg-secondary-500 text-white px-3 py-2 rounded-md">Create Service</button>
            </form>
        </div>
    )
}

export default page
