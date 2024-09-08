import React from 'react'
import Contact from '../components/Contact'
import { metadata as baseMeta } from '../layout';

export const metadata = {
    ...baseMeta,
    title: "Contact Us - InfoTech",
    description: "Get in touch with us today and learn more about how our technology solutions can help your business thrive. We offer a range of services including web development, digital marketing, IT consulting, software development, and more. Fill out the form to send us a message or give us a call.",
    openGraph: {
      ...baseMeta.openGraph,
      title: "Connect with Infotech!",
      description: "Get in touch with us today and learn more about how our technology solutions can help your business thrive. We offer a range of services including web development, digital marketing, IT consulting, software development, and more. Fill out the form to send us a message or give us a call.",
      url: `${process.env.NEXT_PUBLIC_API_URL}/contact`,
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_API_URL+"/contact",
    },
  };
const page = () => {


  return (
    <>
      <div>
        <Contact />
      </div>
    </>
  )
}

export default page
