"use client"
import React from "react";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Blogs from "./components/Blogs";
import Buttonline from "./components/Buttonline";
import Contact from "./components/Contact";
import ScrollAnimation from "./components/ScrollAnimation";
import CustomHead from "./components/CustomHead";

export default function Home() {

  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/`;


  return (
    <main className="bg-black min-h-screen px-1 md:px-0">
      {<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Corporation",
            "name": "infoTech solutions",
            "url": "https://www.infotechsolutions.cloud/",
            "logo": "https://www.infotechsolutions.cloud/_next/image?url=%2Flogo.png&w=256&q=75",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "03282296963",
              "contactType": "customer service",
              "contactOption": "HearingImpairedSupported",
              "areaServed": "PK",
              "availableLanguage": "en"
            },
            "sameAs": [
              "https://www.instagram.com/infotech.solutions.company/?igsh=MW5sZWZodm44NnU1",
              "https://www.infotechsolutions.cloud/",
              "https://www.instagram.com/infotech.solutions.company/?igsh=MW5sZWZodm44NnU1",
              "https://www.linkedin.com/company/infotech-solutions-company/",
              "https://www.infotechsolutions.cloud/"
            ]
          })
        }}
      />}

      <CustomHead fullUrl={fullUrl} />
      <Hero />
      <ScrollAnimation>
        <WhyChooseUs qty={4} />
        <Buttonline title={"Know More About Us"} link={"/about"} />
      </ScrollAnimation>
      <ScrollAnimation>
        <Services titleSimple={"What we "} hititle={"Offer!"} tagline={"We provide a variety of services! Here are "} hitagline={"Top services"} animate={true} />
        <Buttonline title={"Explore Our Services"} link={"/services"} />
      </ScrollAnimation>
      <ScrollAnimation>
        <Portfolio />
        <Buttonline title={"View All Portfolios"} link={"/portfolio"} />
      </ScrollAnimation>
      <ScrollAnimation>
        <Blogs qty={6} />
        <Buttonline title={"Visit Blogs"} link={"/blogs"} />
      </ScrollAnimation>
      <ScrollAnimation>
        <Contact />
      </ScrollAnimation>
    </main>

  );
}

