"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import CustomHead from '../components/CustomHead';

const page = () => {

    const [formData, setformdata] = useState({
        clientEmail: "",
        projectId: "",
    })
    const [intro, setIntro] = useState(true);

    const [projectData, setProjectData] = useState({
        clientEmail: "",
        clientName: "",
        projectId: "",
        projectTitle: "",
        projectDescription: "",
        project_deadline: "",
    })

    const [status, setStatus] = useState({
        projectId: "",
        status: "",
        title: "",
        description: "",
        completion_date: "",
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
            const response = await axios.post('/api/track-project', formData);
            if (response.status == 200) {
                console.log(response.data);
                setProjectData(response.data.project)
                setStatus(response.data.status)
                setIntro(false)
                setPending(false);
            }

        } catch (error) {
            setPending(false)
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
        <>
            
            <CustomHead title={"Track Project - Infotech"} description={"Track your project with Infotech. We offer a range of technology solutions to help your business thrive. Fill out the form to send us a message or give us a call."} keywords={"track project, project updates, web development, digital marketing, IT consulting, software development, technology solutions, innovative solutions, real results"} />
            <section className="bg-slate-800" id="contact">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={textVariants}
                    >
                        <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                            <span className="text-base font-semibold uppercase tracking-wide text-primary-200">STATUS</span>

                            <h2
                                className="font-heading mb-4 font-bold tracking-tight text-white text-3xl sm:text-5xl"
                            >
                                Track Your Project
                            </h2>
                            <p className="mx-auto mt-4 max-w-3xl text-xl text-slate-400">
                                Check your project status online!</p>
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
                                <form id="contactForm" onSubmit={handleSubmit}>
                                    <div className="mb-6">
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label htmlFor="clientEmail" className="pb-1 text-xs uppercase tracking-wider"></label>
                                            <input type="email" id="clientEmail" autoComplete="email" placeholder="Email" className="mb-2 w-full rounded-md border border-secondary-400 py-2 pl-2 pr-4 shadow-md bg-gray-800 text-white sm:mb-0" name="clientEmail" value={formData.clientEmail} onChange={onChangeForm} required />
                                        </div>
                                        <div className="mx-0 mb-1 sm:mb-4">
                                            <label htmlFor="projectId" className="pb-1 text-xs uppercase tracking-wider"></label>
                                            <input type="text" id="projectId" placeholder="Your Project Id" className="mb-2 w-full rounded-md border border-secondary-400 py-2 pl-2 pr-4 shadow-md bg-gray-800 text-white sm:mb-0" name="projectId" value={formData.projectId} onChange={onChangeForm} required />
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        {message && <p className="text-center merriweather text-white py-2">{message}</p>}

                                        <button type="submit" className="w-full bg-primary-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0 disabled:bg-gray-400 luto" disabled={pending}>
                                            {pending ? "Checking..." : "Track Project"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                    {projectData && (
                        <section className={`bg-gray-800 py-8 ${projectData.clientEmail == "" ? 'hidden' : 'block'}`}>
                            <div className="container mx-auto px-6 md:px-12">
                                <div className="flex flex-wrap justify-center items-center -mx-4">
                                    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
                                            <h3 className="text-3xl text-white font-bold leading-none mb-3">Project Data</h3>
                                            <ul className="list-none mb-0 text-white">
                                                <li className="mb-2">
                                                    <span className="font-bold mr-2">Client Name:</span>
                                                    <span className="text-white">{projectData.clientName}</span>
                                                </li>
                                                <li className="mb-2">
                                                    <span className="font-bold mr-2">Project Title:</span>
                                                    <span className="text-white">{projectData.projectTitle}</span>
                                                </li>
                                                <li className="mb-2">
                                                    <span className="font-bold mr-2">Project Description:</span>
                                                    <br />
                                                    <span className="text-white">{projectData.projectDescription}</span>
                                                </li>
                                                <li className="mb-2">
                                                    <span className="font-bold mr-2">Project Deadline:</span>
                                                    <span className="text-white">{new Date(projectData.project_deadline).toDateString()}</span>
                                                </li>
                                            </ul>
                                        </motion.div>
                                    </div>
                                    <div className="w-full md:w-1/2 xl:w-1/3 p-6">
                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
                                            <h3 className="text-3xl text-white font-bold leading-none mb-3">Status</h3>
                                            <ul className="list-none mb-0 text-white">
                                                <li className="mb-2">
                                                    <span className="font-bold mr-2">Project ID:</span>
                                                    <span className="text-white">{projectData.projectId}</span>
                                                </li>
                                                <li className="mb-2">
                                                    <span className="font-bold mr-2">Status:</span>
                                                    <span className="text-white">{status.status}</span>
                                                </li>
                                                <li className="mb-2">
                                                    <span className="font-bold mr-2">Title:</span>
                                                    <span className="text-white">{status.title}</span>
                                                </li>
                                                <li className="mb-2">
                                                    <span className="font-bold mr-2">Description:</span>
                                                    <br />
                                                    <span className="text-white">{status.description}</span>
                                                </li>
                                                <li className="mb-2">
                                                    <span className="font-bold mr-2">Completion Date:</span>
                                                    <span className="text-white">{new Date(status.completion_date).toDateString()}</span>
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
        </>
    );
};

export default page;
