import logoNoBackGround from "../../assets/logoNoBackGround.svg"
import './Header.css';

function Header() {
  return (
    <header className="header">
        <img className="header__logo" src={logoNoBackGround} alt="logo" />
      </div>
      <div className="header__auth-container">
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