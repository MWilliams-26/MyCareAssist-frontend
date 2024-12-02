import logoNoBackGround from "../../assets/logoNoBackGround.svg"
import './Header.css';

function Header() {
  return (
    <header className="header">
    <div className="header__container">
        <h1>
          M
        </h1>
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