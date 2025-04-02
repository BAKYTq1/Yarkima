import React from 'react'
import './Trust.scss'
import vk from '../../assets/image/vk.png'
import bank from '../../assets/image/sberBank.png'
import yandex from '../../assets/image/yandex.png'
import skillbox from '../../assets/image/skillbox.png'


function Trust() {
  return (
    <>
        <section className='site'>
          <h1>Нам доверяют</h1>
          <div className='all-figure'>
          <div className='figure'>
            <img id='first-i' src={vk} alt="" />
          </div>
          <div className='figure'>
            <img id='second-i' src={bank} alt="" />
          </div>
          <div className='figure'>
            <img id='third-i' src={yandex} alt="" />
          </div>
          <div className='figure'>
            <img id='fourth-i' src={skillbox} alt="" />
          </div>
          </div>
        </section>

    </>
  )
}

export default Trust