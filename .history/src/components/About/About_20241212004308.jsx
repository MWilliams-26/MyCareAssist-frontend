import React from 'react';

function About({ handleRegistrationClick }) {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the About page where you can describe your app and its purpose.</p>
      <button onClick={handleRegistrationClick}>Get started</button>

    </div>
  );
}

export default About;

// 