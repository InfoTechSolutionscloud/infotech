import React from 'react';
import CustomHead from '@/app/components/CustomHead';
import Link from 'next/link';

const page = () => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/support`;

  return (
    <>
      <CustomHead
        title="Support & Help - InfoTech"
        description="Need help? Contact our support team for quick assistance with your InfoTech services."
        keywords="support, help, assistance, InfoTech Solutions"
        fullUrl={fullUrl}
      />

      <div className="bg-gray-950 p-5 px-2 md:px-20 text-gray-300 raleway min-h-screen">
        <h1 className="text-4xl text-white merriweather font-bold py-2">Support & Help</h1>

        <section className="mt-8">
          <p className="text-gray-300 mt-2">
            Need assistance? Our team is here to help with any issues or questions you have about InfoTech services.
            You can reach us quickly through the contact form, email, or our support channels.
          </p>

          {/* Contact Information */}
          <div className="mt-4">
            <h2 className="text-2xl text-teal-400 font-semibold merriweather">How to Contact Support</h2>
            <p className="text-gray-300 mt-2">For quick help, you can:</p>
            <ul className="list-disc pl-6 text-gray-300">
              <li><Link href="/contact" className="text-teal-400 hover:underline">Fill out the contact form</Link></li>
              <li>Email us at <a href="mailto:support@infotech.com" className="text-teal-400">support@infotech.com</a></li>
            </ul>
          </div>

          {/* FAQs Section */}
          <div className="mt-6">
            <h2 className="text-2xl text-teal-400 font-semibold merriweather">Frequently Asked Questions</h2>

            <div className="mt-4">
              <h3 className="text-xl text-teal-400 font-semibold">How can I reset my password?</h3>
              <p className="text-gray-300 mt-2">Click on "Forgot Password" on the login page and follow the instructions.</p>
            </div>

            <div className="mt-4">
              <h3 className="text-xl text-teal-400 font-semibold">How do I get support for technical issues?</h3>
              <p className="text-gray-300 mt-2">Contact us directly via the form or email for any tech-related issues.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
