"use client";
import { motion } from "framer-motion";
import useSWR from "swr";
import Slider from "react-slick";
import public_fetcher from "../lib/fetcher";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Services = ({ qty, titleSimple, hititle, tagline, hitagline, animate }) => {
  const { data, error, isLoading } = useSWR(`/api/service/all`, public_fetcher);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div id="services" className="flex flex-col items-center justify-center py-20 bg-gradient-to-tr from-gray-700/25 via-secondary-900 to-gray-700/25 overflow-hidden">
      {isLoading && <div className="animate-spin w-10 h-10 mx-auto"></div>}
      {error && <div className="text-xl text-white font-semibold text-center">{error.response.data.message}</div>}
      {data && (
        <div className="w-full max-w-7xl px-4 lg:px-0">
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl lg:text-4xl font-bold lato text-white text-center"
          >
            {titleSimple}<span className="text-secondary-400">{hititle}</span>
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center text-sm text-white mb-10 mt-2 raleway"
          >
            {tagline}<span className="bg-secondary-500 text-black p-2">{hitagline}</span>
          </motion.p>

          {/* Services */}
          {animate ? (
            <Slider {...settings}>
              {data.services.slice(0, qty || data.services.length).map((item, index) => (
                <motion.article
                  key={item.id}
                  className="service-box"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                >
                  <div
                    className="relative flex flex-col justify-end overflow-hidden rounded-2xl bg-cover bg-center h-[300px]"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-900/40"></div>
                    <motion.a
                      href={`/services/${item.slug}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="z-10 mt-3 text-3xl merriweather font-bold truncate text-white"
                    >
                      {item.title}
                    </motion.a>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="z-10 text-sm raleway leading-2 text-gray-200"
                    >
                      {item.short_description.split(" ").slice(0, 20).join(" ") +
                        (item.short_description.split(" ").length > 20 ? "..." : "")}
                    </motion.p>
                  </div>
                </motion.article>
              ))}
            </Slider>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              {data.services.slice(0, qty || data.services.length).map((item) => (
                <div key={item.id} className="service-box w-full md:w-1/3">
                  <div
                    className="relative flex flex-col justify-end overflow-hidden rounded-2xl bg-cover bg-center h-[300px]"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-900/40"></div>
                    <a
                      href={`/services/${item.slug}`}
                      className="z-10 mt-3 text-3xl merriweather font-bold truncate text-white"
                    >
                      {item.title}
                    </a>
                    <p className="z-10 text-sm leading-6 luto text-gray-300">
                      {item.short_description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Services;
