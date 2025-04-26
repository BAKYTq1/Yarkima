import React from 'react'
import { SlArrowLeft } from "react-icons/sl";
import { SlOptions } from "react-icons/sl";

import "./Usershow.css"


function Usershow() {
  return (
    <div>
      <div className="div">
      <div className="frame-16">
        <div className="frame-17">
          <button className="button-4">
            <div className="text-wrapper-17">ПУБЛИЧНЫЙ ПРОФИЛЬ</div>
          </button>

          <div className="text-wrapper-18">/</div>

          <button className="button-4">
            <div className="text-wrapper-17">ЛИЦЕВОЙ СЧЕТ</div>
          </button>
        </div>

        <div className="frame-18">
          <div className="arrow-left-wrapper">
          <SlArrowLeft className="arrow-left" />
          </div>

          <div className="text-wrapper-19">ЛИЦЕВОЙ СЧЕТ</div>
        </div>
      </div>
    </div>
    <div className="frame">
      <div className="TEXT">Баланс:</div>

      <div className="div-2">
        <div className="text-wrapper">4 323 ₽</div>

        <button className="button">
          <div className="div-3">
            <div className="text-wrapper-2">ПОПОЛНИТЬ</div>
          </div>
        </button>
      </div>
    </div>
    <div className="frame-wrapper">
      <div className="frame-2">
        <div className="text-wrapper-3">Подписка на курс</div>

        <div className="text-wrapper-4">08.03.2024</div>

        <div className="frame-3">
          <img
            className="img"
            alt="Frame"
            src="https://c.animaapp.com/m9ybgh4velT2tC/img/frame-1948758041.svg"
          />

          <div className="text-wrapper-5">5542</div>
        </div>

        <div className="frame-4">
          <div className="text-wrapper-6">-299 ₽</div>

          <div className="more-wrapper">
            <SlOptions className="more" />
          </div>
        </div>
      </div>

      <img
        className="line"
        alt="Line"
        src="https://c.animaapp.com/m9ybgh4velT2tC/img/line-12.svg"
      />

      <div className="frame-2">
        <div className="text-wrapper-3">Пополнение</div>

        <div className="text-wrapper-4">08.03.2024</div>

        <div className="frame-3">
          <div className="frame-5">
            <div className="ellipse" />

            <div className="ellipse" />

            <div className="ellipse" />

            <div className="ellipse" />
          </div>

          <div className="text-wrapper-5">5542</div>
        </div>

        <div className="frame-4">
          <div className="text-wrapper-7">+2 000 ₽</div>

          <div className="more-wrapper">
            <SlOptions className="more" />
          </div>
        </div>
      </div>

      <img
        className="line"
        alt="Line"
        src="https://c.animaapp.com/m9ybgh4velT2tC/img/line-12.svg"
      />

      <div className="frame-2">
        <div className="text-wrapper-3">Идентификатор пользователя</div>

        <div className="text-wrapper-4">08.03.2024</div>

        <div className="frame-3">
          <div className="frame-5">
            <div className="ellipse" />

            <div className="ellipse" />

            <div className="ellipse" />

            <div className="ellipse" />
          </div>

          <div className="text-wrapper-5">5542</div>
        </div>

        <div className="frame-4">
          <div className="text-wrapper-6">-299 ₽</div>

          <div className="more-wrapper">
            <SlOptions className="more" />
          </div>
        </div>
      </div>

      <img
        className="line"
        alt="Line"
        src="https://c.animaapp.com/m9ybgh4velT2tC/img/line-12.svg"
      />

      <div className="frame-2">
        <div className="text-wrapper-3">Подписка на курс</div>

        <div className="text-wrapper-4">08.03.2024</div>

        <div className="frame-3">
          <div className="frame-5">
            <div className="ellipse" />

            <div className="ellipse" />

            <div className="ellipse" />

            <div className="ellipse" />
          </div>

          <div className="text-wrapper-5">5542</div>
        </div>

        <div className="frame-4">
          <div className="text-wrapper-6">-299 ₽</div>

          <div className="more-wrapper">
            <SlOptions className="more" />
          </div>
        </div>
      </div>

      <img
        className="line"
        alt="Line"
        src="https://c.animaapp.com/m9ybgh4velT2tC/img/line-12.svg"
      />

      <div className="frame-2">
        <div className="text-wrapper-3">Подписка на курс</div>

        <div className="text-wrapper-4">08.03.2024</div>

        <div className="frame-3">
          <div className="frame-5">
            <div className="ellipse" />

            <div className="ellipse" />

            <div className="ellipse" />

            <div className="ellipse" />
          </div>

          <div className="text-wrapper-5">5542</div>
        </div>

        <div className="frame-4">
          <div className="text-wrapper-6">-299 ₽</div>

          <div className="more-wrapper">
            <SlOptions className="more" />
          </div>
        </div>
      </div>

      <button className="button-2">
        <div className="text-wrapper-8">ПОКАЗАТЬ ЕЩЕ</div>
      </button>
    </div>
    </div>
  )
}

export default Usershow
