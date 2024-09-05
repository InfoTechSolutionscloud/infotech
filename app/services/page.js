"use client"
import React, { useEffect } from 'react'
import Services from '../components/Services'
import Head from 'next/head'
import CustomHead from '../components/CustomHead'

const page = () => {
  
  const fullUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  return (
    <>
      <CustomHead title={"Our Services"} description={"Get in touch with us today and learn more about how our technology solutions can help your business thrive. We offer a range of services including web development, digital marketing, IT consulting, software development, and more. Fill out the form to send us a message or give us a call."} keywords={"contact us, service request, web development, digital marketing, IT consulting, software development, technology solutions, innovative solutions, real results"} fullUrl={fullUrl} />
      <div className="bg-black">
        <Services titleSimple={"Here are our "} hititle={"Services!"} tagline={"Find the best service that accelerate your "} hitagline={"Business!"} animate={true} />
      </div>
    </>
  )
}

export default page
