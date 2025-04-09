import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [skills, setSkills] = useState([]);
  const [agreement, setAgreement] = useState(false);
  
  // 검색어 상태 추가
  const [searchQuery, setSearchQuery] = useState('');
  
  // 에러 메시지 상태
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [nameError, setNameError] = useState('');

  // 스킬 모달
  const [showSkillModal, setShowSkillModal] = useState(false);
  const modalRef = useRef(null);

  // 스킬 목록
  const availableSkills = [
    'Python', 'JavaScript', 'React', 'Node.js', 'AWS', 'Docker',
    'Java', 'Spring', 'TypeScript', 'Angular', 'Vue.js', 'MongoDB',
    'MySQL', 'PostgreSQL', 'Go', 'Kubernetes', 'GraphQL', 'Firebase'
  ];
  
  // 검색어에 따라 필터링된 스킬 목록
  const filteredSkills = searchQuery
    ? availableSkills.filter(skill => 
        skill.toLowerCase().includes(searchQuery.toLowerCase()))
    : availableSkills;

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    if (!email) return { valid: false, message: '이메일을 입력해주세요.' };
    
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return { valid: false, message: '올바른 이메일 형식이 아닙니다. (예: example@email.com)' };
    
    // 이미 사용 중인 이메일 체크 (실제로는 API 호출로 구현)
    if (email === 'test@example.com') return { valid: false, message: '이미 사용 중인 이메일입니다.' };
    
    return { valid: true, message: '' };
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    if (!password) return { valid: false, message: '비밀번호를 입력해주세요.' };
    
    if (password.length < 8) return { valid: false, message: '8자 이상 입력해주세요.' };
    
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[@$!%*#?&]/.test(password);
    
    if (!(hasLetter && hasNumber && hasSpecial))
      return { valid: false, message: '영문, 숫자, 특수문자를 포함해주세요.' };
    
    // 연속된 문자/숫자 또는 반복된 문자 체크
    const sequential = /123|234|345|456|567|678|789|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i;
    const repeated = /(.)\1{2,}/; // 같은 문자 3번 이상 반복
    
    if (sequential.test(password) || repeated.test(password))
      return { valid: false, message: '연속된 숫자/문자 또는 동일한 문자 반복은 사용할 수 없습니다.' };
    
    // 이전에 사용한 비밀번호 체크 (실제로는 API 호출로 구현)
    if (password === 'OldPass123!') 
      return { valid: false, message: '이전에 사용한 비밀번호는 사용할 수 없습니다.' };
    
    return { valid: true, message: '' };
  };

  // 이름 유효성 검사
  const validateName = (name) => {
    if (!name) return { valid: false, message: '이름을 입력해주세요.' };
    
    if (name.length < 2) return { valid: false, message: '2자 이상 입력해주세요.' };
    
    // 한글 또는 영문만 허용
    const koreanOrEnglish = /^[가-힣a-zA-Z]+$/;
    if (!koreanOrEnglish.test(name))
      return { valid: false, message: '한글 또는 영문만 입력해주세요.' };
    
    // 숫자나 특수문자 체크
    const hasNumbersOrSpecials = /[\d\W_]/.test(name);
    if (hasNumbersOrSpecials)
      return { valid: false, message: '특수문자 및 숫자는 사용할 수 없습니다.' };
    
    return { valid: true, message: '' };
  };

  // 이메일 입력 핸들러
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      const result = validateEmail(value);
      setEmailError(result.valid ? '' : result.message);
    } else {
      setEmailError('');
    }
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value) {
      const result = validatePassword(value);
      setPasswordError(result.valid ? '' : result.message);
    } else {
      setPasswordError('');
    }
  };

  // 이름 입력 핸들러
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value) {
      const result = validateName(value);
      setNameError(result.valid ? '' : result.message);
    } else {
      setNameError('');
    }
  };

  // 비밀번호 확인 입력 핸들러
  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value && password) {
      setConfirmError(value === password ? '' : '비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmError('');
    }
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    // 이메일 검증
    const emailResult = validateEmail(email);
    setEmailError(emailResult.message);
    isValid = isValid && emailResult.valid;

    // 비밀번호 검증
    const passwordResult = validatePassword(password);
    setPasswordError(passwordResult.message);
    isValid = isValid && passwordResult.valid;

    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      setConfirmError('비밀번호가 일치하지 않습니다');
      isValid = false;
    } else {
      setConfirmError('');
    }

    // 이름 검증
    const nameResult = validateName(name);
    setNameError(nameResult.message);
    isValid = isValid && nameResult.valid;

    if (isValid) {
      // 회원가입 처리 (실제 API 연동 필요)
      console.log('회원가입 데이터:', { email, password, name, job, skills, agreement });
    }
  };

  // 스킬 추가/제거
  const toggleSkill = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  // 스킬 태그 삭제
  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  // 모달 외부 클릭 시 닫기
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowSkillModal(false);
    }
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 모달 토글
  const toggleSkillModal = () => {
    setShowSkillModal(!showSkillModal);
    setSearchQuery(''); // 모달 열 때 검색어 초기화
  };

  // 모달 닫기 이벤트 리스너
  React.useEffect(() => {
    if (showSkillModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSkillModal]);

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h1 className="register-title">회원가입</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일 <span className="required">*</span></label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호 <span className="required">*</span></label>
            <input
              type="password"
              id="password"
              placeholder="8자 이상 입력해주세요"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
            {!passwordError && password && password.length >= 8 && <p className="success-message">사용 가능한 비밀번호입니다.</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirm-password">비밀번호 확인 <span className="required">*</span></label>
            <input
              type="password"
              id="confirm-password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmError && <p className="error-message">{confirmError}</p>}
            {!confirmError && confirmPassword && password === confirmPassword && <p className="success-message">비밀번호가 일치합니다.</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="name">이름 <span className="required">*</span></label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={handleNameChange}
            />
            {nameError && <p className="error-message">{nameError}</p>}
            {!nameError && name && name.length >= 2 && <p className="success-message">사용 가능한 이름입니다.</p>}
          </div>

          <div className="form-group">
            <label htmlFor="job">직무</label>
            <select
              id="job"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            >
              <option value="">직무를 선택해주세요</option>
              <option value="frontend">프론트엔드 개발자</option>
              <option value="backend">백엔드 개발자</option>
              <option value="fullstack">풀스택 개발자</option>
              <option value="mobile">모바일 개발자</option>
              <option value="devops">DevOps/인프라</option>
              <option value="data">데이터 사이언티스트</option>
              <option value="ai">AI 엔지니어</option>
              <option value="designer">디자이너</option>
              <option value="pm">기획자/PM</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>기술 스택</label>
            <div className="skills-container">
              <div className="selected-skills">
                {skills.map(skill => (
                  <div key={skill} className="skill-tag">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>×</button>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="add-skill-button"
                  onClick={toggleSkillModal}
                >
                  + 기술 추가
                </button>
              </div>
            </div>
          </div>
          
          <div className="form-group agreement">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={agreement}
                onChange={() => setAgreement(!agreement)}
              />
              <span className="checkbox-text">이용약관 및 개인정보처리방침에 동의합니다</span>
            </label>
          </div>
          
          <button type="submit" className="register-button" disabled={!agreement}>가입하기</button>
        </form>
        
        <div className="login-link-container">
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login" className="login-link">로그인하기</Link>
        </div>
      </div>

      {/* 스킬 선택 모달 */}
      {showSkillModal && (
        <div className="skill-modal-overlay">
          <div className="skill-modal" ref={modalRef}>
            <div className="skill-modal-header">
              <h3>기술 선택</h3>
            </div>
            <div className="skill-search">
              <input 
                type="text" 
                placeholder="Python, JavaScript, React 등 기술을 입력하세요" 
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="skill-grid">
              {filteredSkills.map(skill => (
                <div 
                  key={skill}
                  className={`skill-item ${skills.includes(skill) ? 'selected' : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </div>
              ))}
            </div>
            <div className="skill-modal-footer">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setShowSkillModal(false)}
              >
                취소
              </button>
              <button 
                type="button" 
                className="confirm-button"
                onClick={() => setShowSkillModal(false)}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register; 