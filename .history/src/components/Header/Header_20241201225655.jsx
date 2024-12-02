import logo from "../../assets/logo.svg"

function Header() {
  return (
    <header className="header">
      <div className="header__logo-container">
        <img className="header__logo" src={logo} alt="logo" />
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