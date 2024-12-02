import logoNoBackGround from "../../assets/logoNoBackGround.svg"
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__">
          MyCareAssist
        </h1>

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