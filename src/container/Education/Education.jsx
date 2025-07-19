import React from 'react';
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Education.scss';

const Education = () => {
  const educationData = [
    {
      id: 1,
      institution: "Brown University",
      period: "2023-2027",
      degrees: ["B.S. in Computer Science-Economics", "B.A. in Visual Art"],
      coursework: [
        "Object-Oriented Programming",
        "Data Structures and Algorithms", 
        "Linear Algebra",
        "Software Engineering",
        "Probabilistic Models",
        "Statistical Inference",
        "Investments I & II"
      ],
      activities: [
        "Brown Entrepreneurship Program",
        "BOS",
        "Brown Motion Pictures"
      ]
    },
    {
      id: 2,
      institution: "Oakton High School",
      period: "2019-2023",
      honors: [
        "Valedictorian",
        "Congressional Art Competition Award",
        "Harry F. Bird Scholarship Nominee"
      ],
      activities: [
        "Public Forum Debate",
        "Cross Country",
        "Track & Field",
        "Math Honor Society"
      ]
    }
  ];

  return (
    <>
      <h2 className="head-text">Education</h2>
      
      <div className="app__education-container">
        <div className="app__education-timeline">
          {educationData.map((education, index) => (
            <motion.div
              key={education.id}
              className={`app__education-item ${index % 2 === 0 ? 'left' : 'right'}`}
              whileInView={{ opacity: [0, 1], y: [50, 0] }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="app__education-content">
                <div className="app__education-period">
                  <span className="bold-text">{education.period}</span>
                </div>
                
                <div className="app__education-card">
                  <h3 className="bold-text">{education.institution}</h3>
                  
                  {education.degrees && (
                    <div className="app__education-section">
                      <p className="p-text">
                        <span className="section-title">Concentrations: </span>
                        {education.degrees.join(', ')}
                      </p>
                    </div>
                  )}
                  
                  {education.coursework && (
                    <div className="app__education-section">
                      <p className="p-text">
                        <span className="section-title">Course Work: </span>
                        {education.coursework.join(', ')}
                      </p>
                    </div>
                  )}
                  
                  {education.honors && (
                    <div className="app__education-section">
                      <p className="p-text">
                        <span className="section-title">Honors: </span>
                        {education.honors.join(', ')}
                      </p>
                    </div>
                  )}
                  
                  {education.activities && (
                    <div className="app__education-section">
                      <p className="p-text">
                        <span className="section-title">Activities: </span>
                        {education.activities.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Education, 'app__education'),
  'education',
  'app__primarybg'
);