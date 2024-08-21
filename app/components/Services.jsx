"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "../services/data";
const Services = ({ qty, titleSimple, hititle, tagline, hitagline, animate }) => {


    const [selectedId, setSelectedId] = useState(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsToShow = qty || data.length;
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
            transform: `translateX(-${currentIndex * (200 / cardsToShow)}%)`,
            transition: 'transform 0.5s ease-in-out',
        };
    };

    return (
        <div id='services' className="flex flex-col items-center justify-center py-20 bg-gradient-to-tr from-gray-700/25 via-secondary-900 to-gray-700/25 overflow-hidden">
            {/* Title Animation */}
            <motion.h3
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className="text-3xl lg:text-4xl font-bold lato text-white"
            >
                {titleSimple}<span className="text-secondary-400">{hititle}</span>
            </motion.h3>
            {/* Description Animation */}
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center text-sm text-white mb-10 mt-2 raleway"
            >
                {tagline}<span className='bg-secondary-500  text-black p-2'>{hitagline}</span>
            </motion.p>
            {/* Cards with Sliding Animation */}
            <div className="relative w-full max-w-7xl px-4 lg:px-0">
                <div className={`flex ${animate && 'flex-wrap '}`} style={{ width: `${totalCards * (100 / cardsToShow)}%`, ...(!animate ? calculateTransform() : {}) }}>
                    {data.slice(0, cardsToShow).map((item, index) => (
                        <motion.article
                            key={item.id} // Ensure unique key is `item.id`
                            className="flex-shrink-0 w-full md:w-1/3 p-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.3 }}
                            layoutId={item.id.toString()} // Use `toString()` to ensure layoutId is a string
                            onClick={() => setSelectedId(item.id)} // Select the item on click
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

                <AnimatePresence>
                    {selectedId && (
                        <motion.div
                            layoutId={selectedId.toString()}
                            className="absolute top-0 left-0 right-0 bottom-0 h-screen flex items-center backdrop:blur-md justify-center bg-gray-900/50 z-50 p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {data.map((item) =>
                                item.id === selectedId ? (
                                    <motion.div key={item.id} className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
                                        <motion.h5 className="text-2xl text-white font-bold mb-4">{item.heading}</motion.h5>
                                        <motion.p className="text-gray-200 mb-4">{item.description}</motion.p>
                                        <motion.button
                                            className="bg-secondary-500 text-white hover:bg-secondary-950 px-4 py-2 rounded"
                                            onClick={() => setSelectedId(null)}
                                        >
                                            Close
                                        </motion.button>
                                        <motion.button
                                            className="bg-primary-500 mx-2 hover:bg-primary-950 text-white px-4 py-2 rounded"
                                            onClick={() => setSelectedId(null)}
                                        >
                                            Send a quote
                                        </motion.button>
                                    </motion.div>
                                ) : null
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                {!animate && (
                    <>
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
                    </>
                )}
            </div>
        </div>
    );
};

export default Services;
