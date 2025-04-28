import React from 'react';
import { motion } from 'framer-motion';
import './Partner.scss'; // Добавь стили для логотипов

// Логотипы партнеров
import vk from '../../assets/image/vk.png';
import bank from '../../assets/image/sberBank.png';
import yandex from '../../assets/image/yandex.png';
import skillbox from '../../assets/image/skillbox.png';

// Массив партнеров с их логотипами и ссылками
const partners = [
  { name: 'VK', logo: vk, url: 'https://www.wk.ru/' },
  { name: 'Сбербанк', logo: bank, url: 'https://www.sberbank.ru/' },
  { name: 'Яндекс', logo: yandex, url: 'https://www.yandex.ru/' },
  { name: 'Skillbox', logo: skillbox, url: 'https://skillbox.ru/' },
];

const Partners = () => {
  return (
    <section className="partners">
      <h2 className="partners-title">Наши партнеры</h2>
      <div className="partners-list">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            className={`figure figure-${index + 1}`}
            whileHover={{ scale: 1.1 }} // Анимация при наведении
            whileInView={{ opacity: 1, x: 0 }} // Анимация появления при прокрутке
            initial={{ opacity: 0, x: -100 }} // Начальная позиция и прозрачность
            transition={{ duration: 0.5, delay: index * 0.2 }} // Задержка анимации для каждого партнера
          >
            <a href={partner.url} target="_blank" rel="noopener noreferrer">
              <img
                src={partner.logo}
                alt={partner.name}
                className="partner-logo"
              />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
