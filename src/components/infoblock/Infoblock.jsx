import React from 'react'
import { Link } from 'react-router-dom'

function Infoblock() {
  return (
    <div>
           <div className='info__ul'>
                      <Link to={'/infoblock'}><button>Основная информация</button></Link>
                      <Link to="addinfo"><button>Дополнительная информация</button></Link>
                      <Link to={'socialNetwork'}><button>Социальные сети</button></Link> 
                      <Link to={'accountbalance'}><button>Лицевой счет</button></Link>
                      <Link to="public"><button>История заказов</button></Link>
                      <Link to={'/personal'}><button className='info__red'>Выйти</button></Link>
                  </div>
    </div>
  )
}

export default Infoblock
