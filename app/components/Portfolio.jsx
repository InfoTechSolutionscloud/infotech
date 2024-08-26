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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-3">
                <>
                    <motion.div
                        className="grid gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={imageVariants}
                    >
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" width={250} height={300} alt="tech portfolio" />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="tech portfolio" width={250} height={300} />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="tech portfolio" width={250} height={300} />
                        </div>
                    </motion.div>
                    <motion.div
                        className="grid gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={imageVariants}
                    >
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="tech portfolio" width={250} height={300} />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="tech portfolio" width={250} height={300} />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="tech portfolio" width={250} height={300} />
                        </div>
                    </motion.div>
                    <motion.div
                        className="grid gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={imageVariants}
                    >
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="tech portfolio" width={250} height={300} />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="tech portfolio" width={250} height={300} />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="tech portfolio" width={250} height={300} />
                        </div>
                    </motion.div>
                    <motion.div
                        className="grid gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={imageVariants}
                    >
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" width={250} height={300} alt="tech portfolio" />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" width={250} height={300} alt="tech portfolio" />
                        </div>
                        <div>
                            <Image className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" width={250} height={300} alt="tech portfolio" />
                        </div>
                    </motion.div>
                </>
            </div>
        </div>
    );
};

export default Portfolio;
