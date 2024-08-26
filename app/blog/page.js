"use client";
import React, { useEffect } from 'react'
import Blogs from '../components/Blogs'
import Head from 'next/head';

const page = () => {
  useEffect(() => {
    document.title = "Our Blogs - Infotech";
  }, []);
  return (
    <>
      <Head>
        <title>Our Blogs - Infotech</title>
        <meta name="description" content="Stay updated with the latest insights, trends, and news from the world of technology. Our blog features articles on web development, digital marketing, IT consulting, software development, and more. Learn from our experiences, success stories, and industry expertise." />
        <meta name="keywords" content="web development company, digital marketing agency, IT consulting services, software development company, technology solutions, innovative solutions, real results, web design, e-commerce solutions, mobile app development, SEO services, PPC advertising, software testing, IT consulting, web application development, custom software development" />
        <meta name="author" content="Infotech" />
      </Head>
      <div className='bg-black'>
        <Blogs title='Our' />
      </div>
    </>
  )
}

export default page
