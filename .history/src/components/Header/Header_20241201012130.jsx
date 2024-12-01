import logo from "../../assets/logo.svg"

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="logo" />
      <div className="header__auth-container">
        <button className="header__register"
      </div>
    </header>
    );
};

export default Header;