import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { GiPostOffice } from "react-icons/gi";
import { RiSettings3Line } from "react-icons/ri";
import { MdSupportAgent, MdOutlinePowerSettingsNew, MdGroups2 } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

function PersonBlock() {
  const navigate = useNavigate();
  const moreButtonRef = useRef(null);
  const [activeSidebarTop, setActiveSidebarTop] = useState('personal');

  const handleSidebarTopClick = (button) => {
    setActiveSidebarTop(button);

    // Переходы по маршрутам
    if (button === 'personal') navigate('/personal');
    if (button === 'partner') navigate('/partner');
    if (button === 'supportchat') navigate('/personal/supportchat');
    if (button === 'infoblock') navigate('/infoblock');
    if (button === 'chats') navigate('/personal/chats');
    if (button === 'groups') navigate('/groups');
    if (button === 'out') console.log('Выход');
  };

  return (
    <div>
      <div className="personal__fixed">
        <div className="fixed__button1">
          <button
            className={activeSidebarTop === 'personal' ? 'active' : ''}
            onClick={() => handleSidebarTopClick('personal')}
          >
            <CgProfile /> Публичный профиль
          </button>
          <button
            className={activeSidebarTop === 'partner' ? 'active' : ''}
            onClick={() => handleSidebarTopClick('partner')}
          >
            <GiPostOffice /> Кабинет партнёра
          </button>
          <button
            ref={moreButtonRef}
            className={activeSidebarTop === 'infoblock' ? 'active' : ''}
            onClick={() => handleSidebarTopClick('infoblock')}
          >
            <RiSettings3Line /> Настройки
          </button>
          <button
            className={activeSidebarTop === 'supportchat' ? 'active' : ''}
            onClick={() => handleSidebarTopClick('supportchat')}
          >
            <MdSupportAgent /> Поддержка
          </button>
          <button
            className={activeSidebarTop === 'out' ? 'active' : ''}
            onClick={() => handleSidebarTopClick('out')}
          >
            <MdOutlinePowerSettingsNew /> Выйти
          </button>

          <p>Сообщество</p>

          <button
            className={activeSidebarTop === 'znakom' ? 'active' : ''}
            onClick={() => handleSidebarTopClick('znakom')}
          >
            <FaUserFriends /> Знакомства
          </button>
          <button
            className={activeSidebarTop === 'chats' ? 'active' : ''}
            onClick={() => handleSidebarTopClick('chats')}
          >
            <IoChatboxEllipsesOutline /> Чаты
          </button>
          <button
            className={activeSidebarTop === 'groups' ? 'active' : ''}
            onClick={() => handleSidebarTopClick('groups')}
          >
            <MdGroups2 /> Группы
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonBlock;
