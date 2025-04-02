import React from 'react'
import './Recommendation.css'
import people1 from '../../assets/image/people1.png'
import people2 from '../../assets/image/people2.png'
import people3 from '../../assets/image/people3.png'
import star from '../../assets/svg/star.svg'

function Recommendation() {
  return (
    <>
        <section className='recommendation'>
        <h1>Рекомендуем</h1>
        <div className='recommendation-about'>
            <div className='about-p'>
                <div className='profile-about'>
                    <img src={people1} alt="" />
                    <h3>gingerbread</h3>
                </div>
                <div className='card'>
                    <div className='card-first'>
                        <h2>32 карточки</h2>
                    </div>
                    <div className='card-second'>
                        <img src={star} alt="" />
                        <h4>4.9</h4>
                        <p>(24)</p>
                    </div>
                </div>
                <h1>Личностный рост</h1>
            </div>
            <div className='about-p'>
                <div className='profile-about'>
                    <img src={people2} alt="" />
                    <h3>mercoly12</h3>
                </div>
                <div className='card'>
                    <div className='card-first'>
                        <h2>32 карточки</h2>
                    </div>
                    <div className='card-second'>
                        <img src={star} alt="" />
                        <h4>4.9</h4>
                        <p>(24)</p>
                    </div>
                </div>
                <h1> Русский язык</h1>
            </div>
            <div className='about-p'>
                <div className='profile-about'>
                    <img src={people3} alt="" />
                    <h3>friedgie</h3>
                </div>
                <div className='card'>
                    <div className='card-first'>
                        <h2>32 карточки</h2>
                    </div>
                    <div className='card-second'>
                        <img src={star} alt="" />
                        <h4>4.9</h4>
                        <p>(24)</p>
                    </div>
                </div>
                <h1>Информатика</h1>
            </div>
        </div>
        
    </section>
    </>
  )
}

export default Recommendation
