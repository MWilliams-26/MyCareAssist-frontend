import './Main.css';
import { useState } from 'react';

function Main({ handleRegistrationClick }) {
  return (
    <main>
      <section className="welcome__section">
        <div className="welcome__title-container">
          <h1 className="welcome__title">Your personal medical care assistant</h1>
          <p className="welcome__text">
            Empowering Care, Simplifying Lives.
          </p>
          <div className="welcome__button-container">
            <button className="welcome__button" onClick={handleRegistrationClick}>Get started</button>
          </div>
        </div>
      </section>
      <section className="welcome__features">
        <h2 className="welcome__features-title">Features</h2>



        <div className="welcome__features-carousel">
          <button className="carousel-button prev" onClick={prevSlide}><</button>
          <div className={`welcome__features-container ${features[currentSlide].className}`}>
            <h3 className="welcome__features-sub">{features[currentSlide].title}</h3>
            <p className="welcome__features-text">

              {features[currentSlide].text}
            </p>
          </div>





          <button className="carousel-button next" onClick={nextSlide}>></button>
          <div className="carousel-dots">
            {features.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>












        </div>
      </section>
    </main>



  );
}export default Main;