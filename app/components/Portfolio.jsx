"use client";
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import data from '../portfolio/data';

const Portfolio = () => {
    // Animation variants
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <div id='portfolio' className="flex flex-col items-center justify-center py-20 bg-gradient-to-tr from-gray-700/25 via-primary-900 to-gray-700/25 overflow-hidden">
            <motion.h3
                className="text-3xl lg:text-4xl font-bold lato text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={textVariants}
            >
                Our <span className="text-secondary-400">Portfolio!</span>
            </motion.h3>
            <motion.p
                className="text-center text-sm text-white mb-10 mt-2 raleway"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={textVariants}
            >
                Some shots of our <span className='bg-secondary-500 text-black p-2'>Previous Work!</span>
            </motion.p>

            <div className="flex flex-col md:flex-row flex-wrap px-3">
                <motion.div
                    className="w-full "
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={imageVariants}

                >
                    {data.map((item) => {
                        return (
                            <div className='flex h-96 my-4 hover:bg-secondary-950 hover:shadow-xl flex-col items-center hover:scale-100 md:hover:scale-110 transition-transform duration-150 justify-center bg-gray-900 rounded-md'>
                                <Image className="h-1/2 object-cover w-full rounded-md mb-2 -mt-11" src={item.img} width={300} height={300} alt={item.title} />
                                <div className='m-2 px-3'>
                                    <h3 className='text-xl font-bold text-white'>{item.title}</h3>
                                    <p className=' text-gray-400'>{item.short_description}</p>
                                    <p className='bg-primary-600 px-3 my-2 inline-block text-xs text-white py-2 rounded-full'>{item.category}</p>
                                </div>
                            </div>
                        )
                    })}


                </motion.div>
            </div>
        </div>
    );
};

export default Portfolio;
