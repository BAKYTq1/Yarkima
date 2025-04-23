import React, { useState } from 'react';
import sword from "../../assets/svg/sword.svg";
import vector from "../../assets/svg/vector.svg";
import "./popular.css";
import { katalog } from '../data/katalog.js';
import kub from "../../assets/svg/kub.svg";
import six from "../../assets/svg/six.svg";
import back from "../../assets/image/back.png";
import { useOutSideClick } from '../../hooks/outsideclick.js';
import { ChevronDown } from 'lucide-react';

function Popular() {
  const sortOptions = ["САМЫЕ ПОПУЛЯРНЫЕ", "НОВЕЙШИЕ", "ПО РЕЙТИНГУ"];
  const typeOptions = ["ВСЕ", "ВИДЕО", "ТЕКСТ", "ИНТЕРАКТИВ"];

  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [selectedType, setSelectedType] = useState("ТИП");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const refSort = useOutSideClick(() => setShowSortDropdown(false));
  const refType = useOutSideClick(() => setShowTypeDropdown(false));

  return (
    <div className='category'>
      <h1>КАТЕГОРИИ</h1>

      <div className='populars'>
        <img className='gradient' src={back} alt="" />
        <h2>ПОПУЛЯРНЫЕ КАТЕГОРИИ</h2>

        <div className='popular-flex'>
          {/* Пример карточек категорий */}
          <div className='popularies'>
            <div className='popular-first'>
              <img src={sword} alt="" />
              <div className='small'>
                <img className='vector' src={vector} alt="" />
                <p>21 курс</p>
              </div>
            </div>
            <div className='popular-second'>
              <button>Душа</button>
              <button>Личность</button>
              <button>Вселенная</button>
            </div>
            <div className='popular-three'>
              <h3>Воин</h3>
              <p>Борьба за смысл, снижение того, во что есть вера, устойчивость позиций своих и необходимость переход...</p>
            </div>
          </div>
          <div className='popularies'>
            <div className='popular-first'>
              <img src={sword} alt="" />
              <div className='small'>
                <img className='vector' src={vector} alt="" />
                <p>21 курс</p>
              </div>
            </div>
            <div className='popular-second'>
              <button>Душа</button>
              <button>Личность</button>
              <button>Вселенная</button>
            </div>
            <div className='popular-three'>
              <h3>Воин</h3>
              <p>Борьба за смысл, снижение того, во что есть вера, устойчивость позиций своих и необходимость переход...</p>
            </div>
          </div>
          <div className='popularies'>
            <div className='popular-first'>
              <img src={sword} alt="" />
              <div className='small'>
                <img className='vector' src={vector} alt="" />
                <p>21 курс</p>
              </div>
            </div>
            <div className='popular-second'>
              <button>Душа</button>
              <button>Личность</button>
              <button>Вселенная</button>
            </div>
            <div className='popular-three'>
              <h3>Воин</h3>
              <p>Борьба за смысл, снижение того, во что есть вера, устойчивость позиций своих и необходимость переход...</p>
            </div>
          </div>
          {/* Добавь другие блоки по аналогии */}
        </div>
      </div>

      {/* Фильтры */}
      <div className='flex'>
        <div className='modals'>
          <div className='container'>
            <div className='modals__first'>
              <div className="dropdown-filters">
                <div className="dropdown-wrapper" ref={refSort}>
                  <button
                    className="dropdown-button"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    {selectedSort}
                    <ChevronDown size={16} />
                  </button>
                  {showSortDropdown && (
                    <ul className="dropdown-menu">
                      {sortOptions.map((option) => (
                        <li
                          key={option}
                          onClick={() => {
                            setSelectedSort(option);
                            setShowSortDropdown(false);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="dropdown-wrapper" ref={refType}>
                  <button
                    className="dropdown-button"
                    onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                  >
                    {selectedType}
                    <ChevronDown size={16} />
                  </button>
                  {showTypeDropdown && (
                    <ul className="dropdown-menu">
                      {typeOptions.map((option) => (
                        <li
                          key={option}
                          onClick={() => {
                            setSelectedType(option);
                            setShowTypeDropdown(false);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className='popular-btn'>
                <img src={kub} alt="" />
                <a href="/service"><img src={six} alt="" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Сетка карточек */}
      <div className='grid container'>
        {katalog.map((item, idx) => (
          <div className='popular' key={idx}>
            <div className='popular-first'>
              <img src={sword} alt="" />
              <div className='small'>
                <img className='vector' src={vector} alt="" />
                <p>{item.kurs}</p>
              </div>
            </div>

            <div className='popular-second'>
              <button>Душа</button>
              <button>Личность</button>
              <button>Вселенная</button>
            </div>

            <div className='popular-three'>
              <h3>{item.ASD}</h3>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='bottomLine'></div>
    </div>
  );
}

export default Popular;
