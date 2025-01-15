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
        <h1 className="text-4xl text-white merriweather font-bold py-2">FAQs</h1>
        <p className="text-sm text-white raleway">Last Updated: 26/08/2024</p>

        <section className="mt-8 space-y-8">
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
