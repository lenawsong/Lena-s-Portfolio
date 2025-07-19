import React from 'react';
import { IoLogoLinkedin } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
//import { FaFacebookF } from 'react-icons/fa';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a 
        href="https://www.linkedin.com/in/lena-w-song/" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
      >
        <IoLogoLinkedin />
      </a>
    </div>
    <div>
      <a 
        href="https://github.com/lenawsong" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="GitHub Profile"
      >
        <FaGithub />
      </a>
    </div>
  </div>
);

export default SocialMedia;