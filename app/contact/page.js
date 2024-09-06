import React from 'react'
import Contact from '../components/Contact'
import CustomHead from '../components/CustomHead'

const page = () => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/contact`;


  return (
    <>
      <CustomHead title={"Contact Us - Infotech"} description={"Get in touch with us today and learn more about how our technology solutions can help your business thrive. We offer a range of services including web development, digital marketing, IT consulting, software development, and more. Fill out the form to send us a message or give us a call."} keywords={"contact us, infotech, web development company, digital marketing agency, it consulting services, software development company, technology solutions, innovative solutions, real results"} fullUrl={fullUrl} />
      <div>
        <Contact />
      </div>
    </>
  )
}

export default page
