"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Services = () => {
    const data = [
        {
            img: 'https://images.unsplash.com/photo-1605379399843-5870eea9b74e',
            heading: 'Web Development',
            description: 'We build custom websites that are mobile-friendly, scalable, and secure.'
        },
        {
            img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
            heading: "Digital Marketing",
            description: 'We help businesses increase online visibility and engage with their audience.'
        },
        {
            img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e',
            heading: 'Graphic Design',
            description: 'Our team creates stunning visual content that captures your brand\'s essence.'
        },
        {
            img: 'https://images.unsplash.com/photo-1674027001860-f9e3a94f4084',
            heading: 'SEO',
            description: 'We optimize your website for search engines to increase visibility and drive traffic.'
        },
        {
            img: 'https://images.unsplash.com/photo-1636971819476-aa41dc3db0d0',
            heading: 'Video Editing',
            description: 'Our experts craft compelling video content that engages your audience.'
        },
        {
            img: 'https://images.unsplash.com/photo-1660616246653-e2c57d1077b9',
            heading: 'Python Development',
            description: 'We build robust and scalable Python applications for web and mobile.'
        },
        {
            img: 'https://images.unsplash.com/photo-1620825937374-87fc7d6bddc2',
            heading: 'Qt Development',
            description: 'Our experts create cross-platform Qt applications for desktop and mobile.'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsToShow = 7;
    const totalCards = data.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
        }, 4000);
        return () => clearInterval(interval);
    }, [totalCards]);

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCards);
    };

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards);
    };

    const calculateTransform = () => {
        return {
            transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            transition: 'transform 0.5s ease-in-out',
        };
    };

    return (
        <div id='services' className="flex flex-col items-center justify-center py-20 bg-gradient-to-tr from-gray-700/25 via-secondary-900 to-gray-700/25 overflow-hidden">
            {/* Title Animation */}
            <motion.h3
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl lg:text-4xl font-bold lato text-white"
            >
                What we <span className="text-secondary-400">Offer!</span>
            </motion.h3>
            {/* Description Animation */}
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center text-sm text-white mb-10 mt-2 raleway"
            >
                We provide a variety of services! Here are <span className='bg-secondary-500 text-black p-2'>Top services</span>
            </motion.p>
            {/* Cards with Sliding Animation */}
            <div className="relative w-full max-w-7xl px-4 lg:px-0">
                <div className="flex" style={{ width: `${totalCards * (100 / cardsToShow)}%`, ...calculateTransform() }}>
                    {data.map((item, index) => (
                        <motion.article
                            key={index}
                            className="flex-shrink-0 w-full md:w-1/3 p-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.3 }}
                        >
                            <div className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 bg-cover bg-center max-w-sm mx-auto w-full mt-24"
                                style={{ backgroundImage: `url(${item.img})` }}>
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-900/40"></div>
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    className="z-10 mt-3 text-3xl merriweather font-bold text-white"
                                >
                                    {item.heading}
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="z-10 text-sm leading-6 luto text-gray-300"
                                >
                                    {item.description}
                                </motion.p>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <motion.button
                    onClick={goToPrevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    &larr;
                </motion.button>
                <motion.button
                    onClick={goToNextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    &rarr;
                </motion.button>
            </div>
        </div>
    );
};

export default Services;
