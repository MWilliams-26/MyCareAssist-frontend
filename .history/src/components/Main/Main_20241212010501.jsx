import React from 'react';
import { use}
import About from '../About/About';
import './Main.css';

function Main({ handleRegistrationClick }) {
  const [showAbout, setShowAbout] = useState(false);

  const handleGetStartedClick = () => {
    setShowAbout(true);
  };
  return (
    <main>
      <section className="welcome__section">
        <div className="welcome__title-container">
          <h1 className="welcome__title">Your personal medical<br />care assistant</h1>
          <p className="welcome__text">
            Empowering Care, Simplifying Lives.
          </p>
          <div className="welcome__button-container">
            <button className="welcome__button" onClick={handleRegistrationClick}>Get started</button>
            <button className="welcome__button" onClick={handleGetStartedClick}>Learn more</button>
            {showAbout && (
              <About handleRegistrationClick={handleRegistrationClick} />
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Main;


