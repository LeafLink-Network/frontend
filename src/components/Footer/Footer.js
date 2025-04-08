import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>LearnLeaf</h3>
          <p>배움의 나무가 자라는 곳</p>
        </div>
        <div className="footer-section">
          <h4>서비스</h4>
          <ul>
            <li><a href="/courses">강의</a></li>
            <li><a href="/community">커뮤니티</a></li>
            <li><a href="/about">회사소개</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>고객지원</h4>
          <ul>
            <li><a href="/faq">자주 묻는 질문</a></li>
            <li><a href="/contact">문의하기</a></li>
            <li><a href="/terms">이용약관</a></li>
            <li><a href="/privacy">개인정보처리방침</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>소셜 미디어</h4>
          <div className="social-links">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 LearnLeaf. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 