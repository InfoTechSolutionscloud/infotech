"use client";
import { motion } from "framer-motion";
import useSWR from "swr";
import Slider from "react-slick";
import public_fetcher from "../lib/fetcher";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Portfolio = ({ qty, titleSimple, hititle, tagline, hitagline, animate }) => {
  const { data, error, isLoading } = useSWR(`/api/portfolio/all`, public_fetcher);
  let maxshow;
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

  // Determine if animations should be applied
  const shouldAnimate = animate && data && data.portfolio.length > 3;

  return (
    <div id="portfolio" className="flex flex-col items-center justify-center py-20 bg-gradient-to-tr from-gray-700/25 via-secondary-900 to-gray-700/25 overflow-hidden">
      {isLoading && (
        <div className="animate-spin w-10 h-10 mx-auto"></div>
      )}
      {error && (
        <div className="text-xl text-white font-semibold text-center">{error.response.data.message}</div>
      )}
      {data && (
        <div className="w-full max-w-7xl px-4 lg:px-0">
          {/* Title Animation */}
          <motion.h3
            initial={{ opacity: 0, y: shouldAnimate ? -50 : 0 }}
            whileInView={{ y: shouldAnimate ? 0 : undefined, opacity: 1 }}
            transition={{ duration: shouldAnimate ? 0.8 : 0, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl lg:text-4xl font-bold lato text-white text-center"
          >
            {titleSimple}<span className="text-secondary-400">{hititle}</span>
          </motion.h3>

          {/* Description Animation */}
          <motion.p
            initial={{ opacity: 0, y: shouldAnimate ? -20 : 0 }}
            animate={{ opacity: 1, y: shouldAnimate ? 0 : undefined }}
            transition={{ duration: shouldAnimate ? 0.8 : 0, delay: shouldAnimate ? 0.3 : 0 }}
            className="text-center text-sm text-white mb-10 mt-2 raleway"
          >
            {tagline}<span className="bg-secondary-500 text-black p-2">{hitagline}</span>
          </motion.p>

          {/* Slider or Static Cards */}
          {animate ? (
            <Slider {...settings}>
              {data.portfolio.slice(0, qty || data.portfolio.length).map((item, index) => (
                <motion.article
                  key={item.id} // Ensure unique key is `item.id`
                  className="p-4"
                  initial={{ opacity: 0, scale: shouldAnimate ? 0.8 : 1 }}
                  animate={{ opacity: 1, scale: shouldAnimate ? 1 : undefined }}
                  transition={{ duration: shouldAnimate ? 0.5 : 0, delay: shouldAnimate ? index * 0.3 : 0 }}
                >
                  <div
                    className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-900/40"></div>
                    <motion.a
                      href={`/portfolio/${item.slug}`}
                      initial={{ opacity: 0, y: shouldAnimate ? 20 : 0 }}
                      animate={{ opacity: 1, y: shouldAnimate ? 0 : undefined }}
                      transition={{ duration: shouldAnimate ? 0.6 : 0 }}
                      className="z-10 mt-3 text-3xl merriweather font-bold truncate text-white"
                    >
                      {item.title}
                    </motion.a>
                    <motion.p
                      initial={{ opacity: 0, y: shouldAnimate ? 20 : 0 }}
                      animate={{ opacity: 1, y: shouldAnimate ? 0 : undefined }}
                      transition={{ duration: shouldAnimate ? 0.6 : 0, delay: shouldAnimate ? 0.2 : 0 }}
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
            // Display when animate is false
            <div className="flex flex-wrap justify-center gap-4">
              {data.portfolio.slice(0, qty || data.portfolio.length).map((item) => (
                <div
                  key={item.id} // Ensure unique key is `item.id`
                  className="p-4 w-full md:w-1/3" >
                  <div
                    className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 bg-cover bg-center h-[400px]"
                  
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-900/40"></div>
                    <a
                      href={`/portfolio/${item.slug}`}
                      className="z-10 mt-3 text-3xl merriweather font-bold text-white truncate"
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
  {/* Modal for Image Zoom */}
      <div id="myModal" className="modal" onClick={closeModal}>
        <span className="close" onClick={closeModal}>&times;</span>
        <img className="modal-content" id="img01" style={{ maxWidth: '80%', maxHeight: '80%', margin: 'auto' }} />
      </div>
      
    </div>
  );
    // Open modal to zoom the image
  function openModal(imgSrc) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = imgSrc; // Set the clicked image to the modal
  }

  // Close the modal
  function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }
};

export default Portfolio;
