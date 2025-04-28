import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'
function Block1() {
  return (
    <div className='block1'>
        <div className='block1-cart'>
        </div>
        <div className='block1-cart2'>
        </div>
        <div className='block1-cart3'>
        </div>
        <div className='block1-cart4'>
        </div>
        <div className='block1-cart5'>
        </div>
        <div className='block1-cart6'>
        </div>
        <div className='block1-cart7'>
        </div>
      <div className='block1-item'>
         <h1>Легко осваивайте сложные <br /> предметы с помощью <br /> карточек и тестов</h1>
         <p>Присоединяйтесь к ученикам по всему миру, которые используют <br /> карточки, основанные на научных принципах, чтобы достигать своих <br /> целей в школе, университете и за их пределами.</p>
        <Link to={'createcurs'}><button>НАЧАТЬ БЕСПЛАТНО</button></Link>
      </div>
    </div>
  )
}

export default Block1
