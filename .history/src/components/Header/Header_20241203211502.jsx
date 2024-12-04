import MyCareShoulder from '../../assets/MyCareShoulder.png';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src={MyCareShoulder} alt="MyCareShoulder" />
        <h1 className="header__title">
          MyCareAssist
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