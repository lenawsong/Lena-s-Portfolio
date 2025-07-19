import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiChevronRight } from 'react-icons/hi';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss'; 
import { urlFor, client } from '../../client';

import about01 from '../../assets/about01.png';
import about02 from '../../assets/about02.png';
import about03 from '../../assets/about03.png';
import about04 from '../../assets/about04.png';

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Add your image URLs here - replace with your actual images
  const aboutImages = [
    about01,
    about02,
    about03,
    about04
  ];

  // Text slides for the carousel
  const textSlides = [
    {
      title: "Welcome!",
      content: "Hello and welcome to my portfolio! My name is Lena, and I grew up in the DMV, where I spent 18 years building projects, tinkering with various unrelated hobbies, and trying every sport imaginable. I attended Oakton High School, where I developed a passion for engineering and design. There, I also picked up my love for cross country and track & field, and to this day, if I'm not building things, I'm probably stretching my legs and jogging in a park somewhere."
    },
    {
      title: "My Studies",
      content: "Presently, I'm a rising junior at Brown University studying Computer Science-Economics and Visual Art. Through the open curriculum, I've been able to explore all of my interests freely, from computer science and finance to painting and filmmaking. The common thread between it all is that I love creating innovative solutions, telling unique stories, and using quantitative methods to bridge the gap between technology and creative expression. Welcome to my portfolio!"
    }
  ];

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query)
      .then((data) => setAbouts(data))   
  }, []);

  // Simple image rotation effect
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % aboutImages.length
      );
    }, 4000);

    return () => clearInterval(imageInterval);
  }, [aboutImages.length]);

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => 
      (prevSlide + 1) % textSlides.length
    );
  };

  return (
    <>
      <h2 className="head-text">About me</h2>

      {/* Updated content section with image and carousel text */}
      <div className="app__about-content">
        <motion.div 
          className="app__about-image"
          whileInView={{ opacity: [0, 1], x: [-50, 0] }}
          transition={{ duration: 0.75 }}
        >
          <div className="image-container">
            {aboutImages.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt="About me"
                className="about-rotating-image"
                animate={{ 
                  opacity: index === currentImageIndex ? 1 : 0 
                }}
                transition={{ 
                  duration: 1,
                  ease: "easeInOut" 
                }}
              />
            ))}
          </div>
        </motion.div>
        
        <div className="app__about-text-container">
          <motion.div 
            className="app__about-card"
            key={currentSlide} // Forces re-animation on slide change
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="p-text">
              {textSlides[currentSlide].content}
            </p>
            
            {/* Slide indicators */}
            <div className="slide-indicators">
              {textSlides.map((_, index) => (
                <span 
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </motion.div>

          {/* Navigation arrows */}
          <button className="carousel-arrow carousel-arrow-right" onClick={nextSlide}>
            <HiChevronRight />
          </button>
        </div>
      </div>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView = {{ opacity: 1 }}
            whileHover = {{ scale: 1.1 }}
            transition = {{ duration: 0.5, type: 'tween' }}
            className = "app__profile-item"
            key = {about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
        </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(About, 'app__about'),
    'about',
    'app__whitebg'
);