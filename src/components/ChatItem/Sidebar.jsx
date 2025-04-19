import React, { useState, useEffect, useRef } from 'react';
import { CgProfile } from 'react-icons/cg';
import { GiPostOffice } from 'react-icons/gi';
import { FaUserFriends } from 'react-icons/fa';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { FaEllipsis } from "react-icons/fa6";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { MdGroups2 } from 'react-icons/md';

const Sidebar = () => {
  const [activeSidebarTop, setActiveSidebarTop] = useState('public');
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [photoURL, setPhotoURL] = useState('defaultAvatar');
  const dropdownRef = useRef(null);
  const moreButtonRef = useRef(null);

  const auth = getAuth();
  const storage = getStorage();
  const db = getFirestore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);

          if (data.photoURL) {
            try {
              const url = await getDownloadURL(ref(storage, data.photoURL));
              setPhotoURL(url);
            } catch (error) {
              console.error("Error loading profile photo:", error);
              setPhotoURL('defaultAvatar');
            }
          }
        }
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db, storage]);

  const toggleDropdown = () => {
    if (moreButtonRef.current) {
      const rect = moreButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
    setShowDropdown(!showDropdown);
  };

  const handleSidebarTopClick = (button) => {
    setActiveSidebarTop(button);
    if (button === 'more') {
      toggleDropdown();
    }
  };

  const renderContent = () => {
    // Example content based on activeSidebarTop
    if (activeSidebarTop === 'public') {
      return <div>Публичный профиль content</div>;
    } else if (activeSidebarTop === 'partner') {
      return <div>Кабинет партнёра content</div>;
    } else if (activeSidebarTop === 'znakom') {
      return <div>Знакомства content</div>;
    } else if (activeSidebarTop === 'chats') {
      return <div>Чаты content</div>;
    } else if (activeSidebarTop === 'groups') {
      return <div>Группы content</div>;
    }
    return null;
  };

  return (
    <div className="personal">
      <div className="personal__fixed">
        <div className="fixed__button1">
          <button
            className={activeSidebarTop === 'public' ? 'active' : ''}
            onClick={() => handleSidebarTopClick('public')}
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
            className={activeSidebarTop === 'more' ? 'active' : ''}
            onClick={() => handleSidebarTopClick('more')}
            ref={moreButtonRef}
          >
            <FaEllipsis /> Ещё
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

      {showDropdown && (
        <div ref={dropdownRef} style={{ top: dropdownPosition.top, left: dropdownPosition.left }} className="dropdown">
          {/* Dropdown content here */}
          <div>Dropdown Content</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
