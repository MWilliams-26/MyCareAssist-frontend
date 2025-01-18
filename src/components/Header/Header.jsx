import Shoulder from '../../assets/Shoulder.svg'
import './Header.css';

function Header({ handleLoginClick, isLoggedIn, handleLogout }) {
  console.log('Header isLoggedIn:', isLoggedIn); 

  return (
    <header className="header">
      <div className="header__logo-container">
        <img className="header__logo" src={Shoulder} alt="MyCareShoulder" />
        <h1 className="header__title">
          MyCareAssist
        </h1>
      </div>

      {!isLoggedIn ? (
        <button 
          type="button" 
          onClick={handleLoginClick}
          className="header__login-btn"
        >
          Login
        </button>
      ) : (
        <button 
          type="button" 
          onClick={handleLogout}
          className="header__logout-btn"
        >
          Logout
        </button>
      )}


      {/* <div className="header__auth-container">
        <button className="header__login-btn" onClick={handleLoginClick}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div> */}
    </header>
  );
};

export default Header;