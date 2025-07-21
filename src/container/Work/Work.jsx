import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('Personal'); // Changed from 'All' to 'Personal'
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  useEffect(() => {
    // Updated query to include the new boolean fields
    const query = '*[_type == "works"]{ title, description, projectLink, showProjectLink, codeLink, showCodeLink, imgUrl, tags, openInModal }';

    client.fetch(query)
      .then((data) => {
        setWorks(data);
        // Filter to show only 'Personal' items by default
        setFilterWork(data.filter((work) => work.tags.includes('Personal')));
      });
  }, []);
  
  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y:100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y:0, opacity: 1 }]);

      if(item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
    }}, 500);
  }

  // Modal handlers
  const openModal = (work) => {
    setSelectedProject(work);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>
      <div className="app__work-filter">
        {['Personal', 'Work', 'Games', 'Art', 'All'].map((item, index) => (
          <div 
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>  
      ))}  
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
          className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl)} alt={work.name} />
            
              <motion.div 
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                {/* Conditional Project Link (Eye Icon) - only show if enabled in Sanity */}
                {work.showProjectLink && work.projectLink && (
                  work.openInModal ? (
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                      onClick={() => openModal(work)}
                      style={{ cursor: 'pointer' }}
                    >
                      <AiFillEye />
                    </motion.div>
                  ) : (
                    <a href={work.projectLink} target="_blank" rel="noreferrer">
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillEye />
                      </motion.div>
                    </a>
                  )
                )}

                {/* Conditional GitHub Link - only show if enabled in Sanity */}
                {work.showCodeLink && work.codeLink && (
                  <a href={work.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                )}
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>  
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Modal */}
      {showModal && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedProject.title}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <iframe 
                src={selectedProject.projectLink} 
                width="100%" 
                height="100%"
                frameBorder="0"
                title={selectedProject.title}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AppWrap(
  MotionWrap(Work, 'app__works'),
    'work',
    'app__primarybg'
);