import React from 'react'
import './Author.css'
import author1 from '../../assets/image/author1.png'
import author2 from '../../assets/image/author2.png'
import author3 from '../../assets/image/author3.png'


function Author() {
  return (
    <>
        <section className='author'>
            <h1>Лучшие авторы</h1>
            <div className='all-author'>
            <div className='author-p'>
                <div className='about-author'>
                    <img src={author1} alt="" />
                    <p>John Bett</p>
                </div>
                <div className='about-div'>
                    <div className='d-first'>65 тестов</div>
                    <div className='d-second'>1 курс</div>
                </div>
            </div>
            <div className='author-p'>
                <div className='about-author'>
                    <img src={author2} alt="" />
                    <p>Ban Tomas</p>
                </div>
                <div className='about-div'>
                    <div className='d-first'>61 тестов</div>
                    <div className='d-second'>2 курс</div>
                </div>
            </div>
            <div className='author-p'>
                <div className='about-author'>
                    <img src={author3} alt="" />
                    <p>Ryder Pask</p>
                </div>
                <div className='about-div'>
                    <div className='d-first'>125 тестов</div>
                </div>
            </div>
            </div>
        </section>
    </>
  )
}

export default Author
