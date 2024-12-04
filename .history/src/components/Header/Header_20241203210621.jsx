import MyCareShoulder from '../../assets/MyCareShoulder.png';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img src={MyCareShoulder} alt="MyCareShoulder"  />
        <h1 className="header__title">
          MyCareAssist
        </h1>
        <div className="header__tab-container">
          <button className="header__profile-btn">
            MyCarePage
          </button>
          <button className="header__emergency-btn">
            MyEmergency Contacts
          </button>
          <button className="header__doctors-btn">
            MyDoctors
          </button>
          <button className="header__calendar-btn">
            MyCalendar
          </button>
        </div>
        <button className="header__register-btn">
          Sign Up
        </button>
        <button className="header__login-btn">
          Log In
        </button>
      </div>
    </header>
  );
};

export default Header;