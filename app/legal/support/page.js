import React from 'react';
import CustomHead from '@/app/components/CustomHead';
import Link from 'next/link';

const page = () => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/support`;

  return (
    <>
      <CustomHead
        title="Support & Help - InfoTech"
        description="Get assistance and support from InfoTech Solutions. Find troubleshooting steps, FAQs, and contact options to get the help you need."
        keywords="support, help, InfoTech Solutions, customer service"
        fullUrl={fullUrl}
      />

      <div className="bg-gray-950 p-5 px-2 md:px-20 text-gray-300 raleway min-h-screen">
        <h1 className="text-4xl text-white merriweather font-bold py-2">Support & Help</h1>

        <section className="mt-8 space-y-8">
          <h2 className="text-2xl text-white merriweather font-semibold py-2">How can we help you?</h2>
          <p className="text-gray-300 mt-2">At InfoTech, we are committed to providing exceptional support. Whether you need troubleshooting assistance, have questions about our services, or require further guidance, we're here to help!</p>
          
          <div className="mt-8">
            <h2 className="text-2xl text-white merriweather font-semibold py-2">FAQs</h2>
            
            {/* FAQ 1 */}
            <div>
              <h3 className="text-2xl text-teal-400 font-semibold merriweather">How can I contact support?</h3>
              <p className="text-gray-300 mt-2">You can reach out to our support team via our <Link href="/contact" className="text-teal-400 hover:underline">Contact Us</Link> page or email us directly at support@infotech.com.</p>
            </div>

            {/* FAQ 2 */}
            <div>
              <h3 className="text-2xl text-teal-400 font-semibold merriweather">What to do if my website is down?</h3>
              <p className="text-gray-300 mt-2">If your website is down, check our <Link href="/status" className="text-teal-400 hover:underline">status page</Link> to see if there are any ongoing issues. If not, please reach out to support for troubleshooting.</p>
            </div>

            {/* FAQ 3 */}
            <div>
              <h3 className="text-2xl text-teal-400 font-semibold merriweather">Do you offer remote support?</h3>
              <p className="text-gray-300 mt-2">Yes, we offer remote support to assist with any technical issues you might face. Our team can guide you through the process via video calls, chat, or email.</p>
            </div>

            {/* FAQ 4 */}
            <div>
              <h3 className="text-2xl text-teal-400 font-semibold merriweather">What should I do if I encounter a bug?</h3>
              <p className="text-gray-300 mt-2">If you encounter a bug, please report it through our <Link href="/contact" className="text-teal-400 hover:underline">Contact Us</Link> page, providing as much detail as possible to help us resolve the issue faster.</p>
            </div>

            {/* FAQ 5 */}
            <div>
              <h3 className="text-2xl text-teal-400 font-semibold merriweather">How do I reset my password?</h3>
              <p className="text-gray-300 mt-2">To reset your password, click on the "Forgot Password" link on the login page and follow the instructions sent to your registered email address.</p>
            </div>

          </div>

          {/* Contact Support Section */}
          <section className="mt-8 bg-gray-800 p-6 rounded-md">
            <h2 className="text-2xl text-teal-400 font-semibold merriweather">Need further assistance?</h2>
            <p className="text-gray-300 mt-2">If your issue is not addressed in the FAQs or if you need personalized help, feel free to contact our support team directly.</p>
            <Link href="/contact" className="text-teal-400 hover:underline mt-4 inline-block">Contact Support</Link>
          </section>
          
        </section>
      </div>
    </>
  );
};

export default page;
