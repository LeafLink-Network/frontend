import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('hong@example.com');
  const [name, setName] = useState('홍길동');
  const [phoneNumber, setPhoneNumber] = useState('010-1234-5678');
  const [job, setJob] = useState('백엔드 개발자');
  const [bio, setBio] = useState('안녕하세요. 3년차 백엔드 개발자입니다.');
  const [skills, setSkills] = useState(['Java', 'Spring']);

  // 검색어 상태 추가
  const [searchQuery, setSearchQuery] = useState('');
  
  // 에러 메시지 상태
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

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

  // 이메일 유효성 검사
  const validateEmail = (email) => {
    if (!email) return { valid: false, message: '이메일을 입력해주세요.' };
    
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return { valid: false, message: '올바른 이메일 형식이 아닙니다. (예: example@email.com)' };
    
    return { valid: true, message: '' };
  };

  // 전화번호 유효성 검사
  const validatePhoneNumber = (phone) => {
    if (!phone) return { valid: false, message: '전화번호를 입력해주세요.' };
    
    const re = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!re.test(phone)) return { valid: false, message: '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)' };
    
    return { valid: true, message: '' };
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

  // 전화번호 입력 핸들러
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value) {
      const result = validatePhoneNumber(value);
      setPhoneError(result.valid ? '' : result.message);
    } else {
      setPhoneError('');
    }
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    // 이름 검증
    const nameResult = validateName(name);
    setNameError(nameResult.message);
    isValid = isValid && nameResult.valid;

    // 이메일 검증
    const emailResult = validateEmail(email);
    setEmailError(emailResult.message);
    isValid = isValid && emailResult.valid;

    // 전화번호 검증
    const phoneResult = validatePhoneNumber(phoneNumber);
    setPhoneError(phoneResult.message);
    isValid = isValid && phoneResult.valid;

    if (isValid) {
      // 프로필 업데이트 처리 (실제 API 연동 필요)
      console.log('프로필 업데이트 데이터:', { email, name, phoneNumber, job, bio, skills });
      alert('프로필이 성공적으로 업데이트되었습니다.');
      navigate('/mypage');
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
  useEffect(() => {
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
    <div className="edit-profile-container">
      <div className="edit-profile-form-container">
        <h1 className="edit-profile-title">내 정보 수정</h1>
        
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="profile-image-section">
            <div className="profile-image">
              <img src="/profile.png" alt="프로필" />
            </div>
            <button type="button" className="change-image-button">이미지 변경</button>
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
          </div>
          
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
            <label htmlFor="phone">전화번호</label>
            <input
              type="tel"
              id="phone"
              placeholder="010-0000-0000"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
            {phoneError && <p className="error-message">{phoneError}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="job">직무</label>
            <select
              id="job"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            >
              <option value="">직무를 선택해주세요</option>
              <option value="프론트엔드 개발자">프론트엔드 개발자</option>
              <option value="백엔드 개발자">백엔드 개발자</option>
              <option value="풀스택 개발자">풀스택 개발자</option>
              <option value="모바일 개발자">모바일 개발자</option>
              <option value="DevOps/인프라">DevOps/인프라</option>
              <option value="데이터 사이언티스트">데이터 사이언티스트</option>
              <option value="AI 엔지니어">AI 엔지니어</option>
              <option value="디자이너">디자이너</option>
              <option value="기획자/PM">기획자/PM</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="bio">자기소개</label>
            <textarea
              id="bio"
              rows="4"
              placeholder="자기소개를 입력해주세요"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
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
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate('/mypage')}>취소</button>
            <button type="submit" className="save-button">저장하기</button>
          </div>
        </form>
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

export default EditProfile; 