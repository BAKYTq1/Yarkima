import React from 'react'
import { Link } from 'react-router-dom'

function Infoblock() {
  return (
    <div>
           <div className='info__ul'>
                      <Link to={'/infoblock'}><button>Основная информация</button></Link>
                      <Link to="addinfo"><button>Дополнительная информация</button></Link>
                      <button>Социальные сети</button>
                      <button>Идентификатор пользователя</button>
                      <button>Лицевой счет</button>
                      <Link to="public"><button>История заказов</button></Link>
                      <button>Пароль</button>
                      <button className='info__red'>Выйти</button>
                  </div>
    </div>
  )
}

export default Infoblock
