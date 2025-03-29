import React from "react";
import "./Header.scss";
import Logo from "../../assets/image/logo.png"
import LogoText from "../../assets/image/logoText.png"
import { CiSearch } from "react-icons/ci";
import { FaGripLines } from "react-icons/fa";




const Header = () => {
  return (
    <header className="header container">
      <div className="box container">
        {/* Логотип */}
        <div className="logo">
          <img src={Logo} alt="" />
          <img className="logoText" src={LogoText} alt="" />
        </div>

        {/* Кнопка "Изучить" */}
        <button className="dropdown">ИЗУЧИТЬ</button>

        {/* Поиск */}
        <div className="search">
          <span className="icon"><CiSearch /></span>
          <input type="text" placeholder="Поиск" />
        </div>

        {/* Кнопки */}
        <div>
        <button className="login">ВОЙТИ</button>
        <button className="register">ЗАРЕГИСТРИРОВАТЬСЯ</button>
        <span className="menu">
        <FaGripLines /></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
