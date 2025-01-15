import React from 'react';
import CustomHead from '@/app/components/CustomHead';
import Link from 'next/link';

const page = () => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/legal/general`;

  return (
    <>
      <CustomHead
        title="FAQs - InfoTech"
        description="Find answers to commonly asked questions about InfoTech Solutions. Learn more about our services, AI projects, e-commerce solutions, and more."
        keywords="faq, questions, InfoTech Solutions"
        fullUrl={fullUrl}
      />

      <div className="bg-gray-950 p-5 px-2 md:px-20 text-gray-300 raleway min-h-screen">
        <h1 className="text-4xl text-white merriweather font-bold py-2">General Questions</h1>
       

           <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>1. Introduction</h2>
                <p>Welcome to Infotech
Our company is your friendly tech partner that makes digital solutions simple. Our team helps businesses grow online through website design & development, digital marketing & SEO, logo & graphic design, video production & editing, and medical billing services.
What makes us special? We're a close-knit team that gives your project the attention it deserves. We're big enough to handle major projects but small enough to care about every detail.
We can build you a custom website that looks great and works smoothly, get your business found online through SEO and marketing, create eye-catching designs that make your brand stand out, produce professional videos that tell your story, and provide efficient medical billing services tailored to your needs. We speak plain language, solve real problems, and keep up with the latest tech trends so you don't have to.
Let's work together to make your business shine online!
</p>

        <section className="mt-8 space-y-8">
   <h1 className="text-4xl text-white merriweather font-bold py-2">FAQs</h1>
          {/* FAQ 1 */}
          <div>
            <h2 className="text-2xl text-teal-400 font-semibold merriweather">Where is InfoTech Solutions located?</h2>
            <p className="text-gray-300 mt-2">The company is based in Hala, Sindh, Pakistan.</p>
          </div>

          {/* FAQ 2 */}
          <div>
            <h2 className="text-2xl text-teal-400 font-semibold merriweather">Can InfoTech Solutions help with e-commerce websites?</h2>
            <p className="text-gray-300 mt-2">
              Yes, InfoTech Solutions specializes in creating tailored e-commerce platforms designed to meet your business needs.
            </p>
          </div>

          {/* FAQ 3 */}
          <div>
            <h2 className="text-2xl text-teal-400 font-semibold merriweather">Do they work on AI-based projects?</h2>
            <p className="text-gray-300 mt-2">
              Yes, they have extensive experience in developing and integrating AI tools and solutions across various projects.
            </p>
          </div>

          {/* FAQ 4 */}
          <div>
            <h2 className="text-2xl text-teal-400 font-semibold merriweather">Do we work with all types of businesses?</h2>
            <p className="text-gray-300 mt-2">
              Yes, we collaborate with businesses across diverse industries, including retail, healthcare, and more.
            </p>
          </div>

          {/* FAQ 5 */}
          <div>
            <h2 className="text-2xl text-teal-400 font-semibold merriweather">Is customization available for their services?</h2>
            <p className="text-gray-300 mt-2">
              Absolutely, InfoTech Solutions provides personalized services to ensure each project aligns with the client’s unique requirements.
            </p>
          </div>

          {/* FAQ 6 */}
          <div>
            <h2 className="text-2xl text-teal-400 font-semibold merriweather">Do you provide ongoing support after project completion?</h2>
            <p className="text-gray-300 mt-2">
              Yes, InfoTech Solutions offers continuous support and maintenance to ensure long-term success.
            </p>
          </div>

          {/* FAQ 7 */}
          <div>
            <h2 className="text-2xl text-teal-400 font-semibold merriweather">How can I get a price quote?</h2>
            <p className="text-gray-300 mt-2">
              Fill out the contact form on our website for details. <Link href="/contact" className="text-teal-400 hover:underline">Contact Us!</Link>
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
