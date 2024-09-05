import CustomHead from '@/app/components/CustomHead'
import Link from 'next/link'
import React from 'react'

const page = () => {
    const fullUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <>
        <CustomHead title={"Privacy Policy"} description={"Here is infotech's policy that can help you to parfectly comply with all rules and conditions with infotech"} keywords={"privacypolicy, legal"} fullUrl={fullUrl} />
            <div className='bg-gray-950 p-5 px-2 md:px-20 text-gray-300 raleway '>
                <h1 className='text-4xl text-white merriweather font-bold py-2'>Privacy Policy</h1>
                <p className='text-sm text-white raleway'>Last Updated: 26/08/2024</p>

                <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>1. Introduction</h2>
                <p>Welcome to Infotech (“we”, “our”, “us”). We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and disclose your personal information when you visit our website and use our services.</p>

                <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>2. Information We Collect</h2>
                <ul>
                    <li>Personal Information: Name, email address, phone number, billing information, and other details necessary to provide our services.</li>
                    <li>Technical Information: IP address, browser type, operating system, and data about your interaction with our site.</li>
                    <li>Cookies: Information collected through cookies and similar tracking technologies.</li>
                </ul>

                <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>3. How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul>
                    <li>To provide, operate, and maintain our services.</li>
                    <li>To improve, personalize, and expand our website.</li>
                    <li>To understand and analyze how you use our website.</li>
                    <li>To process transactions and send related information.</li>
                    <li>To communicate with you, including customer service, support, and promotional messages.</li>
                </ul>

                <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>4. Sharing Your Information</h2>
                <p>We may share your personal information with third parties under the following circumstances:</p>
                <ul>
                    <li>Service Providers: We may share your data with third-party vendors who provide services on our behalf, such as payment processing, data analysis, and customer service.</li>
                    <li>Legal Requirements: We may disclose your information if required by law, regulation, or legal process.</li>
                </ul>

                <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>5. Data Security</h2>
                <p>We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>

                <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>6. Your Rights</h2>
                <p>Depending on your location, you may have the following rights regarding your personal information:</p>
                <ul>
                    <li>Access, update, or delete your personal information.</li>
                    <li>Object to or restrict the processing of your data.</li>
                    <li>Data portability.</li>
                    <li>Withdraw consent at any time.</li>
                </ul>

                <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>7. Changes to This Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

                <h2 className='text-2xl text-white merriweather pt-5 font-semibold py-2'>8. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us <Link href="/contact">Here!</Link></p>
            </div>
        </>
    )
}

export default page
