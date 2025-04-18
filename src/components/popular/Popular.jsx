import React, { useState } from 'react'

// import sword from "../../assets/svg/sword.svg"
// import vector from "../../assets/svg/vector.svg"
// import "./popular.css"
// import { katalog } from '../../data/katalog'
// import kub from "../../assets/svg/kub.svg"
// import six from "../../assets/svg/six.svg"
import back from "../../assets/image/back.png"

import sword from "../../assets/svg/sword.svg"
import vector from "../../assets/svg/vector.svg"
import "./popular.css"
import { katalog } from '../data/katalog.js'
import kub from "../../assets/svg/kub.svg"
import six from "../../assets/svg/six.svg"
import popular from "../../assets/image/color.png"
import './popular.css'
import { useOutSideClick } from '../../hooks/outsideclick.js';
import square from '../../assets/svg/square.svg'
import hicon from "../../assets/svg/hicon.svg"


function Popular() {
  const [popup, setPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState();
  const [index, setIndex] = useState(false);
  const [indexType, setIndexType] = useState();
  const ref = useOutSideClick(() => setPopup(fals))
  const refIndex = useOutSideClick(() => setPopupIndex(false))
  const filter = ["Самые популярные", "Самые дешевые"];

  const type = ["Тип", "Тип-1"];

  const handleIndex = (event) => {
    const selectIndex = Number(event.currentTarget.dataset.index);
    setIndex(selectIndex);
    setPopup(false)
  };

  const handleIndexType = (event) => {
    const selectIndex = Number(event.currentTarget.dataset.index);
    setIndexType(selectIndex);
    setPopupIndex(false)
  };


  const handlePopup = () => {
    setPopup(true ? true : false);
    
  };

  const handlePopupType = () => {
    setPopupIndex(true);
  };
  return (
    <div className='category '>
      <h1>КАТЕГОРИИ</h1>
      <div className='populars'>

        <img className='gradient' src={back} alt="" />


        <h2>ПОПУПЛЯРНЫЕ КАТЕГОРИИ</h2>
        <div className='popular-flex'>
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
          <a href="/language"><div className='popularies'>
            <div className='popular-first'>
              <img src={sword} alt="" />
              <div className='small'>
                <img className='vector' src={vector} alt="" />
                <p>32 курса</p>
              </div>
            </div>

            <div className='popular-second'>
              <a href='/language'><button>Языки</button></a>
              <button>Общение</button>
            </div>

            <div className='popular-three'>
              <h3>Языки</h3>
              <p>Спонтанные озарения, инсайты, структурирование информации, потен...</p>
            </div>
          </div></a>
          <div className='popularies'>
            <div className='popular-first'>
              <img src={sword} alt="" />
              <div className='small'>
                <img className='vector' src={vector} alt="" />
                <p>12 курсов</p>
              </div>
            </div>

            <div className='popular-second'>
              <button>Душа</button>
              <button>Личность</button>
              <button>Характер</button>
            </div>

            <div className='popular-three'>
              <h3>Провокация</h3>
              <p>Провокация людей для усиления их эмоциональных событий. В случае, если...</p>
            </div>
          </div>
        </div>

      </div>


      <div className='flex'>
        <div className='modals'>
          <div className='container'>
            <div className='modals__first'>
              <div className="dropdown-main">
                <div className="dropdown">
                  <button className="dropdown-text" onClick={handlePopup}>
                    {filter[index ?? 0]}
                    <svg width="11.507812" height="6.500000" viewBox="0 0 11.5078 6.5" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <desc>
                        Created with Pixso.
                      </desc>
                      <defs />
                      <path id="Vector" d="M10.75 0.75L5.75 5.75L0.75 0.75" stroke="#191A26" stroke-opacity="1.000000" stroke-width="1.500000" stroke-linejoin="round" stroke-linecap="round" />
                    </svg>

                  </button>
                </div>
                {popup && (
                  <div className="dropdown-popup" ref={ref}>
                    {filter.map((el, idx) => (
                      <button key={idx} data-index={idx} onClick={handleIndex}>
                        {el}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="dropdown-type">
                <div className="type">
                  <button className="dropdown-text" onClick={handlePopupType}>
                    {type[indexType ?? 0]}
                    <svg width="11.507812" height="6.500000" viewBox="0 0 11.5078 6.5" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <desc>
                        Created with Pixso.
                      </desc>
                      <defs />
                      <path id="Vector" d="M10.75 0.75L5.75 5.75L0.75 0.75" stroke="#191A26" stroke-opacity="1.000000" stroke-width="1.500000" stroke-linejoin="round" stroke-linecap="round" />
                    </svg>

                  </button>
                </div>
                {popupIndex && (
                  <div className="dropdown-popup-type" ref={refIndex}>
                    {type.map((el, idx) => (
                      <button key={idx} data-index={idx} onClick={handleIndexType}>
                        {el}
                      </button>
                    ))}
                  </div>
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

      <div className='grid container'>
        {katalog.map((item) => (
          <div className='popular '>
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


  )
}

export default Popular
