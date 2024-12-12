import React from 'react';
import './About.css';

function About({}) {
  const features = [
    {
      title: 'Manage Doctors',
      description: 'Easily add, update, and manage your doctors.',
    },
    {
      title: 'Emergency Contacts',
      description: 'Keep track of emergency contacts for quick access.',
    },
    {
      title: 'Appointment Calendar',
      description: 'Schedule and manage your appointments efficiently.',
    },
    {
      title: 'Medications',
      description: 'Store and track your medications in one place.',
    },
  ];

  const handleGetStartedClick = () => {

  }

  return (
    <div className="about">
      <h1 className="about__title">About Us</h1>
      <p className="about__text">
        Our app is designed to simplify caregiving by providing all the tools you need in one place.
      </p>
      <div className="about__features">
        <h2 className="about__features-title">Features</h2>
        <div className="about__features-list">
          {features.map((feature, index) => (
            <div key={index} className="about__feature">
              <h3 className="about__feature-title">{feature.title}</h3>
              <p className="about__feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="about__get-started">
          <button className="about__get-started-btn">Get started</button>
        </div>
      </div>
    </div>
  );
}

export default About;