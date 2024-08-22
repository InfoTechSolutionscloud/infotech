import React from 'react'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'

const page = () => {
    return (
        <div className="bg-black">
            <section>

                <div className="gap-16 w-full items-center py-8 bg-gradient-to-tr from-gray-800 via-primary-900 to-gray-800/25 px-4  lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                    <div className="font-light py-20 sm:text-lg text-gray-200">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold merriweather text-white">Welcome to Infotech</h2>
                        <p className="mb-4 raleway">At Infotech, we are passionate about providing high-quality services that cater to the diverse needs of our clients in the tech industry. We are a team of strategists, designers, and developers who are dedicated to delivering exceptional results. Whether you require custom web development, digital marketing strategies, top-notch graphic design, or expert video editing, we have got you covered.</p>
                        <p>Our commitment to excellence is evident in every aspect of our work. We are small enough to understand the intricacies of each project, yet big enough to handle ambitious scope and deliver them on time. We are problem solvers at heart and are constantly innovating to stay ahead of the curve. With our expertise, we can help you establish a strong online presence, engage your target audience, and create captivating visual content that showcases your brand in the best possible way.</p>
                        <p>Whether you need a custom website, effective SEO strategies, or a stunning video for your marketing campaigns, we have the skills and expertise to deliver exceptional results. Join us at Infotech and let us harness the power of technology to take your business to new heights.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="office content 1" />
                        <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
                    </div>
                </div>
            </section>
            <WhyChooseUs />
            <Testimonials />
        </div>
    )
}

export default page
