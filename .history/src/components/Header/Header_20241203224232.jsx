import Shoulder from '../../assets/Shoulder.svg'
import './Header.css';

function Header({ handleRegistrationClick, handleLoginClick }) {
  return (
    <header className="header">
      <div className="header__logo-container">
        <img className="header__logo" src={Shoulder} alt="MyCareShoulder" />
        <h1 className="header__title">
          MyCareAssist
        </h1>
      </div>
      <div className="header__user-container">
        <button className="header__login-btn" onClick={handleRegistrationClick}>
          Log In
        </button>
      </div>
    </header>
  );
};

export default Header;