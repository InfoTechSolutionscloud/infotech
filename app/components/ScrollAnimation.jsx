"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScrollAnimation = ({ children, triggerOnce = true, threshold = 0 }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({
        triggerOnce: triggerOnce,
        threshold: threshold,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollAnimation;
