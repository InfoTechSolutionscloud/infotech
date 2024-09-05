import CustomHead from '@/app/components/CustomHead'
import Link from 'next/link'
import React from 'react'

const page = () => {
    const fullUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <>
         <CustomHead title={"Terms and Conditions"} description={"Here is infotech's terms and conditions that can help you to completely understand infotech and can continue service without any issue..."} keywords={"termsconditions, legal"} fullUrl={fullUrl}  />
        <div className='bg-gray-950 p-5 px-2 md:px-20 text-gray-300 raleway '>
            <h1 className='text-4xl text-white merriweather font-bold py-2'>Terms and Conditions</h1>
            <p className='text-sm text-white raleway'>Last Updated: 26/08/2024</p>

            <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>1. Introduction</h2>
            <p>Welcome to Infotech. These Terms and Conditions (“Terms”) govern your use of our website and services. By accessing or using our website, you agree to comply with and be bound by these Terms.</p>

            <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>2. Services</h2>
            <p>Infotech offers a variety of tech-related services including [list of services]. We reserve the right to modify or discontinue our services at any time without notice.</p>

            <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>3. User Responsibilities</h2>

            <p>
                <strong>Account Registration:</strong> You may need to create an account to use certain services. You agree to provide accurate and complete information and to keep your account details confidential.
            </p>

            <p>
                <strong>Prohibited Activities:</strong> You agree not to engage in activities that may harm our website or services, including hacking, transmitting viruses, or spamming.
            </p>

            <p>
                <strong>Compliance with Laws:</strong> You agree to comply with all applicable laws and regulations while using our services.
            </p>

            <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>4. Payments</h2>
            <p>You agree to pay all fees associated with the services you use. All payments are processed securely, and you are responsible for providing valid payment information.</p>

            <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>5. Intellectual Property</h2>
            <p>All content, trademarks, and other intellectual property on our website are owned by Infotech or our licensors. You may not use our intellectual property without prior written permission.</p>

            <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>6. Limitation of Liability</h2>
            <p>Infotech is not liable for any indirect, incidental, or consequential damages arising out of your use of our services. Our total liability is limited to the amount you have paid for the services.</p>

            <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>7. Termination</h2>
            <p>We reserve the right to terminate or suspend your access to our services at any time, with or without cause, and without notice.</p>

            <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>8. Governing Law</h2>
            <p>These Terms are governed by and construed in accordance with the laws of Pakistan/USA or Your Country. Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts in Pakistan/USA or Your Country.</p>

            <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>9. Changes to Terms</h2>
            <p>We may update these Terms from time to time. We will notify you of any changes by posting the new Terms on our website.</p>

            <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>10. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us <Link href="/contact">Here!</Link></p>
        </div>
        </>
    )
}

export default page
