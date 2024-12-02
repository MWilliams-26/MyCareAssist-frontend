import logoNoBackGround from "../../assets/logoNoBackGround.svg"
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo-container">
          <h1 className="header__logo">
            MyCareAssist
          </h1>
        </div>
        <button className="header__profile-btn">
          MyCarePage
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