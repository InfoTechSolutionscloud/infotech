import React from 'react';
import Contact from '../components/Contact';
import CustomHead from '../components/CustomHead';

const page = () => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/contact`;

  return (
    <>
      <CustomHead
        title="Contact Us - Infotech"
        description="Get in touch with us today and learn more about how our technology solutions can help your business thrive. We offer a range of services including web development, digital marketing, IT consulting, software development, and more. Fill out the form to send us a message or give us a call."
        keywords="contact us, infotech, web development company, digital marketing agency, it consulting services, software development company, technology solutions, innovative solutions, real results"
        fullUrl={fullUrl}
      />
      
      <div className="bg-gray-900 text-white min-h-screen py-12 px-6 md:px-20">
        <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-4xl text-teal-400 font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300 mb-8">
            We’d love to hear from you! Whether you have questions, need assistance, or want to explore how we can help your business grow, please reach out.
          </p>
          
          {/* Contact Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="p-3 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="p-3 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="text-gray-300 mb-2">Message</label>
              <textarea
                id="message"
                placeholder="Enter your message"
                rows="5"
                className="p-3 bg-gray-700 text-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div className="flex flex-col">
              <button
                type="submit"
                className="bg-teal-400 text-white p-3 rounded-md mt-4 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Additional Contact Details */}
          <div className="mt-10 text-gray-300">
            <h2 className="text-2xl font-semibold text-teal-400">Other Ways to Reach Us</h2>
            <p className="mt-4">
              <strong>Phone:</strong> <span className="text-teal-400">+92 328 2296963</span>
            </p>
            <p className="mt-2">
              <strong>Email:</strong> <span className="text-teal-400">info@infotechsolutions.cloud</span>
            </p>
            <p className="mt-2">
              <strong>Address:</strong> 123 Tech Street, Hala, Sindh, Pakistan
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
