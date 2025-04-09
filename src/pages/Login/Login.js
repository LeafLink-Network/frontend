import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

// 테스트 계정 정보
const TEST_ACCOUNT = {
  email: 'test@learnleaf.kr',
  password: 'Test1234!'
};

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    // 이메일 검증
    if (!email) {
      setEmailError('아이디와 비밀번호를 확인해주세요.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
      isValid = false;
    } else {
      setEmailError('');
    }

    // 비밀번호 검증
    if (!password) {
      setPasswordError('아이디와 비밀번호를 확인해주세요.');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // 테스트 계정 확인
      if (email === TEST_ACCOUNT.email && password === TEST_ACCOUNT.password) {
        console.log('테스트 계정으로 로그인 성공');
        // 로그인 상태 변경
        setIsLoggedIn(true);
        // 로그인 성공 후 홈페이지로 리디렉션
        navigate('/');
      } else {
        // 테스트 계정이 아닌 경우 에러 메시지 표시
        setEmailError('아이디와 비밀번호를 확인해주세요.');
        setPasswordError('아이디와 비밀번호를 확인해주세요.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1 className="login-title">로그인</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="8자 이상 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          
          <div className="remember-me">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <span className="checkbox-text">로그인 상태 유지</span>
            </label>
            <Link to="/reset-password" className="forgot-password">비밀번호 재설정</Link>
          </div>
          
          <button type="submit" className="login-button">로그인</button>
        </form>
        
        <div className="register-link-container">
          <span>계정이 없으신가요?</span>
          <Link to="/register" className="register-link">회원가입</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 