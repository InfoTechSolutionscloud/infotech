import React from 'react'
import WhyChooseUs from '../components/WhyChooseUs'
import Image from 'next/image';
import CustomHead from '../components/CustomHead';
const page = () => {
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/about`;


    return (
        <>
            <CustomHead title={"About Us"} description={"Discover the story behind Infotech, our values, and what drives us to deliver exceptional services to our clients. Learn more about our team, our mission, and why we are the best choice for all your tech-related needs."} fullUrl={fullUrl} />
            <div className="bg-black">
                <section>

                    <div className="gap-16 w-full items-center py-8 bg-gradient-to-tr from-gray-800 via-primary-900 to-gray-800/25 px-4  lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                        <div className="font-light py-20 sm:text-lg text-gray-200">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold merriweather text-white">Welcome to Infotech</h2>
                            <p className="mb-4 raleway">Our company is your friendly tech partner that makes digital solutions simple. Our team helps
businesses grow online through website design & development, digital marketing & SEO, logo &
graphic design, video production & editing, and medical billing services.</p>
                            <p>What makes us special? We're a close-knit team that gives your project the attention it
deserves. We're big enough to handle major projects but small enough to care about every
detail.</p> <br>
                            <p>We can build you a custom website that looks great and works smoothly, get your business
found online through SEO and marketing, create eye-catching designs that make your brand
stand out, produce professional videos that tell your story, and provide efficient medical billing
services tailored to your needs. We speak plain language, solve real problems, and keep up
with the latest tech trends so you don't have to.
Let's work together to make your business shine online!</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <Image width={300} height={300} className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
                            <Image width={300} height={300} className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
                        </div>
                    </div>
                </section>
                <WhyChooseUs />
            </div>
        </>
    )
}

export default page
