import React from 'react'
import Portfolio from '../components/Portfolio'
import { metadata as baseMeta } from '../layout';

export const metadata = {
    ...baseMeta,
    title: "Portfolio - InfoTech",
    description: "Explore our portfolio to see how we have helped numerous businesses achieve their goals with our web development, digital marketing, IT consulting, software development, and other technology solutions.",
    openGraph: {
      ...baseMeta.openGraph,
      title: "Explore How Infotech Works!",
      description: "Explore our portfolio to see how we have helped numerous businesses achieve their goals with our web development, digital marketing, IT consulting, software development, and other technology solutions.",
      url: `${process.env.NEXT_PUBLIC_API_URL}/portfolio`,
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_API_URL+"/portfolio",
    },
  };

const page = () => {

  return (
    <>
      <div className="bg-black">
        <Portfolio />
      </div>
    </>
  )
}

export default page
