import { auth } from "../../firebase"; // путь до firebase.js
import React, { useState, useEffect } from "react";
import "./Header.scss";
import Logo from "../../assets/svg/logo.svg";
import LogoText from "../../assets/image/logoText.png";
import { CiSearch } from "react-icons/ci";
import { FaGripLines } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import plus from "../../assets/svg/plus.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Для хранения значения в input
  const [filteredResults, setFilteredResults] = useState([]); // Для хранения результатов поиска

  // Пример списка курсов, по которому будет происходить поиск
  const courses = [
    { id: 1, title: "React для начинающих" },
    { id: 2, title: "JavaScript для веб-разработчиков" },
    { id: 3, title: "Python для аналитиков" },
    // Добавьте другие курсы
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Логика фильтрации на основе поиска
    if (searchQuery) {
      const results = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery]); // Срабатывает, когда searchQuery меняется

  return (
    <header className="header">
      <div className="box">
        <Link to="/">
          <div className="logo">
            <img src={Logo} alt="logo" />
            <img className="logoText" src={LogoText} alt="logo text" />
          </div>
        </Link>
        <div className="search">
          <span className="icon">
            <CiSearch />
          </span>
          <input
            type="text"
            placeholder="Поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Обновление searchQuery
          />
          {searchQuery && (
            <div className="search-results">
              {filteredResults.length > 0 ? (
                filteredResults.map((course) => (
                  <div key={course.id} className="search-result">
                    <Link to={`/course/${course.id}`}>{course.title}</Link>
                  </div>
                ))
              ) : (
                <p>Ничего не найдено</p>
              )}
            </div>
          )}
        </div>

        <div className="auth-buttons">
          {user ? (
            <>
              <Link to={'/createcurs'}>
                <img className="plus" src={plus} alt="" />
              </Link>
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
