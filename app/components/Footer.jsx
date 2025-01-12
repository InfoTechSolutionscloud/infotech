"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-secondary-950 to-black text-white py-16">
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Footer Top */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src={"/logo.png"}
                width={300}
                height={300}
                className="w-40"
                alt="Company Logo"
              />
            </Link>
            <p className="mt-4 text-sm text-gray-300 max-w-xs">
              Make Your Business Digital!
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex space-x-4">
              <SocialLink
                href="https://www.facebook.com/profile.php?id=61563953222407&mibextid=ZbWKwL"
                src="https://www.svgrepo.com/show/503338/facebook.svg"
              />
              <SocialLink
                href="https://www.instagram.com/infotech.solutions.company?igsh=MW5sZWZodm44NnU1"
                src="https://www.svgrepo.com/show/494277/instagram-round.svg"
              />
              <SocialLink
                href="https://www.linkedin.com/company/infotech-solutions-company/"
                src="https://www.svgrepo.com/show/494278/linkedin-round.svg"
              />
              <SocialLink
                href="https://wa.link/fl12of"
                src="https://www.svgrepo.com/show/358411/whatsapp-alt.svg"
              />
              <SocialLink
                href="https://join.skype.com/invite/vNwELvlS0ZFG"
                src="https://www.svgrepo.com/show/494283/skype-round.svg"
              />
              <SocialLink
                href="https://www.youtube.com/@Infotechinstitutecompany"
                src="https://www.svgrepo.com/show/494293/youtube-round.svg"
              />
            </div>
          </div>

          {/* Services Links */}
          <div>
            <p className="text-lg font-semibold text-teal-400">Services</p>
            <nav className="mt-4 space-y-2">
              {[
                "Web Development",
                "Medical Billing",
                "Digital Marketing",
                "Graphic Design",
                "SEO Optimization",
                "Video Editing",
                "Content Writing",
              ].map((service) => (
                <FooterLink key={service} href={`/services/${service.toLowerCase().replace(/ /g, "-")}`} text={service} />
              ))}
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <p className="text-lg font-semibold text-teal-400">Legal</p>
            <nav className="mt-4 space-y-2">
              <FooterLink href="/legal/privacy-policy" text="Privacy Policy" />
              <FooterLink href="/legal/terms" text="Terms & Conditions" />
              <FooterLink href="/legal/return-policy" text="Returns Policy" />
            </nav>
          </div>
        </div>

        {/* Footer Bottom */}
        <p className="mt-12 text-xs text-gray-400 text-center">
          © 2024 Infotech Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, src }) => (
  <Link href={href} target="_blank" className="hover:scale-110 transition-transform duration-300">
    <Image src={src} width={30} height={30} className="filter invert" alt="social icon" />
  </Link>
);

const FooterLink = ({ href, text }) => (
  <Link href={href} className="text-sm text-gray-300 hover:text-teal-400 transition-colors duration-300">
    {text}
  </Link>
);

export default Footer;
