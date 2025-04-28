import { auth } from "../../firebase"; // путь до firebase.js
import React, { useState, useEffect } from "react";
import "./Header.scss";
import Logo from "../../assets/svg/logo.svg";
import LogoText from "../../assets/image/logoText.png";
import { CiSearch } from "react-icons/ci";
import { FaGripLines } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
// import { auth } from "../../firebase"; 
// import { auth } from "../../firebase"; 
// import plus from "../../assets/svg/plus.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="header">
      <div className="box">
        <Link to="/">
          <div className="logo">
            <img src={Logo} alt="logo" />
            <img className="logoText" src={LogoText} alt="logo text" />
          </div>
        </Link>
     <Link to="Detailkyrs">
        <button className="dropdown99">ИЗУЧИТЬ 🔻</button>
    </Link>

        <div className="search">
          <span className="icon"><CiSearch /></span>
          <input type="text" placeholder="Поиск" />
        </div>

        <div className="auth-buttons">
          {user ? (
            <>
              <Link to="/personal">
              <img 
                src={user.photoURL || "https://via.placeholder.com/32"} 
                alt="user" 
                className="user-photo" 
              />
                </Link>
            </>

          ) : (
            <>
              <Link to="/login"><button className="login">ВОЙТИ</button></Link>
              <Link to="/register"><button className="register">ЗАРЕГИСТРИРОВАТЬСЯ</button></Link>
            </>
          )}
          <span className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <FaGripLines />
          </span>
        </div>
      </div>

      <div className={`dropdown-menuu ${menuOpen ? "open" : ""}`}>
        <button className="closee-btn" onClick={() => setMenuOpen(false)}>
          <IoMdClose />
        </button>
        <nav>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>ГЛАВНАЯ</Link></li>
            <li><Link to="/catalog" onClick={() => setMenuOpen(false)}>КАТАЛОГ</Link></li>
            <li><Link to="/FAQ" onClick={() => setMenuOpen(false)}>F.A.Q</Link></li>
            <li><Link to="/partners" onClick={() => setMenuOpen(false)}>ПАРТНЕРАМ</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
