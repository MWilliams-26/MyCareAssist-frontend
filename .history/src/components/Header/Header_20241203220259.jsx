import Shoulder from '../../assets/Shoulder.svg'
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={Shoulder} alt="MyCareShoulder" />
      <div className="header__container">
        <h1 className="header__title">
          MyCareAssist
        </h1>
        <button className="header__register-btn">
          Get Started
        </button>
        <button className="header__login-btn">
          Log In
        </button>
      </div>
    </header>
  );
};

export default Header;