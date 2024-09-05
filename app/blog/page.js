"use client";
import React from 'react'
import Blogs from '../components/Blogs'
import CustomHead from '../components/CustomHead';

const page = () => {

  return (
    <>
      <CustomHead title={"Our Blogs - Infotech"} description={"Stay updated with the latest insights, trends, and news from the world of technology. Our blog features articles on web development, digital marketing, IT consulting, software development, and more. Learn from our experiences, success stories, and industry expertise."} keywords={"web development company, digital marketing agency, IT consulting services, software development company, technology solutions, innovative solutions, real results, web design, e-commerce solutions, mobile app development, SEO services, PPC advertising, software testing, IT consulting, web application development, custom software development"} />
      <div className='bg-black'>
        <Blogs title='Our' />
      </div>
    </>
  )
}

export default page
