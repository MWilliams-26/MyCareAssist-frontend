import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNotesMedical, faUserDoctor, faHeart } from '@fortawesome/free-solid-svg-icons';
import './Main.css';

function Main() {
  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/about');
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
            <button className="welcome__button" onClick={handleLearnMoreClick}>Learn more</button>
          </div>
          <ul className="welcome__benefits">
          <li>
              <FontAwesomeIcon icon={faNotesMedical} className="welcome__icon" />
              Organize and track medical information
            </li>
            <li>
              <FontAwesomeIcon icon={faUserDoctor} className="welcome__icon" />
              Manage emergency contacts and doctors
            </li>
            <li>
              <FontAwesomeIcon icon={faHeart} className="welcome__icon" />
              Simplify caregiving with personalized tools
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Main;


