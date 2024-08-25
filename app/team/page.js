"use client";
import React, { useEffect, useState } from 'react'
import Loading from '../loading';
import axios from 'axios';
import Users from './components/Users';
import Services from './components/Services';
import Messages from './components/Messages';
import Projects from './components/Projects';
import Blogs from './components/Blogs';

const page = () => {
    const [data, setData] = useState();
    const [show, setShow] = useState("users");
    useEffect(() => {
        const getdata = async () => {
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get('/api/auth/getdata', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.status == 200) {
                    setData(res.data.data);

                }
            } catch (error) {
                if (error.response.status == 401) {
                    window.location.href = "/team/login"
                }
                return error
            }
        }
        getdata();
    }, [])
    return (
        <>
            {!data && (
                <Loading />
            )}
            {data && <div className='bg-gray-900 py-5 w-full'>
                <div className='bg-gray-800 p-5 rounded-md mx-auto w-full md:w-3/4'>
                    <h3 className='text-white text-3xl pb-5 merriweather font-semibold'>Hi {data.name}</h3>
                    <p className='text-white luto font-normal'>Email: {data.email}</p>
                    <p className='text-white luto font-normal'>Role: {data.role}</p>
                </div>
                <div className='my-5 overflow-x-scroll md:overflow-hidden'>
                    <div className='flex justify-center gap-3 items-center '>
                        <button className={`${show == "users" ? "bg-secondary-500 text-black" : "bg-gray-800 text-white"} p-3 rounded-md  luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150`} onClick={() => setShow("users")}>Users</button>
                        <button className={`${show == "services" ? "bg-secondary-700 text-white" : "bg-gray-800"} p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150`} onClick={() => setShow("services")}>Service Requests</button>
                        <button className={`${show == "projects" ? "bg-secondary-700 text-white" : "bg-gray-800"} p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150`} onClick={() => setShow("projects")}>Projects</button>
                        <button className={`${show == "messages" ? "bg-secondary-700 text-white" : "bg-gray-800"} p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150`} onClick={() => setShow("messages")}>Messages</button>
                        <button className={`${show == "blogs" ? "bg-secondary-700 text-white" : "bg-gray-800"} p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150`} onClick={() => setShow("blogs")}>Blogs</button>
                        <button className='bg-gray-800 p-3 rounded-md text-white luto font-normal hover:border-secondary-500 hover:border border border-transparent transition-colors duration-150' onClick={() => {localStorage.removeItem('token'); window.location.href = '/team/login'}}>Logout</button>
                    </div>
                </div>
                <div className='h-auto my-2'>
                    {show == "users" && (
                        <Users />
                    )}
                    {show == "services" && (
                        <Services />
                    )}
                    {show == "projects" && (
                        <Projects />
                    )}
                    {show == "messages" && (
                        <Messages />
                    )}
                    {show == "blogs" && (
                        <Blogs />
                    )}
                </div>

            </div>


            }
        </>
    )
}

export default page
