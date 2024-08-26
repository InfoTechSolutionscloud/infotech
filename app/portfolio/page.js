"use client";
import React, { useEffect } from 'react'
import Portfolio from '../components/Portfolio'
import Head from 'next/head';

const page = () => {
  useEffect(() => {
    document.title = "Portfolio - Infotech"
  }, [])
  return (
    <>
      <Head>
        <title>Portfolio - Infotech</title>
        <meta name="description" content="Explore our portfolio to see how we have helped numerous businesses achieve their goals with our web development, digital marketing, IT consulting, software development, and other technology solutions." />
        <meta name="keywords" content="portfolio, web development company, digital marketing agency, IT consulting services, software development company, technology solutions, innovative solutions, real results" />
        <meta name="author" content="Infotech" />
      </Head>
      <div className="bg-black">
        <Portfolio />
      </div>
    </>
  )
}

export default page
