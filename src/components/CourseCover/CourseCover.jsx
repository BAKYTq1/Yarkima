import React from "react";
import { Down1 } from "./Down1/Down1";
import { Plus } from "./Plus/index";
import { Remove1 } from "./Remove1/index";
import { Settings } from "./Settings/index";
import "./CourseCover.css";

const CourseCover = () => {
  return (
    <div className="frame container">
      <div className="div">
        <div className="text-wrapper">СОЗДАТЬ НОВЫЙ КУРС</div>

        <div className="div-2">
          <button className="button">
            <div className="text-wrapper-2">СОЗДАТЬ</div>
          </button>

          <div className="settings-wrapper">
            <Settings className="settings-instance" />
          </div>
        </div>
      </div>

      <div className="div-3">
        <div className="group">
          <div className="overlap-group">
            <div className="div-4">
              <div className="text-wrapper-3">ОБЛОЖКА КУРСА</div>

              <div className="div-5">
                <div className="FIELD-NAME">Изображение</div>

                <div className="FIELD-NAME-2">Макс. размер 10 мб</div>
              </div>

              <button className="button-2">
                <div className="text-wrapper-4">ДОБАВИТЬ</div>
              </button>
            </div>
          </div>
        </div>

        <div className="group">
          <div className="overlap-group">
            <div className="div-6">
              <div className="text-wrapper-3">ДОБАВЬТЕ РУБАШКУ</div>

              <div className="div-5">
                <div className="FIELD-NAME">Изображение или видео</div>

                <p className="FIELD-NAME-2">
                  Макс. размер 10 мб и продолжительность 15 с.
                </p>
              </div>

              <button className="button-2">
                <div className="text-wrapper-4">ДОБАВИТЬ</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="div-7">
        <div className="field">
          <div className="FIELD-NAME-3">Название курса</div>
        </div>

        <div className="field-2">
          <div className="FIELD-NAME-4">Описание</div>

          <div className="TEXT">
            <p className="TEXT-2">
              Английский язык - мировой язык, используется в качестве
              универсального языка
            </p>
          </div>
        </div>

        <div className="div-8">
          <div className="dropdown">
            <div className="div-9">
              <div className="NAME">Категория</div>

              <div className="TEXT-3">Языки</div>
            </div>

            <Down1 className="down" />
          </div>

          <div className="dropdown">
            <div className="div-9">
              <div className="NAME">Тип курса</div>

              <div className="TEXT-3">Тест</div>
            </div>

            <Down1 className="down" />
          </div>
        </div>
      </div>

      <div className="div-10">
        <div className="view">
          <div className="div-11">
            <div className="FIELD-NAME-5">1</div>

            <div className="div-12">
              <img
                className="img"
                alt="Frame"
                src="https://c.animaapp.com/m8x1txhjYL67TX/img/frame-7.svg"
              />

              <div className="rectangle-wrapper">
                <div className="rectangle" />
              </div>

              <img
                className="img"
                alt="Frame"
                src="https://c.animaapp.com/m8x1txhjYL67TX/img/frame-2.svg"
              />

              <Remove1 className="img" />
            </div>

            <div className="div-13">
              <img
                className="img-2"
                alt="Frame"
                src="https://c.animaapp.com/m8x1txhjYL67TX/img/frame-3.svg"
              />

              <img
                className="img-2"
                alt="Frame"
                src="https://c.animaapp.com/m8x1txhjYL67TX/img/frame.svg"
              />
            </div>
          </div>

          <div className="div-8">
            <div className="div-14">
              <div className="field-3">
                <div className="FIELD-NAME-2">Термин</div>

                <div className="TEXT">
                  <div className="TEXT-2">Milk</div>
                </div>
              </div>

              <button className="div-wrapper">
                <div className="text-wrapper-5">АНГЛИЙСКИЙ</div>
              </button>
            </div>

            <div className="div-14">
              <div className="field-3">
                <div className="FIELD-NAME-2">Определение</div>

                <div className="TEXT">
                  <div className="TEXT-2">Молоко</div>
                </div>
              </div>

              <button className="div-wrapper">
                <div className="text-wrapper-5">РУССКИЙ</div>
              </button>
            </div>

            <div className="frame-wrapper">
              <img
                className="img-2"
                alt="Frame"
                src="https://c.animaapp.com/m8x1txhjYL67TX/img/frame.svg"
              />
            </div>
          </div>

          <div className="div-15">
            <div className="div-16">
              <div className="text-wrapper-6">
                Варианты ответов для тестирования
              </div>

              <Remove1 className="img-2" />
            </div>

            <div className="div-17">
              <div className="div-18">
                <div className="text-wrapper-7">Кол-во вариантов</div>

                <div className="dropdown-2">
                  <div className="text-wrapper-4">4</div>

                  <Down1 className="down" />
                </div>
              </div>

              <div className="div-19">
                <div className="view-2">
                  <div className="text-wrapper-8">Молоко</div>

                  <div className="overlap-group-wrapper">
                    <div className="overlap-group-2">
                      <img
                        className="avatar"
                        alt="Avatar"
                        src="https://c.animaapp.com/m8x1txhjYL67TX/img/avatar.svg"
                      />

                      <div className="text-wrapper-9">1</div>
                    </div>
                  </div>
                </div>

                <div className="view-2">
                  <div className="text-wrapper-8">Корова</div>

                  <div className="overlap-group-wrapper">
                    <div className="overlap-group-2">
                      <img
                        className="avatar"
                        alt="Avatar"
                        src="https://c.animaapp.com/m8x1txhjYL67TX/img/avatar.svg"
                      />

                      <div className="text-wrapper-9">2</div>
                    </div>
                  </div>
                </div>

                <div className="view-2">
                  <div className="text-wrapper-8">Трава</div>

                  <div className="overlap-group-wrapper">
                    <div className="overlap-group-2">
                      <img
                        className="avatar"
                        alt="Avatar"
                        src="https://c.animaapp.com/m8x1txhjYL67TX/img/avatar.svg"
                      />

                      <div className="text-wrapper-9">3</div>
                    </div>
                  </div>
                </div>

                <div className="view-2">
                  <div className="text-wrapper-8">Творог</div>

                  <div className="overlap-group-wrapper">
                    <div className="overlap-group-2">
                      <img
                        className="avatar"
                        alt="Avatar"
                        src="https://c.animaapp.com/m8x1txhjYL67TX/img/avatar.svg"
                      />

                      <div className="text-wrapper-9">4</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="view">
          <div className="div-11">
            <div className="FIELD-NAME-5">2</div>

            <img
              className="img-2"
              alt="Frame"
              src="https://c.animaapp.com/m8x1txhjYL67TX/img/frame-1.svg"
            />

            <div className="div-13">
              <img
                className="img-2"
                alt="Frame"
                src="https://c.animaapp.com/m8x1txhjYL67TX/img/frame-3.svg"
              />

              <img
                className="img-2"
                alt="Frame"
                src="https://c.animaapp.com/m8x1txhjYL67TX/img/frame.svg"
              />
            </div>
          </div>

          <div className="div-8">
            <div className="div-14">
              <div className="field">
                <div className="FIELD-NAME-3">Термин</div>
              </div>

              <button className="div-wrapper">
                <div className="text-wrapper-10">ЯЗЫК</div>
              </button>
            </div>

            <div className="div-14">
              <div className="field">
                <div className="FIELD-NAME-3">Определение</div>
              </div>

              <button className="div-wrapper">
                <div className="text-wrapper-10">ЯЗЫК</div>
              </button>
            </div>

            <div className="div-20">
              <Plus className="plus-instance" />
              <div className="div-21">
                <div className="FIELD-NAME-6">Изображение или видео</div>

                <p className="FIELD-NAME-2">до 10 мб и 15 с.</p>
              </div>
            </div>
          </div>

          <div className="button-3">
            <Plus className="img-33" />
            <div className="text-wrapper-4">ДОБАВИТЬ ВАРИАНТЫ ОТВЕТА</div>
          </div>
        </div>

        <div className="button-4">
          <Plus className="img-33" />
          <div className="text-wrapper-11">ДОБАВИТЬ КАРТОЧКУ</div>
        </div>
      </div>

      <button className="button-5">
        <div className="text-wrapper-2">СОЗДАТЬ</div>
      </button>
    </div>
  );
};

export default CourseCover


