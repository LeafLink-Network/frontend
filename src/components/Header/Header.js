import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoNotifications } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdNotificationsOff, IoMdNotifications } from "react-icons/io";
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigate = useNavigate();

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  const toggleNotifications = (e) => {
    e.preventDefault();
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/register');
  };

  // 드롭다운 외부 클릭시 닫기
  React.useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.header__user')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          <Link to="/">
            <img src="/logo.png" alt="Learnleaf 로고" />
          </Link>
        </div>
        
        <nav className="header__menu">
          <ul>
            <li><Link to="/jobs">채용공고</Link></li>
            <li><Link to="/posts">커뮤니티</Link></li>
            <li><Link to="/projects">사이드프로젝트 모집</Link></li>
            <li><Link to="/reports/summary">채용 리포트</Link></li>
          </ul>
        </nav>
      </div>

      <div className="header__buttons">
        {isLoggedIn ? (
          <>
            <div className="header__notification">
              <Link to="/notifications">
                <IoNotifications size={24} />
                {notificationsEnabled && <div className="header__notification-dot"></div>}
              </Link>
            </div>
            <div className="header__user">
              <div className={`header__user-profile ${isDropdownOpen ? 'active' : ''}`} onClick={toggleDropdown}>
                <img src="/profile.png" alt="프로필" />
                <span>홍길동</span>
                <IoIosArrowDown className={isDropdownOpen ? 'rotate' : ''} />
              </div>
              <div className={`header__user-dropdown ${isDropdownOpen ? 'show' : ''}`} onClick={handleDropdownClick}>
                <Link to="/mypage" className="dropdown-item">
                  <span>마이페이지</span>
                </Link>
                <a href="#" className="dropdown-item notification-toggle" onClick={toggleNotifications}>
                  <span>알림 {notificationsEnabled ? '끄기' : '켜기'}</span>
                  {notificationsEnabled ? <IoMdNotifications /> : <IoMdNotificationsOff />}
                </a>
                <a href="#" className="dropdown-item logout" onClick={handleLogout}>
                  <span>로그아웃</span>
                </a>
              </div>
            </div>
          </>
        ) : (
          <>
            <button onClick={handleLogin}>로그인</button>
            <button onClick={handleSignup}>회원가입</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header; 