import React from 'react'
import Portfolio from '../components/Portfolio'
import Head from 'next/head'
import CustomHead from '../components/CustomHead'

const page = () => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/portfolio`;


  return (
    <>
      <CustomHead title={"Portfolio - Infotech"} description={"Explore our portfolio to see how we have helped numerous businesses achieve their goals with our web development, digital marketing, IT consulting, software development, and other technology solutions."} keywords={"portfolio, web development company, digital marketing agency, IT consulting services, software development company, technology solutions, innovative solutions, real results"} fullUrl={fullUrl} />
      <div className="bg-black">
        <Portfolio />
      </div>
    </>
  )
}

export default page
