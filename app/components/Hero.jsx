"use client";
import React from "react";
import { motion } from "framer-motion";
import Template from "./template";

const Hero = () => {
  return (
    <Template>
      <div
        id="herosection"
        className="flex items-center justify-center bg-gradient-to-r from-secondary-950 to-secondary-900 min-h-screen w-full px-8 lg:px-20 relative overflow-hidden"
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 z-0"></div>

        <motion.div
          initial={{ y: "10vh", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-3xl text-white"
        >
<h1
  className="text-5xl lg:text-7xl font-bold lato text-center md:text-left lg:pl-10 w-full text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-600 pb-5"
  initial={{ y: "100vh", opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 1 }}
>
  Have an Idea? Make It Digital with{" "}
  <span className="text-secondary-400">InfoTech!</span>
</h1>



          <p
            className="mt-6 text-lg lg:text-xl font-medium text-gray-300 leading-relaxed"
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            We are a leading technology agency that specializes in providing
            cutting-edge services to help businesses stay ahead of the curve.
            Let's build something amazing together!
          </p>

          <motion.div
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="mt-8"
          >
<button
  className="border-secondary-400 text-secondary-300 bg-secondary-950 hover:text-gray-900 hover:bg-secondary-400 transition-all duration-300 border-2 px-8 py-4 rounded-md shadow-lg shadow-teal-400/50 hover:shadow-teal-500/70 glow-effect mt-6"
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1 }}
>
  Connect Us!
</button>


          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-teal-400 opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-cyan-600 opacity-20 animate-bounce"></div>
      </div>
    </Template>
  );
};

export default Hero;
