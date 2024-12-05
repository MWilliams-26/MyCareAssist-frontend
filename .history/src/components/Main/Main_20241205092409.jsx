// import './Main.css';

// function Main({ handleRegistrationClick }) {
//   return (
//     <main>
//       <section className="welcome__section">
//         <div className="welcome__title-container">
//           <h1 className="welcome__title">Your personal medical care assistant</h1>
//           <p className="welcome__text">
//             Empowering Care, Simplifying Lives.
//           </p>
//           <div className="welcome__button-container">
//             <button className="welcome__button" onClick={handleRegistrationClick}>Get started</button>
//           </div>
//         </div>
//       </section>
//       <section className="welcome__features">
//         <h2 className="welcome__features-title">Features</h2>
//         <div className="welcome__features-container">
//           <div className="welcome__features-doctor">
//             <h3 className="welcome__features-sub">Doctors</h3>
//             <p className="welcome__features-text">
//               Keep all your healthcare providers’ details in one place.
//             </p>
//           </div>
//           <div className="welcome__features-emergency">
//             <h3 className="welcome__features-sub">Emergency Contacts</h3>
//             <p className="welcome__features-text">
//               In moments of need, an emergency contacts list is a lifeline to those who care for you.
//             </p>
//           </div>
//           <div className="welcome__features-calendar">
//             <h3 className="welcome__features-sub">Calendar</h3>
//             <p className="welcome__features-text">
//               Stay on top of your day with a calendar that ensures you never miss appointments, tasks, or important events.
//             </p>
//           </div>
//           <div className="welcome__features-medication">
//             <h3 className="welcome__features-sub">Medication</h3>
//             <p className="welcome__features-text">
//               Know exactly what you’re taking with a clear list of medications, dosages, and schedules.
//             </p>
//           </div>
//         </div>
//       </section>
//     </main>
//   )
// }

// export default Main;

import './Main.css';
import { useState } from 'react';

function Main({ handleRegistrationClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const features = [
    {
      title: "Doctors",
      text: "Keep all your healthcare providers' details in one place.",
      className: "welcome__features-doctor"
    },
    {
      title: "Emergency Contacts",
      text: "In moments of need, an emergency contacts list is a lifeline to those who care for you.",
      className: "welcome__features-emergency"
    },
    {
      title: "Calendar",
      text: "Stay on top of your day with a calendar that ensures you never miss appointments, tasks, or important events.",
      className: "welcome__features-calendar"
    },
    {
      title: "Medication",
      text: "Know exactly what you're taking with a clear list of medications, dosages, and schedules.",
      className: "welcome__features-medication"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

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
          <button className="carousel-button prev" onClick={prevSlide}>&lt;</button>
          <div className={`welcome__features-container ${features[currentSlide].className}`}>
            <h3 className="welcome__features-sub">{features[currentSlide].title}</h3>
            <p className="welcome__features-text">
              {features[currentSlide].text}
            </p>
          </div>
          <button className="carousel-button next" onClick={nextSlide}>&gt;</button>
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
}

export default Main;
