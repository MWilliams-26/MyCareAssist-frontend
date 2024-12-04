import Shoulder from '../../assets/Shoulder.svg'
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__tab-container">
      <img className="header__logo" src={Shoulder} alt="MyCareShoulder" />
      <h1 className="header__title">
        MyCareAssist
      </h1>
      </div>
      <div className="header__user-container">
        <button className="header__login-btn">
          Log In
        </button>
      </div>
    </header>
  );
};

export default Header;