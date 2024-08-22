"use client";
import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = ({qty}) => {
    let data = [
        {
            icon: "/user-expert.svg",
            heading: "Expertise You Can Trust",
            description: "Our team of experienced professionals has years of expertise in delivering top-notch solutions that meet your needs."
        },
        {
            icon: "/chart-mixed-alt.svg",
            heading: "Personalized Approach",
            description: "We take the time to understand your unique requirements and provide tailored solutions that cater to your specific needs."
        },
        {
            icon: "/quality-diamond.svg",
            heading: "Quality Guaranteed",
            description: "We strive for excellence in everything we do, ensuring that our services meet the highest standards of quality and reliability."
        },
        {
            icon: "/security.svg",
            heading: "Security",
            description: "Our team of ethical hackers uses the latest techniques to ensure that your project is secure and protected from potential threats."
        },
        {
            icon: "/handshake.svg",
            heading: "Customer-Centric",
            description: "Your satisfaction is our top priority. We're dedicated to providing exceptional support and ensuring a seamless experience for you."
        },
        {
            icon: "/dollar.svg",
            heading: "Cost Effective Solution",
            description: "We offer cost-effective solutions that are tailored to your specific needs. From small projects to large-scale projects, we can help you achieve your goals."
        },
        {
            icon: "/time.svg",
            heading: "On Time Delivery",
            description: "We prioritize on-time delivery and ensure that your project is completed on time. We work closely with you to ensure that your project is completed on time."
        },
        {
            icon: "/support.svg",
            heading: "Support",
            description: "We offer 24/7 support to ensure that your project is completed on time. We work closely with you to ensure that your project is completed on time."
        },
    ];

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            // viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col items-center bg-gradient-to-tr bg-gray-700/25 justify-center py-20"
        >
            <motion.h3
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-3xl lg:text-4xl font-bold lato text-white"
            >
                Why Choose <span className="text-secondary-400">Infotech</span>
            </motion.h3>
            <p className="text-center text-sm text-white mb-10 mt-2 raleway">
                Are you in the search of best company For your <span className="bg-secondary-500 text-black p-2">Digital Work?</span>
            </p>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4"
                initial="hidden"
                whileInView="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.3
                        }
                    }
                }}
                viewport={{ once: true, amount: 0.2 }}
            >
                {data.slice(0, qty || data.length).map((item, index) => (
                    <motion.div
                        key={index}
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-gray-900 border-2 border-secondary-500 group hover:bg-gradient-to-tl hover:from-transparent hover:to-secondary-700 rounded-2xl py-10 shadow-lg overflow-hidden flex flex-col items-center transition-all duration-300 hover:scale-110"
                    >
                        <div className="h-20 mb-4">
                            <img
                                src={item.icon}
                                className="h-16 w-16 filter invert"
                                alt={item.heading}
                            />
                        </div>
                        <div className="px-6 text-center">
                            <h3 className="text-xl lg:text-2xl text-gray-100 merriweather font-semibold">
                                {item.heading}
                            </h3>
                            <p className="text-gray-200 text-sm lato mt-2">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default WhyChooseUs;
