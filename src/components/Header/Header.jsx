import React, { useState } from "react";
import "./Header.scss";
import Logo from "../../assets/image/logo.png";
import LogoText from "../../assets/image/logoText.png";
import { CiSearch } from "react-icons/ci";
import { FaGripLines } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="box container">
          {/* Логотип */}
          <Link to={'/'}>
            <div className="logo">
              <img src={Logo} alt="logo" />
              <img className="logoText" src={LogoText} alt="logo text" />
            </div>
          </Link>

          {/* Кнопка "Изучить" */}
          <button className="dropdown99">ИЗУЧИТЬ 🔻</button>

          {/* Поиск */}
          <div className="search">
            <span className="icon"><CiSearch /></span>
            <input type="text" placeholder="Поиск" />
          </div>

          {/* Кнопки */}
          <div>
            <button className="login">ВОЙТИ</button>
            <button className="register">ЗАРЕГИСТРИРОВАТЬСЯ</button>
            <span className="menu" onClick={() => setMenuOpen(!menuOpen)}>
              <FaGripLines />
            </span>
          </div>
        </div>
      </header>

      {/* Выпадающее меню */}
      <div className={`dropdown-menu ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          <IoMdClose />
        </button>
        <nav>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>ГЛАВНАЯ</Link></li>
            <li><Link to="/catalog" onClick={() => setMenuOpen(false)}>КАТАЛОГ</Link></li>
            <li><Link to="/cases" onClick={() => setMenuOpen(false)}>КЕЙСЫ</Link></li>
            <li><Link to="FAQ" onClick={() => setMenuOpen(false)}>F.A.Q</Link></li>
            <li><Link to="/partners" onClick={() => setMenuOpen(false)}>ПАРТНЕРАМ</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
