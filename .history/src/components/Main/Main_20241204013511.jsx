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
            <h3 className="welcome__features-sub">Doctor</h3>
            <p className="welcome__features-text">
            Keep all your healthcare providers’ details in one place with a digital doctor’s list. Include names, specialties, contacts, and notes like insurance or office hours. Stay organized and prepared for emergencies or care coordination.
            </p>
          </div>
          <div className="welcome__features-emergency">
            <h3 className="welcome__features-sub">Emergency Contacts</h3>
            <p className="welcome__features-text">
            In moments of need, an emergency contacts list is a lifeline to those who care for you. With trusted names and details at hand, you’re never alone in a crisis, knowing help is always within reach.
            </p>
          </div>
          <div className="welcome__features-calendar">
            <h3 className="welcome__features-sub">Schedule</h3>
            <p className="welcome__features-text">
            Stay on top of your day with a calendar that ensures you never miss appointments, tasks, or important events, keeping you organized and stress-free.
            </p>
          </div>
          <div className="welcome__features-medication">
            <h3 className="welcome__features-sub">Medication</h3>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Main;