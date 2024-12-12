import React from 'react';
import { useNavigate } from 'react-router-dom';
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
          
        </div>
      </section>
    </main>
  )
}

export default Main;


