import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import public_fetcher from '../lib/fetcher';
import useSWR from 'swr';
import Loading from '../loading';

const Blogs = ({qty, title="Our Latest"}) => {

    const { data, error, isLoading } = useSWR(`/api/blogs`, public_fetcher);

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
        <>
        {error && (
            <p className='text-center text-white font-semibold py-5'>Failed to load!</p>
        )}
        {isLoading && (
            <Loading />
        )}

        {data && (<section className="py-24 bg-gradient-to-r from-[#ccfbf1] to-[#2dd4bf] min-h-screen w-full px-8 lg:px-20">


            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.h3
                    className="text-3xl text-center py-2 pb-20 lg:text-4xl font-bold lato text-white"
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    {title} <span className="text-secondary-400">Blog!</span>
                </motion.h3>
                <div className="flex justify-center gap-4 flex-wrap">
                    {data.length == 0 && (
                        <p className="text-white  text-center text-lg">No Blog found</p>
                    )}
                    {data.length > 0 && data.slice(0, qty || data.length).map((item, index) => (
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
                                <h4 className="text-lg text-gray-900 font-medium truncate leading-tight mb-1">{item.blogTitle}</h4>
                                <p className="text-gray-500 leading-tight mb-2">
                                    {`${item.blog_description.split(' ').slice(0, 20).join(' ')}${item.blog_description.split(' ').length > 20 ? '...' : ''}`}
                                </p>
                                <Link href={`/blog/${item.blog_slug}`} className="cursor-pointer text-lg text-indigo-600 font-semibold">Read more..</Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>)}
        </>
    );
};

export default Blogs;
