import './Main.css';

function Main({ handleRegistrationClick }) {
  return (
    <main>
      <section className="welcome__section">
        <div className="welcome__title-container">
          <h1 className="welcome__title">Your personal medical<span>care a</span> care assistant</h1>
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
        <div className="welcome__features-container">
          <div className="welcome__features-doctor">
            <h3 className="welcome__features-sub">Doctors</h3>
            <p className="welcome__features-text">
              Keep all your healthcare providers’ details in one place.
            </p>
          </div>
          <div className="welcome__features-emergency">
            <h3 className="welcome__features-sub">Emergency Contacts</h3>
            <p className="welcome__features-text">
              In moments of need, an emergency contacts list is a lifeline to those who care for you.
            </p>
          </div>
          <div className="welcome__features-calendar">
            <h3 className="welcome__features-sub">Calendar</h3>
            <p className="welcome__features-text">
              Stay on top of your day with a calendar that ensures you never miss appointments, tasks, or important events.
            </p>
          </div>
          <div className="welcome__features-medication">
            <h3 className="welcome__features-sub">Medication</h3>
            <p className="welcome__features-text">
              Know exactly what you’re taking with a clear list of medications, dosages, and schedules.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Main;


