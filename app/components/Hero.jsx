"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Template from "./template";

const Hero = () => {
  return (
    <Template>
      {/* Container for the background image */}
      <div className="relative min-h-screen w-full">
        {/* Next.js Image component for the background image with priority */}
        <Image
          src="/bg.webp"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          priority
          className="z-0"
        />
        {/* Main content section */}
        <div
          id="herosection"
          className="flex md:flex-row flex-col items-center -mt-5 justify-center min-h-screen w-full px-8 lg:px-20 text-left relative z-10"
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
              Have an Idea? Make It Digital with{" "}
              <span className="text-secondary-400">Infotech</span>!
            </h1>
            <p
              className="mt-6 text-lg lg:text-xl font-medium raleway text-gray-200 text-center md:text-left"
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              We are a leading technology agency that specializes in providing the
              best services for businesses to stay ahead of the competition. From
              website development to mobile app development, we have the expertise to
              transform your business. Join us and let&apos;s create something amazing
              together.
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
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-1/2 md:block hidden"
          >
            <Image
              src={"/techimage.webp"}
              priority
              width={600}
              height={600}
              alt={"tech"}
              className="rounded-md shadow-2xl shadow-white"
            />
          </motion.div>
        </div>
      </div>
    </Template>
  );
};

export default Hero;
