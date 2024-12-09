import Shoulder from '../../assets/Shoulder.svg'
import './Header.css';

function Header({ handleLoginClick, isLoggedIn }) {
  return (
    <header className="header">
      <div className="header__logo-container">
        <img className="header__logo" src={Shoulder} alt="MyCareShoulder" />
        <h1 className="header__title">
          MyCareAssist
        </h1>
      </div>

      {/* {!isLoggedIn && (  // Only show if not logged in
        <button 
          type="button" 
          onClick={handleLoginClick}
          className="header__button"
        >
          Login
        </button>
      )} */}


      <div className="header__auth-container">
        <button className="header__login-btn" onClick={handleLoginClick}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </header>
  );
};

export default Header;