import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';

const Blogs = ({qty}) => {

    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const getdata = async () =>{
            try{

                const response = await axios.get('/api/blogs');
                setBlogs(response.data);
            } catch (error){
                console.log(error);
            }
        }
        getdata();
    }, [])

    // Animation variants for the cards
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.2,
                duration: 0.6,
                ease: "easeOut"
            }
        })
    };

    // Animation variants for the heading
    const headingVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section className="py-24 bg-gradient-to-tl from-gray-700/25 via-primary-900 to-gray-700/25">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.h3
                    className="text-3xl text-center py-2 pb-20 lg:text-4xl font-bold lato text-white"
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    Our Latest <span className="text-secondary-400">Blogs!</span>
                </motion.h3>
                <div className="flex justify-center gap-4 flex-wrap">
                    {blogs.slice(0, qty || blogs.length).map((item, index) => (
                        <motion.div
                            key={index}
                            className="group w-full sm:w-1/2 md:w-1/4 border-2 border-primary-300 bg-white rounded-2xl"
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-center">
                                <Image
                                    src={item.blogImage}
                                    alt={`Image for ${item.blogTitle}`}
                                    className="rounded-t-2xl w-full"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                                <span className="text-primary-800 text-sm">{new Date(item.createdAt).toDateString()}</span>
                                <h4 className="text-lg text-gray-900 font-medium leading-tight mb-1">{item.blogTitle}</h4>
                                <p className="text-gray-500 leading-tight mb-2">{item.blog_description}</p>
                                <Link href={`/blog/${item.blog_slug}`} className="cursor-pointer text-lg text-indigo-600 font-semibold">Read more..</Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
