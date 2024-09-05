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

  const fullUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <main className="bg-black min-h-screen px-1 md:px-0">
      <CustomHead fullUrl={fullUrl} />
      <Hero />
      <ScrollAnimation>
        <WhyChooseUs qty={4} />
        <Buttonline title={"Know More About Us"} link={"/about"} />
      </ScrollAnimation>
      <ScrollAnimation>
        <Services titleSimple={"What we "} hititle={"Offer!"} tagline={"We provide a variety of services! Here are "} hitagline={"Top services"} animate={false} />
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

