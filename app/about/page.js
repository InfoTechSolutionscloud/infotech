"use client";
import React from "react";
import { motion } from "framer-motion";
import WhyChooseUs from "../components/WhyChooseUs";
import Image from "next/image";
import CustomHead from "../components/CustomHead";

const AboutPage = () => {
  const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/about`;

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <>
      <CustomHead
        title={"About Us"}
        description={
          "Discover the story behind Infotech, our values, and what drives us to deliver exceptional services to our clients. Learn more about our team, our mission, and why we are the best choice for all your tech-related needs."
        }
        fullUrl={fullUrl}
      />
      <div className="bg-black min-h-screen">
        <section className="bg-gradient-to-tr from-gray-900 via-primary-900 to-gray-800 px-4 py-16 lg:py-24">
          <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Animated Text Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-gray-200 font-light space-y-6"
            >
              <h2 className="text-5xl font-extrabold text-white tracking-tight merriweather">
                Welcome to Infotech
              </h2>
              <p className="text-lg leading-relaxed raleway">
                Our company is your friendly tech partner that makes digital
                solutions simple. Our team helps businesses grow online through
                website design & development, digital marketing & SEO, logo &
                graphic design, video production & editing, and medical billing
                services.
              </p>
              <p className="text-lg leading-relaxed raleway">
                What makes us special? We're a close-knit team that gives your
                project the attention it deserves. We're big enough to handle
                major projects but small enough to care about every detail.
              </p>
              <p className="text-lg leading-relaxed raleway">
                We can build you a custom website that looks great and works
                smoothly, get your business found online through SEO and
                marketing, create eye-catching designs that make your brand
                stand out, produce professional videos that tell your story, and
                provide efficient medical billing services tailored to your
                needs. Let's work together to make your business shine online!
              </p>
            </motion.div>

            {/* Animated Image Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid grid-cols-2 gap-6"
            >
              <Image
                width={300}
                height={300}
                className="w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                alt="Office Content 1"
              />
              <Image
                width={300}
                height={300}
                className="w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                alt="Office Content 2"
              />
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />
      </div>
    </>
  );
};

export default AboutPage;
