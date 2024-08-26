"use client"
import React, { useEffect } from 'react'
import Contact from '../components/Contact'
import Head from 'next/head'

const page = () => {
  useEffect(() => {
    document.title = "Contact Us - Infotech";
  }, []);
  return (
    <>
      <Head>
        <title>Contact Us - Infotech</title>
        <meta name="description" content="Get in touch with us today and learn more about how our technology solutions can help your business thrive. We offer a range of services including web development, digital marketing, IT consulting, software development, and more. Fill out the form to send us a message or give us a call." />
        <meta name="keywords" content="contact us, infotech, web development company, digital marketing agency, it consulting services, software development company, technology solutions, innovative solutions, real results" />
        <meta name="author" content="Infotech" />
      </Head>
      <div>
        <Contact />
      </div>
    </>
  )
}

export default page
