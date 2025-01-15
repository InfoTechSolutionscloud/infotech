import React from 'react';
import CustomHead from '@/app/components/CustomHead';
import Link from 'next/link';

const page = () => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/pricing`;

  return (
    <>
      <CustomHead
        title="Pricing & Plans - InfoTech"
        description="Explore InfoTech Solutions' competitive pricing and flexible plans tailored to meet your business needs."
        keywords="pricing, plans, InfoTech Solutions"
        fullUrl={fullUrl}
      />

      <div className="bg-gray-950 p-5 px-2 md:px-20 text-gray-300 raleway min-h-screen">
        <h1 className="text-4xl text-white merriweather font-bold py-2">Pricing & Plans</h1>
        
        <section className="mt-8 space-y-8">
          {/* Plan 1 */}
          <div className="bg-gray-800 p-6 rounded-md">
            <h2 className="text-3xl text-teal-400 font-semibold merriweather">Basic Plan</h2>
            <p className="text-gray-300 mt-2">Ideal for small businesses or startups looking to establish a basic online presence.</p>
            <ul className="text-gray-300 mt-4 space-y-2">
              <li>Custom Website Design</li>
              <li>SEO Basic Setup</li>
              <li>1 Year Hosting</li>
              <li>Email Support</li>
            </ul>
            <p className="text-teal-400 text-xl font-bold mt-4">$500 - One-time Payment</p>
            <Link href="/contact" className="text-teal-400 hover:underline mt-4 inline-block">Get Started</Link>
          </div>

          {/* Plan 2 */}
          <div className="bg-gray-800 p-6 rounded-md">
            <h2 className="text-3xl text-teal-400 font-semibold merriweather">Professional Plan</h2>
            <p className="text-gray-300 mt-2">A complete package for growing businesses that need advanced features and customization.</p>
            <ul className="text-gray-300 mt-4 space-y-2">
              <li>Everything in Basic Plan</li>
              <li>Custom E-commerce Setup</li>
              <li>Advanced SEO Optimization</li>
              <li>2 Years Hosting</li>
              <li>Priority Email & Chat Support</li>
            </ul>
            <p className="text-teal-400 text-xl font-bold mt-4">$1,200 - One-time Payment</p>
            <Link href="/contact" className="text-teal-400 hover:underline mt-4 inline-block">Get Started</Link>
          </div>

          {/* Plan 3 */}
          <div className="bg-gray-800 p-6 rounded-md">
            <h2 className="text-3xl text-teal-400 font-semibold merriweather">Enterprise Plan</h2>
            <p className="text-gray-300 mt-2">Perfect for large businesses or enterprises looking for custom solutions and full support.</p>
            <ul className="text-gray-300 mt-4 space-y-2">
              <li>Everything in Professional Plan</li>
              <li>AI Tools Integration</li>
              <li>Custom Features Development</li>
              <li>3 Years Hosting</li>
              <li>Dedicated Account Manager</li>
              <li>24/7 Premium Support</li>
            </ul>
            <p className="text-teal-400 text-xl font-bold mt-4">$3,000 - One-time Payment</p>
            <Link href="/contact" className="text-teal-400 hover:underline mt-4 inline-block">Get Started</Link>
          </div>
        </section>
        
      </div>
    </>
  );
};

export default page;

