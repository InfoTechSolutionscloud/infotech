import CustomHead from '@/app/components/CustomHead'
import Link from 'next/link'
import React from 'react'

const page = () => {
  const fullUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  return (
    <>
     <CustomHead title={"Return Policy"} description={"Here is infotech's return policy means if you pay fee to infotech about any service then how you can cancel your service and get your return amount"} keywords={"return-policy, legal"} fullUrl={fullUrl}  />
    <div className="bg-gray-950 p-5 px-2 md:px-20 text-gray-300 raleway">
      <h1 className="text-4xl text-white merriweather font-bold py-2">Returns Policy</h1>
      <p className="text-sm text-white raleway">Last Updated: 26/08/2024</p>

      <h2 className="text-2xl text-white merriweather pt-5 font-semibold py-2">1. Introduction</h2>
      <p>At Infotech, we strive to ensure that you are satisfied with our services. This Returns Policy outlines the process for requesting a refund or return.</p>

      <h2 className="text-2xl text-white merriweather pt-5 font-semibold py-2">2. Eligibility for Returns</h2>
      <p>To be eligible for a return, the service must meet the following conditions:</p>

      <ul className="mb-4">
        <li>The request must be made within 5 days of purchase.</li>
        <li>The service must not have been fully delivered or utilized.</li>
        <li>The service must not have been customized or personalized.</li>
      </ul>

      <h2 className="text-2xl text-white merriweather pt-5 font-semibold py-2">3. Non-Refundable Services</h2>
      <p>The following services are non-refundable:</p>

      <ul className="mb-4">
        <li>Customized or personalized services that have been initiated or completed.</li>
        <li>Digital Marketing / Graphic Design / Other Service where premium stocks are purchased (In that case the amount that is utilized by service will not be refundable).</li>
        <li>Any service that has been used or downloaded by the customer.</li>
      </ul>

      <h2 className="text-2xl text-white merriweather pt-5 font-semibold py-2">4. Refund Process</h2>
      <p>To request a refund, please contact us at infotechcompany85@gmail.com with your project details and reason for the return. Once your request is received, we will review it and notify you of the approval or rejection of your refund.</p>

      <h2 className="text-2xl text-white merriweather pt-5 font-semibold py-2">5. Processing Time</h2>
      <p>If approved, your refund will be processed, and a credit will be applied to your original method of payment within 2 days.</p>

      <h2 className="text-2xl text-white merriweather pt-5 font-semibold py-2">6. Changes to This Policy</h2>
      <p>We may update our Returns Policy from time to time. We will notify you of any changes by posting the new policy on our website.</p>

      <h2 className="text-2xl text-white merriweather pt-5 font-semibold py-2">7. Contact Us</h2>
      <p>If you have any questions about our Returns Policy, please contact us <Link href="/contact">Here!</Link></p>
      <p>PLEASE NOTE: We do not accept any kind of responsibility for any loss or damage from any transaction. We are just a service provider and not a financial institution. We are not responsible for any kind of financial loss or damage.</p>
    </div>
    </>
  )
}

export default page

