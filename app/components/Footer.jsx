import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (

    <footer className="bg-gradient-to-r bg-primary-950">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center select-none">
              <Image src={"/logo.png"} width={300} height={300} className='w-40 ' alt='company logo' />
            </Link>
            <p className="max-w-xs mt-4 text-sm text-gray-200">
              Make Your Business Digital!
            </p>
            <div className='mt-4'>
            <div className="flex space-x-4 text-gray-200">
              <Link href="https://www.facebook.com/profile.php?id=61563953222407&mibextid=ZbWKwL" target="_blank">
                <Image src={"https://www.svgrepo.com/show/503338/facebook.svg"} width={30} height={30} className='filter invert hover:hue-rotate-90' alt='socialicon' />
              </Link>
              <Link href="https://www.instagram.com/infotech.solutions.company?igsh=MW5sZWZodm44NnU1" target="_blank">
                <Image src={"https://www.svgrepo.com/show/494277/instagram-round.svg"} width={30} height={30} className='filter invert hover:hue-rotate-90' alt='socialicon' />
              </Link>
              <Link href="https://www.linkedin.com/company/infotech-solutions-company/" target="_blank">
                <Image src={"https://www.svgrepo.com/show/494278/linkedin-round.svg"} width={30} height={30} className='filter invert hover:hue-rotate-90' alt='socialicon' />
              </Link>
              <Link href="https://wa.link/fl12of" target="_blank">
                <Image src={"https://www.svgrepo.com/show/358411/whatsapp-alt.svg"} width={30} height={30} className='filter invert hover:hue-rotate-90' alt='socialicon' />
              </Link>
             
            </div>
            <div className="flex mt-2 space-x-4 text-gray-200">
            <Link href="https://join.skype.com/invite/vNwELvlS0ZFG" target="_blank">
                <Image src={"https://www.svgrepo.com/show/494283/skype-round.svg"} width={30} height={30} className='filter invert hover:hue-rotate-90' alt='socialicons' />
              </Link>
            </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
           
            <div>
              <p className="font-medium text-white">
                Services
              </p>
            
   <ul>
 <li>                         
<Link href="/services/web-development"className="hover:opacity-75">
  Web Development
</Link>
 </li>
 <li>
  <Link href="/services/graphic-design" className="hover:opacity-75">
    Graphic Design
  </Link>
</li>
<li>
  <Link href="/services/data-entry" className="hover:opacity-75">
    Data Entry
  </Link>
</li>
<li>
  <Link href="/services/digital-marketing" className="hover:opacity-75">
    Digital Marketing
  </Link>
</li>
<li>
  <Link href="/services/seo-optimization" className="hover:opacity-75">
    SEO Optimization
  </Link>
</li>
<li>
  <Link href="/services/medical-billing" className="hover:opacity-75">
    Medical Billing
  </Link>
</li>
</ul>
       </div>
            </div>

            <div>
              <p className="font-medium text-white">
                Legal
              </p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-200">
                <Link className="hover:opacity-75" href="/legal/privacy-policy"> Privacy Policy </Link>
                <Link className="hover:opacity-75" href="/legal/terms"> Terms &amp; Conditions </Link>
                <Link className="hover:opacity-75" href="/legal/return-policy"> Returns Policy </Link>
              </nav>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-200">
          © 2024 Infotech Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
