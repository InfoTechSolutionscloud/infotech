"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import data from '../services/data';

const page = () => {

    const [formData, setformdata] = useState({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        service: "",
        details: "",
        budget: ""
    })
    const [intro, setIntro] = useState(true);

    const [message, setMessage] = useState("");
    const [pending, setPending] = useState(false);
    const [step, setStep] = useState(1);

    const onChangeForm = (e) => {
        setformdata({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        setPending(true);
        e.preventDefault();
        try {
            const response = await axios.post('/api/service-request', formData);
            if (response.status == 200) {
                setIntro(false);
                setPending(false);
                setStep(3);
            }

        } catch (error) {
            setPending(false)
            setMessage(error.response.data.message);
            setStep(3);
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
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={textVariants}
                >
                    <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                        <h2
                            className="font-heading mb-4 font-bold tracking-tight text-white text-3xl sm:text-5xl"
                        >
                            Welcome to Infotech Services
                        </h2>
                        <p className="mx-auto mt-4 max-w-3xl text-xl text-slate-400">
                            Find the best service that accelerate your business.</p>
                    </div>
                </motion.div>
                {intro && (
                    <div className="flex items-stretch justify-center">
                        <motion.div
                            className="card h-fit max-w-6xl p-5 md:p-12"
                            id="form"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={textVariants} >
                            <form id="serviceForm" onSubmit={handleSubmit}>
                                {step == 1 && (
                                    <div className="mb-6">
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label htmlFor="clientName" className="pb-1 text-xs uppercase tracking-wider"></label>
                                            <input type="text" id="clientName" autoComplete="name" placeholder="Name" className="mb-2 w-full rounded-md border border-secondary-400 py-2 pl-2 pr-4 shadow-md bg-gray-800 text-white sm:mb-0" name="clientName" value={formData.clientName} onChange={onChangeForm} />
                                        </div>
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label htmlFor="clientEmail" className="pb-1 text-xs uppercase tracking-wider"></label>
                                            <input type="email" id="clientEmail" autoComplete="email" placeholder="Email" className="mb-2 w-full rounded-md border border-secondary-400 py-2 pl-2 pr-4 shadow-md bg-gray-800 text-white sm:mb-0" name="clientEmail" value={formData.clientEmail} onChange={onChangeForm} />
                                        </div>
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label htmlFor="phone" className="pb-1 text-xs uppercase tracking-wider"></label>
                                            <input type="text" id="clientPhone" autoComplete="phone" placeholder="Your Phone Number" className="mb-2 w-full rounded-md border border-secondary-400 py-2 pl-2 pr-4 shadow-md bg-gray-800 text-white sm:mb-0" name="clientPhone" value={formData.clientPhone} onChange={onChangeForm} />
                                        </div>
                                        <button className='bg-primary-800 my-2 text-white rounded-md px-3 py-2 raleway' onClick={() => setStep(2)}>Next</button>
                                    </div>
                                )}
                                {step == 2 && (
                                    <div className="mb-6">
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label htmlFor="project" className="pb-1 text-xs uppercase tracking-wider"></label>
                                            <select id="service" name="service" className="mb-2 w-full rounded-md border border-secondary-400 py-2 pl-2 pr-4 shadow-md bg-gray-800 text-white sm:mb-0" value={formData.service} onChange={onChangeForm}>
                                                <option value="">Select a service</option>
                                                {data.map((item) => (
                                                    <option value={item.heading}>{item.heading}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label htmlFor="details" className="pb-1 text-xs uppercase tracking-wider"></label>
                                            <textarea id="details" placeholder="Enter Project Deatails" className="mb-2 w-full rounded-md border border-secondary-400 py-2 pl-2 pr-4 shadow-md bg-gray-800 text-white sm:mb-0" name="details" value={formData.details} onChange={onChangeForm} />
                                        </div>
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label htmlFor="budget" className="pb-1 text-xs uppercase tracking-wider"></label>
                                            <input type="text" id="budget" placeholder="Your Budget" className="mb-2 w-full rounded-md border border-secondary-400 py-2 pl-2 pr-4 shadow-md bg-gray-800 text-white sm:mb-0" name="budget" value={formData.budget} onChange={onChangeForm} />
                                        </div>
                                        <div className="text-center">
                                            {message && <p className="text-center merriweather text-white py-2">{message}</p>}

                                            <button type="submit" className="w-full bg-primary-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0 disabled:bg-gray-400 luto" disabled={pending}>
                                                {pending ? "Submitting..." : "Submit Details"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                )}
                {step == 3 && (
                    <section className={`bg-gray-800 py-8 ${step !== 3 ? 'hidden' : 'block'}`}>
                        <div className="container mx-auto px-6 md:px-12">
                            <div className="text-center">
                            <h3 className="text-3xl text-white font-bold leading-none mb-3">Project Initiated!</h3>
                            <p className='text-center text-sm text-gray-400'>Thanks for choosing infotech for your project. Our Team will soon connect you for verification and for price.</p>
                            </div>
                            <div className="flex flex-wrap justify-center items-center -mx-4">
                                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                                        
                                        <ul className="list-none mb-0 text-white">
                                            <li className="mb-2">
                                                <span className="font-bold mr-2">Name:</span>
                                                <span className="text-white">{formData.clientName}</span>
                                            </li>
                                            <li className="mb-2">
                                                <span className="font-bold mr-2">Email:</span>
                                                <span className="text-white">{formData.clientEmail}</span>
                                            </li>
                                            <li className="mb-2">
                                                <span className="font-bold mr-2">Phone</span>
                                                <span className="text-white">{formData.clientPhone}</span>
                                            </li>
                                        </ul>
                                    </motion.div>
                                </div>
                                <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
                                        <ul className="list-none mb-0 text-white">
                                            <li className="mb-2">
                                                <span className="font-bold mr-2">Service</span>
                                                <span className="text-white">{formData.service}</span>
                                            </li>
                                            <li className="mb-2">
                                                <span className="font-bold mr-2">Project Detail</span>
                                                <br />
                                                <span className="text-white">{formData.details}</span>
                                            </li>
                                            <li className="mb-2">
                                                <span className="font-bold mr-2">Budget</span>
                                                <span className="text-white">{formData.budget}</span>
                                            </li>
                                        </ul>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

            </div>
        </section>
    );
};

export default page;
