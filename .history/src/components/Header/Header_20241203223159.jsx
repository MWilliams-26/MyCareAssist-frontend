import Shoulder from '../../assets/Shoulder.svg'
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__logo-container"
      <img className="header__logo" src={Shoulder} alt="MyCareShoulder" />
      <h1 className="header__title">
        MyCareAssist
      </h1>
      <div className="header__container">
        {/* <button className="header__register-btn">
          Get Started
        </button> */}
        <button className="header__login-btn">
          Log In
        </button>
      </div>
    </header>
  );
};

export default Header;