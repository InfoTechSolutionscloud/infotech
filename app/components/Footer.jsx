import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r bg-primary-950 py-12 text-white">
      <div className="max-w-screen-xl px-6 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Logo & Social Media Links */}
          <div className="flex flex-col items-center lg:items-start">
            <Link href="/" className="flex items-center select-none">
              <Image src="/logo.png" width={300} height={300} className="w-40" alt="company logo" />
            </Link>
            <p className="mt-4 text-sm text-gray-200 text-center lg:text-left">
              Make Your Business Digital!
            </p>
            <div className="mt-4 flex justify-center space-x-4 text-gray-200">
              <Link href="https://www.facebook.com/profile.php?id=61563953222407&mibextid=ZbWKwL" target="_blank">
                <Image src="https://www.svgrepo.com/show/503338/facebook.svg" width={30} height={30} className="filter invert hover:hue-rotate-90" alt="facebook" />
              </Link>
              <Link href="https://www.instagram.com/infotech.solutions.company?igsh=MW5sZWZodm44NnU1" target="_blank">
                <Image src="https://www.svgrepo.com/show/494277/instagram-round.svg" width={30} height={30} className="filter invert hover:hue-rotate-90" alt="instagram" />
              </Link>
              <Link href="https://www.linkedin.com/company/infotech-solutions-company/" target="_blank">
                <Image src="https://www.svgrepo.com/show/494278/linkedin-round.svg" width={30} height={30} className="filter invert hover:hue-rotate-90" alt="linkedin" />
              </Link>
            </div>
            <div className="flex justify-center mt-2 space-x-4 text-gray-200">
              <Link href="https://wa.link/fl12of" target="_blank">
                <Image src="https://www.svgrepo.com/show/358411/whatsapp-alt.svg" width={30} height={30} className="filter invert hover:hue-rotate-90" alt="whatsapp" />
              </Link>
              <Link href="https://join.skype.com/invite/vNwELvlS0ZFG" target="_blank">
                <Image src="https://www.svgrepo.com/show/494283/skype-round.svg" width={30} height={30} className="filter invert hover:hue-rotate-90" alt="skype" />
              </Link>
              <Link href="https://www.youtube.com/@Infotechinstitutecompany">
                <Image src="https://www.svgrepo.com/show/494293/youtube-round.svg" width={30} height={30} className="filter invert hover:hue-rotate-90" alt="youtube" />
              </Link>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <p className="font-medium text-white">Services</p>
            <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-200">
              <Link href="/services/web-development" className="hover:opacity-75">Web Development</Link>
              <Link href="/services/Medical%20Billing" className="hover:opacity-75">Medical Billing</Link>
              <Link href="/services/digital-marketing" className="hover:opacity-75">Digital Marketing</Link>
              <Link href="/services/graphic-design" className="hover:opacity-75">Graphic Design</Link>
              <Link href="/services/seo-optimization" className="hover:opacity-75">SEO Optimization</Link>
              <Link href="/services/video-editing" className="hover:opacity-75">Video Editing</Link>
              <Link href="/services/content-writing" className="hover:opacity-75">Content Writing</Link>
            </nav>
          </div>

          {/* Legal Section */}
          <div>
            <p className="font-medium text-white">Legal</p>
            <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-200">
              <Link href="/legal/privacy-policy" className="hover:opacity-75">Privacy Policy</Link>
              <Link href="/legal/terms" className="hover:opacity-75">Terms & Conditions</Link>
              <Link href="/legal/return-policy" className="hover:opacity-75">Returns Policy</Link>
            </nav>
          </div>

          {/* FAQ Section */}
          <div>
            <p className="font-medium text-white">FAQ</p>
            <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-200">
              <Link href="/legal/general" className="hover:opacity-75">General Questions</Link>
              <Link href="/legal/pricing" className="hover:opacity-75">Pricing & Plans</Link>
              <Link href="/legal/support" className="hover:opacity-75">Support & Help</Link>
            </nav>
          </div>
        </div>
        
        {/* Footer Copyright */}
        <p className="mt-8 text-center text-xs text-gray-200">
          © 2024 Infotech Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
