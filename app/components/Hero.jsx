"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Template from "./template";

const Hero = () => {
  return (
    <Template>
      <div
        id="herosection"
        className="flex md:flex-row flex-col  -mt-5 justify-center bg-[url('/bg.webp')] bg-left min-h-screen w-full px-8 lg:px-20 text-left"
      >
        <motion.div
          initial={{ y: "10vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col filter backdrop:blur-xl items-center justify-center w-full md:w-1/2 xyz-in"
        >
          <h1
            className="text-5xl lg:text-7xl font-bold lato text-white text-center md:text-left w-full"
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Welcome to{" "}
            <span className="text-secondary-400">Infotech</span>!
          </h1>
          <p
            className="mt-6 text-lg lg:text-xl font-medium raleway text-gray-200 text-center md:text-left"
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
Our company is your friendly tech partner that makes digital solutions simple. Our team helps
businesses grow online through website design & development, digital marketing & SEO, logo &
graphic design, video production & editing, and medical billing services.
What makes us special? We're a close-knit team that gives your project the attention it
deserves. We're big enough to handle major projects but small enough to care about every
detail.
We can build you a custom website that looks great and works smoothly, get your business
found online through SEO and marketing, create eye-catching designs that make your brand
stand out, produce professional videos that tell your story, and provide efficient medical billing
services tailored to your needs. We speak plain language, solve real problems, and keep up
with the latest tech trends so you don't have to.
Let's work together to make your business shine online!
          </p>
          <motion.div
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-items-start w-full"
          >
            <button
              className="mt-8 border-secondary-400 text-secondary-300 bg-secondary-950 hover:text-gray-900 hover:bg-secondary-400 transition-all duration-300 border-2 px-6 py-3 rounded-md xyz-in-rotate"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Connect Us!
            </button>
          </motion.div>
        </motion.div>
{/*         <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-1/2 md:block hidden"
        >
          <Image
            src={"/techimage.webp"}
            width={600}
            height={600}
            alt={"tech"}
            priority
            className="rounded-md shadow-2xl shadow-white"
          />
        </motion.div> */}
      </div>
    </Template>
  );
};

export default Hero;
