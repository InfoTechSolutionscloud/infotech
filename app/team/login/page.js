"use client";
import axios from 'axios';
import React, {useState} from 'react';
import Link from 'next/link';

const page = () => {
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    })
    
    const [pending, setPending] = useState(false)
    const [message, setMessage] = useState("")
    
    const onChangeForm = (e) => {
            setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = async (e) => {
        setPending(true);
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', formdata);
            if (response.status == 200) {
                localStorage.setItem('token', response.data.token);
                setPending(false);
                window.location.href = "/team/"
            }
        } catch (error) {
            setPending(false)
            setMessage(error.response.data.message)
        }
    }

  return (
    <div className='bg-gray-900 flex justify-center items-center w-full h-screen'>
      <div className='md:w-1/4 mx-3 bg-gray-800 border-2 border-secondary-500 rounded-md'>
        <h3 className='text-2xl text-center text-white font-semibold merriweather py-10'>Login to Continue!</h3>
        <form onSubmit={handleSubmit} className='p-3'>
            <input type='email' name='email' id='email' placeholder='Enter Email' className='p-2 rounded-md bg-transparent outline-none border border-gray-400 text-white raleway focus:border-secondary-500 w-full mb-2 transition-colors duration-200' value={formdata.email} onChange={onChangeForm} />
            <input type='password' name='password' id='password' placeholder='Enter password' className='p-2 rounded-md bg-transparent outline-none border border-gray-400 text-white raleway focus:border-secondary-500 w-full mb-2 transition-colors duration-200' value={formdata.password} onChange={onChangeForm} />
            <button type='submit' className='bg-secondary-600 text-white rounded-md w-full px-3 py-2 hover:bg-secondary-800 transition-colors duration-200 disabled:bg-gray-600' disabled={pending}>{pending ? "Logging in..." : "Login Now"}</button>
            {message && <p className='text-white text-sm text-center'>{message}</p>}
        </form>
        {/* This line of forgot password */}
        <div>
          <p className="text-white text-center text-sm py-3">
            Forgot Password? &nbsp;
            <Link href="/team/forgot-password" className="text-secondary-500 hover:underline">Reset Password</Link>
          </p> 
        </div>
        {/* The Above line */}
        <p className='text-center text-gray-300 text-sm py-3'>Not registered? Contact with your team head!</p>
      </div>
    </div>
  )
}

export default page
