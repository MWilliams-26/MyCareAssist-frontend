import './Main.css';

function Main() {
  return (
    <main>
      <section className="welcome__section">
        <h1 className="welcome__title">Your personal medical care assistant</h1>
        <p className="welcome__text">
        We are a team of professionals who are ready to help you with your health.
        </p>
      </section>
      <section className="welcome__features">
      <h2 className="welcome__features-title">Features</h2>
        <div className="welcome__features-container">
          <div className="welcome__features-doctor">
            <h3 className="welcome__features-title">Doctor</h3>
          </div>
          <div className="welcome__features-emergency">
            <h3 className="welcome__features-title">Emergency Contacts</h3>
          </div>
          <div className="welcome__features-calendar">
            <h3 className="welcome__features-title">Schedule</h3>
          </div>
          <div className="welcome__features-medication"></div>
        </div>
      </section>
    </main>
  )
}

export default Main;