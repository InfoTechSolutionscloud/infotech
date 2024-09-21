"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const Testimonials = () => {
    const data = [
        {
            img: '/user1.webp',
            name: 'Shahid',
            review: 'Infotech is such a great agency! I love their services.'
        },
        {
            img: '/user4.webp',
            name: 'Sher Khan',
            review: 'This company helped me a lot in establishing my business! I love their services.'
        },
        {
            img: '/user1.webp',
            name: 'Sana Javed',
            review: 'Their web development service is next level, especially Sarfaraz\'s service.'
        },
        {
            img: '/user4.webp',
            name: 'Fahad',
            review: 'Their Graphic Design and Digital Marketing services are top-notch.'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // This triggers the animation when in view
        viewport={{ once: true }} // This ensures the animation only happens once
        id='reviews' className="flex flex-col items-center justify-center py-20 bg-gradient-to-tl from-gray-700/25 via-primary-900 to-gray-700/25 overflow-hidden">
            <motion.h3
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl lg:text-4xl font-bold lato text-center text-white"
            >
                What our <span className="text-secondary-400">Customers</span> are saying!
            </motion.h3>
            <motion.p
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-center text-sm text-white mb-10 mt-2 raleway"
            >
                Here are the reviews from our <span className='bg-secondary-500 text-black p-2'>Satisfied Clients.</span>
            </motion.p>
            <motion.div
                className="relative w-full max-w-7xl lg:px-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="flex flex-wrap justify-center gap-10">
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            className="mb-6 md:mb-0 text-center w-full md:w-1/2 lg:w-1/4"
                            variants={itemVariants}
                        >
                            <div className="mb-6 flex justify-center">
                                <Image
                                    src={item.img}
                                    width={200}
                                    height={200}
                                    className="w-24 rounded-full shadow-lg dark:shadow-black/30"
                                    alt={item.name}
                                />
                            </div>
                            <p className="my-4 text-xl lato text-neutral-500 dark:text-neutral-300">
                                {item.review}
                            </p>
                            <p className="italic merriweater text-white">- {item.name}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Testimonials;
