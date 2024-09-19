"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";


const Contact = () => {

    const [formData, setformdata] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    })
    const [message, setMessage] = useState("");
    const [pending, setPending] = useState(false);

    const onChangeForm = (e) => {
        setformdata({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        setPending(true);
        e.preventDefault();
        try {
            const response = await axios.post('/api/contact', formData);
            if (response.status == 200) {
                console.log(response);
                setMessage(response.data.message);
                setPending(false);
            }

        } catch (error) {
            setPending(false)
            console.log(error);
            setMessage(error.response.data.message);
        }
    }


    // Animation variants
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.8,
                ease: "easeOut",
            },
        }),
    };

    return (
        <section className="bg-slate-800" id="contact">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                <motion.div
                    className="mb-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={textVariants}
                >
                    <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                        <span className="text-base font-semibold uppercase tracking-wide text-primary-200">Contact</span>

                        <h2
                            className="font-heading mb-4 font-bold tracking-tight text-white text-3xl sm:text-5xl"
                        >
                            Get in Touch
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-xl text-slate-400">
                            Our Team will reply you soon ASAP!</p>
                    </div>
                </motion.div>

                <div className="flex items-stretch justify-center">
                    <div className="grid md:grid-cols-2">
                        <motion.div
                            className="h-full pr-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <p className="mt-3 mb-12 text-lg text-slate-400">
                                Need any help related to our service or have a query about anything related to Infotech? Just connect with us now, and our team will reply to you soon!
                            </p>
                            <ul className="mb-6 md:mb-0">
                                {[
                                    {
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                                            </svg>
                                        ),
                                        title: "Our Address",
                                        description: "Hala, Sindh, Pakistan",
                                    },
                                    {
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                                                <path d="M15 7a2 2 0 0 1 2 2"></path>
                                                <path d="M15 3a6 6 0 0 1 6 6"></path>
                                            </svg>
                                        ),
                                        title: "Contact",
                                        description: (
                                            <>
                                                <a href="tel:+923282296963">Mobile: +92 328 2296963</a>
                                                <a href="mailto:info@infotechsolutions.cloud">Email: info@infotechsolutions.cloud</a>
                                            </>
                                        ),
                                    },
                                    {
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                                                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                                                <path d="M12 7v5l3 3"></path>
                                            </svg>
                                        ),
                                        title: "Our Support",
                                        description: (
                                            <>
                                                <p>24/7</p>
                                            </>
                                        ),
                                    },
                                ].map((item, i) => (
                                    <motion.li key={i} className="flex" custom={i} variants={itemVariants}>
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-900 text-gray-50">
                                            {item.icon}
                                        </div>
                                        <div className="ml-4 mb-4">
                                            <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-400">
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            className="card h-fit max-w-6xl p-5 md:p-12"
                            id="form"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={textVariants}
                        >
                            <h2 className="mb-4 text-2xl font-bold text-white">Ready to Get Started?</h2>
                            <form id="contactForm" onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <div className="mx-0 mb-1 sm:mb-4">
                                        <label htmlFor="name" className="pb-1 text-xs uppercase tracking-wider"></label>
                                        <input type="text" id="name" autoComplete="given-name" placeholder="Your name" className="mb-2 w-full rounded-md border border-secondary-400 py-2 pl-2 pr-4 shadow-md bg-gray-800 text-white sm:mb-0" name="name" value={formData.name} onChange={onChangeForm} required />
                                    </div>
                                    <div className="mx-0 mb-1 sm:mb-4">
                                        <label htmlFor="email" className="pb-1 text-xs uppercase tracking-wider"></label>
                                        <input type="email" id="email" autoComplete="email" placeholder="Your email address" className="mb-2 w-full rounded-md border border-secondary-400 py-2 pl-2 pr-4 shadow-md bg-gray-800 text-white sm:mb-0" name="email" value={formData.email} onChange={onChangeForm} required />
                                    </div>
                                    <div className="mx-0 mb-1 sm:mb-4">
                                        <label htmlFor="phone" className="pb-1 text-xs uppercase tracking-wider"></label>
                                        <PhoneInput
                                            country={"eg"}
                                            enableSearch={true}
                                            value={formData.phone}
                                            className=""
                                            inputStyle={{marginBottom: '0.5rem',
                                            width: '100%',
                                            borderRadius: '0.375rem',
                                            border: '1px solid #25e2a1',
                                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.12)',
                                            backgroundColor: "transparent",
                                            color: '#ffffff'}}
                                            onChange={(e) => setformdata({ ...formData, phone: e })}

                                        />
                                    </div>
                                    <div className="mx-0 mb-1 sm:mb-4">
                                        <label htmlFor="subject" className="pb-1 text-xs uppercase tracking-wider"></label>
                                        <input type="text" id="subject" placeholder="Subject" className="mb-2 w-full rounded-md border border-secondary-400 py-2 pl-2 pr-4 shadow-md bg-gray-800 text-white sm:mb-0" name="subject" value={formData.subject} onChange={onChangeForm} required />
                                    </div>

                                    <div className="mx-0 mb-1 sm:mb-4">
                                        <label htmlFor="textarea" className="pb-1 text-xs uppercase tracking-wider"></label>
                                        <textarea id="textarea" name="message" cols="30" rows="5" placeholder="Write your message..." className="mb-2 w-full rounded-md border border-secondary-400 py-2 pl-2 pr-4 shadow-md bg-gray-800 text-white sm:mb-0" value={formData.message} onChange={onChangeForm} required ></textarea>
                                    </div>
                                </div>
                                <div className="text-center">
                                    {message && <p className="text-center merriweather text-white py-2">{message}</p>}

                                    <button type="submit" className="w-full bg-primary-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0 disabled:bg-gray-400 luto" disabled={pending}>
                                        {pending ? "Sending..." : "Send Message"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
