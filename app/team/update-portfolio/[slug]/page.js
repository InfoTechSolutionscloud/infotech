"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Image from "next/image";
import useSWR from "swr";
import public_fetcher from "@/app/lib/fetcher";
import Loading from "@/app/loading";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Page = ({ params }) => {
    const [portfolio, setPortfolio] = useState({
        _id: "",
        title: "",
        image: "",
        pdf: "",
        short_description: "",
        description: "",
        slug: "",
    });
    const [message, setMessage] = useState();
    const [pending, setPending] = useState();
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null); // State for PDF

    const { data, error, isLoading } = useSWR(`/api/portfolio?slug=${params.slug}`, public_fetcher);

    useEffect(() => {
        if (data) {
            setPortfolio(data.portfolio);
        }
    }, [data]);

    // Handle image change
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    // Handle PDF change
    const handlePdfChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setPdf(event.target.files[0]);
        }
    };

    // Upload image
    const handleUpload = async () => {
        if (!image) return;
        setPending(true);
        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setPending(false);
                setPortfolio({ ...portfolio, image: data.url });
            } else {
                alert("Image upload failed!");
                setPending(false);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image!");
            setPending(false);
        }
    };

    // Upload PDF
    const handlePdfUpload = async () => {
        if (!pdf) return;
        setPending(true);
        const formData = new FormData();
        formData.append("pdf", pdf);

        try {
            const response = await fetch("/api/upload-pdf", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setPending(false);
                setPortfolio({ ...portfolio, pdf: data.url });
            } else {
                alert("PDF upload failed!");
                setPending(false);
            }
        } catch (error) {
            console.error("Error uploading PDF:", error);
            alert("Error uploading PDF!");
            setPending(false);
        }
    };

    // Update portfolio
    const createPortfolio = async (e) => {
        e.preventDefault();
        const res = await axios.put('/api/portfolio', portfolio, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        console.log(res);
        if (res.status === 200) {
            setMessage(`Portfolio updated successfully!`);
        }
    };

    const handleContentChange = (content) => {
        setPortfolio({ ...portfolio, description: content });
    };

    // Handle PDF download
    const handleDownload = () => {
        if (!portfolio.pdf) return;
        const link = document.createElement("a");
        link.href = portfolio.pdf;
        link.download = "portfolio.pdf";
        link.click();
    };

    return (
        <div className="bg-gray-900 w-full p-5 px-10">
            <h3 className="text-4xl text-white font-bold py-5 text-left merriweather">Update Portfolio</h3>
            {isLoading && <Loading />}
            {error && <p>{error.message}</p>}
            {data && (
                <>
                    <div className="flex flex-col justify-center items-center gap-y-1 py-2">
                        <Image
                            src={portfolio.image === "" ? "https://placehold.co/600x400/jpeg" : portfolio.image}
                            width={200}
                            height={200}
                            alt="portfolioImage"
                        />
                        <label className="text-white font-semibold mr-2 luto">Upload Image</label>
                        <input type="file" className="text-white" onChange={handleFileChange} />
                        <button
                            onClick={handleUpload}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            {pending ? "Uploading..." : "Upload"}
                        </button>
                    </div>

                    {/* PDF Upload Section */}
                    <div className="flex flex-col justify-center items-center gap-y-1 py-2">
                        <label className="text-white font-semibold mr-2 luto">Upload PDF</label>
                        <input type="file" className="text-white" onChange={handlePdfChange} />
                        <button
                            onClick={handlePdfUpload}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            {pending ? "Uploading..." : "Upload PDF"}
                        </button>
                        {portfolio.pdf && (
                            <button
                                onClick={handleDownload}
                                className="bg-green-500 text-white px-4 py-2 rounded-md mt-3"
                            >
                                Download PDF
                            </button>
                        )}
                    </div>

                    <form
                        onSubmit={(e) => createPortfolio(e)}
                        className="w-full md:w-2/3 py-5 mx-auto"
                    >
                        <label className="text-2xl text-white font-semibold mr-2 luto">
                            Portfolio Title
                        </label>
                        <input
                            className="w-full text-2xl text-white bg-transparent border-2 border-secondary-600 rounded-md mb-4 focus:shadow-md p-2 focus:shadow-secondary-400"
                            type="text"
                            name="title"
                            value={portfolio.title}
                            onChange={(e) =>
                                setPortfolio({ ...portfolio, [e.target.name]: e.target.value })
                            }
                        />

                        <label className="text-white font-semibold mr-2 luto">
                            Short Description (Meta Description)
                        </label>
                        <textarea
                            className="w-full text-white bg-transparent border-2 border-secondary-600 rounded-md mb-4 focus:shadow-md p-2 focus:shadow-secondary-400"
                            name="short_description"
                            value={portfolio.short_description}
                            onChange={(e) =>
                                setPortfolio({ ...portfolio, [e.target.name]: e.target.value })
                            }
                        ></textarea>

                        <label className="text-white font-semibold mr-2 luto">Description</label>
                        <ReactQuill
                            className="text-black bg-white border-2 border-secondary-600 rounded-md mb-4"
                            theme="snow"
                            value={portfolio.description}
                            onChange={handleContentChange}
                        />

                        <label className="text-white font-semibold mr-2 luto">Portfolio Slug</label>
                        <input
                            className="w-full text-white bg-transparent border-2 border-secondary-600 rounded-md mb-4 focus:shadow-md p-2 focus:shadow-secondary-400"
                            type="text"
                            name="slug"
                            value={portfolio.slug}
                            onChange={(e) =>
                                setPortfolio({ ...portfolio, [e.target.name]: e.target.value })
                            }
                        />
                        {message && (
                            <div className="text-sm font-semibold text-secondary-400 py-2 text-center">
                                {message}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-secondary-500 text-white px-3 py-2 rounded-md"
                        >
                            Update Portfolio
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Page;
