import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaBookmark, FaRegBookmark, FaComment, FaPencilAlt, FaMapMarkerAlt } from 'react-icons/fa';
import './MyPage.css';

const MyPage = () => {
  const [activeMenu, setActiveMenu] = useState('main');
  
  // 프로필 정보 상태
  const [email, setEmail] = useState('hong@example.com');
  const [name, setName] = useState('홍길동');
  const [phoneNumber, setPhoneNumber] = useState('010-1234-5678');
  const [job, setJob] = useState('백엔드 개발자');
  const [bio, setBio] = useState('안녕하세요. 3년차 백엔드 개발자입니다.');
  const [skills, setSkills] = useState(['Java', 'Spring']);
  const [profileImage, setProfileImage] = useState('/profile.png');
  
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState('');
  
  // 에러 메시지 상태
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // 스킬 모달
  const [showSkillModal, setShowSkillModal] = useState(false);
  // 지원 취소 모달
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [targetProjectId, setTargetProjectId] = useState(null);
  const modalRef = useRef(null);
  const cancelModalRef = useRef(null);

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
  
  // 채용공고 북마크 상태 관리
  const [savedJobs, setSavedJobs] = useState([
    { 
      id: 1, 
      title: '시니어 백엔드 개발자', 
      company: '테크스타트업 A사', 
      location: '서울 · 강남구',
      date: '2024.01.18',
      platform: 'wanted',
      salary: '연봉 6000~8000',
      saved: true 
    },
    { 
      id: 2, 
      title: '프론트엔드 개발자', 
      company: 'IT기업 B사', 
      location: '성남 · 분당구',
      date: '2024.01.16',
      platform: 'saramin',
      salary: '연봉 5000~7000',
      saved: true 
    },
  ]);
  
  // 좋아요 한 채용공고 상태 관리
  const [likedJobs, setLikedJobs] = useState([
    { 
      id: 1, 
      title: '프론트엔드 개발자', 
      company: '네이버',
      location: '서울 · 강남구',
      date: '2024.01.15',
      platform: 'wanted',
      salary: '연봉 5000~7000',
      liked: true
    },
    { 
      id: 2, 
      title: '백엔드 개발자', 
      company: '카카오',
      location: '성남 · 분당구',
      date: '2024.01.12',
      platform: 'saramin',
      salary: '연봉 5500~7500',
      liked: true
    },
    { 
      id: 3, 
      title: 'DevOps 엔지니어', 
      company: '라인',
      location: '서울 · 서초구',
      date: '2024.01.10',
      platform: 'jobkorea',
      salary: '연봉 6000~8000',
      liked: true
    }
  ]);
  
  // 좋아요 한 게시글 상태 관리
  const [likedPosts, setLikedPosts] = useState([
    { 
      id: 1, 
      title: '백엔드 개발자가 함께할 SNS 서비스 프로젝트', 
      content: '소셜 네트워크 서비스를 함께 만들어갈 백엔드 개발자를 찾고 있습니다.',
      date: '2024.01.15',
      likes: 23,
      comments: 12,
      liked: true
    },
    { 
      id: 2, 
      title: 'AI 기반 추천 시스템 프로젝트', 
      content: '머신러닝 기반의 콘텐츠 추천 시스템을 개발하는 프로젝트입니다.',
      date: '2024.01.14',
      likes: 18,
      comments: 8,
      liked: true
    },
    { 
      id: 3, 
      title: '모바일 헬스케어 앱 개발', 
      content: '개인 맞춤형 건강 관리 서비스를 제공하는 모바일 앱을 개발합니다.',
      date: '2024.01.13',
      likes: 15,
      comments: 6,
      liked: true
    }
  ]);
  
  // 프로젝트 좋아요 상태 관리
  const [likedProjects, setLikedProjects] = useState([
    { 
      id: 1, 
      title: 'AI 기반 음악 추천 서비스', 
      members: '개발자 3명 모집 중', 
      skills: ['React', 'Node.js'],
      date: '2024.01.18',
      liked: true 
    },
    { 
      id: 2, 
      title: '핀테크 결제 시스템', 
      members: '개발자 2명 모집 중', 
      skills: ['Spring', 'MySQL'],
      date: '2024.01.15',
      liked: true 
    },
  ]);
  
  // 저장한 사이드 프로젝트 상태 관리
  const [savedProjects, setSavedProjects] = useState([
    { 
      id: 1, 
      title: '유튜브 클론 프로젝트', 
      members: '개발자 4명 모집 중', 
      location: '서울 · 마포구',
      date: '2024.01.19',
      skills: ['React', 'Firebase', 'Redux'],
      saved: true 
    },
    { 
      id: 2, 
      title: '블록체인 기반 NFT 마켓플레이스', 
      members: '개발자 2명 모집 중', 
      location: '서울 · 강남구',
      date: '2024.01.16',
      skills: ['Solidity', 'React', 'Web3.js'],
      saved: true 
    },
    { 
      id: 3, 
      title: 'AR 쇼핑 앱 개발', 
      members: '개발자 3명 모집 중', 
      location: '성남 · 분당구',
      date: '2024.01.12',
      skills: ['Unity', 'ARKit', 'Swift'],
      saved: true 
    }
  ]);
  
  // 지원한 사이드 프로젝트 상태 관리
  const [appliedProjects, setAppliedProjects] = useState([
    { 
      id: 1, 
      title: '인공지능 기반 이미지 생성 서비스', 
      company: '테크스타트업 C',
      location: '서울 · 마포구',
      date: '2024.01.20',
      position: '백엔드 개발자',
      skills: ['Python', 'PyTorch', 'React'],
      applied: true 
    },
    { 
      id: 2, 
      title: '클라우드 기반 협업 툴 개발', 
      company: '소프트웨어 기업 D',
      location: '서울 · 강남구',
      date: '2024.01.17',
      position: '프론트엔드 개발자',
      skills: ['AWS', 'Node.js', 'MongoDB'],
      applied: true 
    },
    { 
      id: 3, 
      title: '커머스 플랫폼 리뉴얼 프로젝트', 
      company: '이커머스 기업 E',
      location: '성남 · 판교',
      date: '2024.01.10',
      position: 'DevOps 엔지니어',
      skills: ['Java', 'Spring', 'React'],
      applied: true 
    }
  ]);
  
  // 파일 입력 참조
  const fileInputRef = useRef(null);

  // 채용공고 북마크 토글
  const toggleBookmark = (jobId) => {
    setSavedJobs(savedJobs.map(job => 
      job.id === jobId ? { ...job, saved: !job.saved } : job
    ));
  };
  
  // 프로젝트 좋아요 토글
  const toggleLike = (projectId) => {
    // 좋아요 한 프로젝트를 찾아서 현재 상태를 확인
    const project = likedProjects.find(project => project.id === projectId);
    
    if (project && project.liked) {
      // 좋아요 취소 - 프로젝트 제거
      setLikedProjects(likedProjects.filter(project => project.id !== projectId));
    } else {
      // 좋아요 활성화 - 상태 토글
      setLikedProjects(likedProjects.map(project => 
        project.id === projectId ? { ...project, liked: true } : project
      ));
    }
  };

  // 게시글 좋아요 토글
  const togglePostLike = (postId) => {
    // 게시글을 찾아서 현재 좋아요 상태를 확인
    const post = likedPosts.find(post => post.id === postId);
    
    if (post && post.liked) {
      // 좋아요 취소 - 게시글 제거
      setLikedPosts(likedPosts.filter(post => post.id !== postId));
    } else {
      // 좋아요 활성화 - 상태 토글
      setLikedPosts(likedPosts.map(post => 
        post.id === postId ? { ...post, liked: true } : post
      ));
    }
  };

  // 채용공고 좋아요 토글
  const toggleJobLike = (jobId) => {
    // 채용공고를 찾아서 현재 좋아요 상태를 확인
    const job = likedJobs.find(job => job.id === jobId);
    
    if (job && job.liked) {
      // 좋아요 취소 - 채용공고 제거
      setLikedJobs(likedJobs.filter(job => job.id !== jobId));
    } else {
      // 좋아요 활성화 - 상태 토글
      setLikedJobs(likedJobs.map(job => 
        job.id === jobId ? { ...job, liked: true } : job
      ));
    }
  };

  // 프로젝트 지원 취소 토글
  const toggleProjectApply = (projectId) => {
    // 지원한 프로젝트를 찾아서 현재 상태를 확인
    const project = appliedProjects.find(project => project.id === projectId);
    
    if (project && project.applied) {
      // 확인 모달 표시
      setTargetProjectId(projectId);
      setShowCancelModal(true);
    }
  };

  // 지원 취소 확인
  const confirmCancelApply = () => {
    if (targetProjectId) {
      // 지원 취소 - 프로젝트 제거
      setAppliedProjects(appliedProjects.filter(project => project.id !== targetProjectId));
      setShowCancelModal(false);
      setTargetProjectId(null);
    }
  };

  // 지원 취소 모달 닫기
  const closeCancelModal = () => {
    setShowCancelModal(false);
    setTargetProjectId(null);
  };

  // 모달 외부 클릭 시 닫기 이벤트 핸들러
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowSkillModal(false);
    }
    if (cancelModalRef.current && !cancelModalRef.current.contains(e.target)) {
      setShowCancelModal(false);
      setTargetProjectId(null);
    }
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

  // 자기소개 입력 핸들러
  const handleBioChange = (e) => {
    const inputText = e.target.value;
    // 300자 제한
    if (inputText.length <= 300) {
      setBio(inputText);
    }
  };

  // 프로필 업데이트 폼 제출 처리
  const handleProfileSubmit = (e) => {
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
      setActiveMenu('saved-jobs'); // 저장 후 기본 페이지로 복귀
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

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 모달 토글
  const toggleSkillModal = () => {
    setShowSkillModal(!showSkillModal);
    setSearchQuery(''); // 모달 열 때 검색어 초기화
  };

  React.useEffect(() => {
    if (showSkillModal || showCancelModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSkillModal, showCancelModal]);

  // 이미지 변경 버튼 클릭 핸들러
  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  // 이미지 파일 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 내 정보 수정 폼 렌더링
  const renderEditProfileForm = () => {
    return (
      <div className="edit-profile-form-container">
        <form className="edit-profile-form" onSubmit={handleProfileSubmit}>
          <div className="profile-image-section">
            <div className="profile-image">
              <img src={profileImage} alt="프로필" />
            </div>
            <button type="button" className="change-image-button" onClick={handleImageButtonClick}>
              이미지 변경
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
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
              onChange={handleBioChange}
              maxLength={300}
            ></textarea>
            <div className="char-count">
              <span>{bio.length}/300</span>
            </div>
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
            <button type="button" className="cancel-button" onClick={() => setActiveMenu('saved-jobs')}>취소</button>
            <button type="submit" className="save-button">저장하기</button>
          </div>
        </form>
      </div>
    );
  };

  // 좋아요 한 게시글 렌더링
  const renderLikedPosts = () => {
    return (
      <section className="liked-posts">
        <div className="post-list">
          {likedPosts.map(post => (
            <div className="post-card" key={post.id}>
              <div className="post-content">
                <span className="post-date">{post.date}</span>
                <h3 className="post-title">{post.title}</h3>
                <p className="post-preview">{post.content}</p>
                <div className="post-meta">
                  <div className="post-stats">
                    <span className="like-count"><FaHeart className="like-icon" /> {post.likes}</span>
                    <span className="comment-count"><FaComment className="comment-icon" /> {post.comments}</span>
                  </div>
                </div>
              </div>
              <div className="post-right">
                <span className="post-date-right">{post.date}</span>
                <button 
                  className="like-button"
                  onClick={() => togglePostLike(post.id)}
                >
                  <FaHeart className="heart-icon" />
                  <span className="like-text">좋아요 취소</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // 좋아요 한 채용공고 렌더링
  const renderLikedJobs = () => {
    return (
      <section className="liked-jobs">
        <div className="post-list">
          {likedJobs.map(job => (
            <div className="post-card" key={job.id}>
              <div className="post-content">
                <span className="post-date">{job.date}</span>
                <h3 className="post-title">{job.title}</h3>
                <div className="company-info">
                  <p className="company-name">{job.company}</p>
                  <span className={`platform-badge ${job.platform}`}>
                    {getPlatformLabel(job.platform)}
                  </span>
                </div>
                <div className="post-meta">
                  <div className="job-info">
                    <span>{job.location}</span>
                    <span className="salary">{job.salary}</span>
                  </div>
                </div>
              </div>
              <div className="post-right">
                <span className="post-date-right">{job.date}</span>
                <button 
                  className="like-button"
                  onClick={() => toggleJobLike(job.id)}
                >
                  <FaHeart className="heart-icon" />
                  <span className="like-text">좋아요 취소</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // 저장된 채용공고 페이지 렌더링
  const renderSavedJobs = () => {
    return (
      <section className="saved-jobs">
        <div className="post-list">
          {savedJobs.map(job => (
            <div className="post-card" key={job.id}>
              <div className="post-content">
                <span className="post-date">{job.date}</span>
                <h3 className="post-title">{job.title}</h3>
                <div className="company-info">
                  <p className="company-name">{job.company}</p>
                  <span className={`platform-badge ${job.platform}`}>
                    {getPlatformLabel(job.platform)}
                  </span>
                </div>
                <div className="post-meta">
                  <div className="job-info">
                    <span>{job.location}</span>
                    <span className="salary">{job.salary}</span>
                  </div>
                </div>
              </div>
              <div className="post-right">
                <span className="post-date-right">{job.date}</span>
                <button 
                  className="like-button" 
                  onClick={() => toggleBookmark(job.id)}
                >
                  {job.saved ? <FaBookmark className="heart-icon" /> : <FaRegBookmark className="heart-icon" />}
                  <span className="like-text">저장 취소</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // 지원한 사이드 프로젝트 렌더링
  const renderAppliedProjects = () => {
    return (
      <section className="applied-projects">
        <div className="post-list">
          {appliedProjects.map(project => (
            <div className="post-card" key={project.id}>
              <div className="post-content">
                <span className="post-date">{project.date}</span>
                <h3 className="post-title">{project.title}</h3>
                <div className="company-info">
                  <p className="company-name">{project.company}</p>
                  <p className="location">{project.location}</p>
                </div>
                <div className="position-info">
                  <p className="position">지원 포지션: {project.position}</p>
                </div>
                <div className="post-meta">
                  <div className="skills">
                    {project.skills.map((skill, index) => (
                      <span className="skill-tag" key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="post-right">
                <span className="post-date-right">{project.date}</span>
                <button 
                  className="like-button"
                  onClick={() => toggleProjectApply(project.id)}
                >
                  <FaPencilAlt className="heart-icon" />
                  <span className="like-text">지원 취소</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // 좋아요 한 사이드 프로젝트 페이지 렌더링
  const renderLikedProjects = () => {
    return (
      <section className="liked-projects">
        <div className="post-list">
          {likedProjects.map(project => (
            <div className="post-card" key={project.id}>
              <div className="post-content">
                <span className="post-date">{project.date}</span>
                <h3 className="post-title">{project.title}</h3>
                <div className="company-info">
                  <p className="company-name">{project.members}</p>
                </div>
                <div className="post-meta">
                  <div className="skills">
                    {project.skills.map((skill, index) => (
                      <span className="skill-tag" key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="post-right">
                <span className="post-date-right">{project.date}</span>
                <button 
                  className="like-button"
                  onClick={() => toggleLike(project.id)}
                >
                  <FaHeart className="heart-icon" />
                  <span className="like-text">좋아요 취소</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // 저장한 사이드 프로젝트 페이지 렌더링
  const renderSavedProjects = () => {
    return (
      <section className="saved-projects">
        <div className="post-list">
          {savedProjects.map(project => (
            <div className="post-card" key={project.id}>
              <div className="post-content">
                <span className="post-date">{project.date}</span>
                <h3 className="post-title">{project.title}</h3>
                <div className="company-info">
                  <p className="company-name">{project.members}</p>
                  <p className="location">{project.location}</p>
                </div>
                <div className="post-meta">
                  <div className="skills">
                    {project.skills.map((skill, index) => (
                      <span className="skill-tag" key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="post-right">
                <span className="post-date-right">{project.date}</span>
                <button 
                  className="like-button"
                  onClick={() => toggleProjectBookmark(project.id)}
                >
                  <FaBookmark className="heart-icon" />
                  <span className="like-text">저장 취소</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // 플랫폼 라벨 가져오기
  const getPlatformLabel = (platform) => {
    switch (platform) {
      case 'wanted':
        return '원티드';
      case 'saramin':
        return '사람인';
      case 'jobkorea':
        return '잡코리아';
      default:
        return '';
    }
  };

  // 프로젝트 저장 토글
  const toggleProjectBookmark = (projectId) => {
    // 저장한 프로젝트를 찾아서 현재 상태를 확인
    const project = savedProjects.find(project => project.id === projectId);
    
    if (project && project.saved) {
      // 저장 취소 - 프로젝트 제거
      setSavedProjects(savedProjects.filter(project => project.id !== projectId));
    } else {
      // 저장 활성화 - 상태 토글
      setSavedProjects(savedProjects.map(project => 
        project.id === projectId ? { ...project, saved: true } : project
      ));
    }
  };

  // 메인 영역 컨텐츠 결정
  const renderMainContent = () => {
    if (activeMenu === 'edit-profile') {
      return renderEditProfileForm();
    } else if (activeMenu === 'liked-posts') {
      return renderLikedPosts();
    } else if (activeMenu === 'liked-jobs') {
      return renderLikedJobs();
    } else if (activeMenu === 'saved-jobs') {
      return renderSavedJobs();
    } else if (activeMenu === 'applied-projects') {
      return renderAppliedProjects();
    } else if (activeMenu === 'liked-projects') {
      return renderLikedProjects();
    } else if (activeMenu === 'saved-projects') {
      return renderSavedProjects();
    }

    return (
      <>
        {/* 최근 활동 섹션 */}
        <section className="recent-activity">
          <h2 className="section-title">최근 활동</h2>
          <div className="activity-cards">
            <div className="activity-card">
              <div className="activity-number">12</div>
              <div className="activity-text">지원한 프로젝트</div>
            </div>
            <div className="activity-card">
              <div className="activity-number">25</div>
              <div className="activity-text">좋아요한 게시글</div>
            </div>
          </div>
        </section>
        
        {/* 직무 기반 리포트 바로가기 섹션 */}
        <section className="job-reports">
          <h2 className="section-title">직무 기반 리포트</h2>
          <div className="report-links">
            <Link to="/reports/summary" className="report-link-card" data-discover="true">
              <h3>내 직무 기반 리포트 요약 바로가기</h3>
              <p>백엔드 개발자 직무의 주요 통계와 요약 정보를 확인해보세요</p>
              <div className="report-link-arrow">→</div>
            </Link>
          </div>
        </section>
        
        {/* 내 근처 회사 보기 섹션 */}
        <section className="nearby-companies">
          <h2 className="section-title">내 근처 채용 회사</h2>
          <div className="location-info">
            <div className="location-header">
              <div className="location-icon-wrapper">
                <FaMapMarkerAlt className="location-icon" />
              </div>
              <div className="current-location">
                <p className="location-label">현재 위치</p>
                <p className="location-name">서울 도봉구 창동역</p>
              </div>
              <button className="change-location-button">위치 변경</button>
            </div>
          </div>
          
          <div className="map-container">
            <div className="simple-map">
              <svg width="100%" height="100%" viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg">
                {/* 배경 */}
                <rect x="0" y="0" width="600" height="250" fill="#f0f4f8" />
                
                {/* 도로 */}
                <line x1="100" y1="0" x2="100" y2="250" stroke="#d8d8d8" strokeWidth="10" />
                <line x1="0" y1="120" x2="600" y2="120" stroke="#d8d8d8" strokeWidth="12" />
                <line x1="300" y1="0" x2="300" y2="250" stroke="#d8d8d8" strokeWidth="8" />
                <line x1="450" y1="50" x2="450" y2="200" stroke="#d8d8d8" strokeWidth="6" />
                <line x1="200" y1="50" x2="550" y2="50" stroke="#d8d8d8" strokeWidth="7" />
                <line x1="200" y1="200" x2="550" y2="200" stroke="#d8d8d8" strokeWidth="7" />
                
                {/* 건물들 */}
                <rect x="130" y="40" width="40" height="30" fill="#c4c4c4" stroke="#a0a0a0" />
                <rect x="190" y="65" width="60" height="40" fill="#c4c4c4" stroke="#a0a0a0" />
                <rect x="350" y="75" width="50" height="30" fill="#c4c4c4" stroke="#a0a0a0" />
                <rect x="480" y="70" width="40" height="35" fill="#c4c4c4" stroke="#a0a0a0" />
                <rect x="140" y="150" width="55" height="40" fill="#c4c4c4" stroke="#a0a0a0" />
                <rect x="220" y="160" width="45" height="25" fill="#c4c4c4" stroke="#a0a0a0" />
                <rect x="330" y="145" width="35" height="40" fill="#c4c4c4" stroke="#a0a0a0" />
                <rect x="490" y="150" width="60" height="30" fill="#c4c4c4" stroke="#a0a0a0" />
                
                {/* 회사 위치 마커 */}
                <circle cx="150" cy="60" r="10" fill="#ff5722" />
                <text x="150" y="55" fontSize="10" fill="white" textAnchor="middle">A</text>
                
                <circle cx="370" cy="90" r="10" fill="#15CB96" />
                <text x="370" y="85" fontSize="10" fill="white" textAnchor="middle">B</text>
                
                <circle cx="510" cy="170" r="10" fill="#15CB96" />
                <text x="510" y="165" fontSize="10" fill="white" textAnchor="middle">C</text>
                
                {/* 창동역 위치 (중앙) */}
                <circle cx="300" cy="120" r="12" fill="#3f51b5" />
                <text x="300" y="115" fontSize="10" fill="white" textAnchor="middle">역</text>
                
                {/* 거리 표시 */}
                <path d="M 300,120 L 150,60" stroke="#666" strokeWidth="1" strokeDasharray="4 2" />
                <path d="M 300,120 L 370,90" stroke="#666" strokeWidth="1" strokeDasharray="4 2" />
                <path d="M 300,120 L 510,170" stroke="#666" strokeWidth="1" strokeDasharray="4 2" />
                
                {/* 범례 */}
                <rect x="20" y="200" width="60" height="30" rx="5" fill="rgba(255,255,255,0.8)" />
                <circle cx="30" y="215" r="5" fill="#3f51b5" />
                <text x="50" y="219" fontSize="10" fill="#333" textAnchor="middle">창동역</text>
                
                <rect x="20" y="165" width="60" height="30" rx="5" fill="rgba(255,255,255,0.8)" />
                <circle cx="30" y="180" r="5" fill="#15CB96" />
                <text x="50" y="184" fontSize="10" fill="#333" textAnchor="middle">기업</text>
              </svg>
              <div className="map-location-info">서울 도봉구 창동역 주변 3km 내 회사</div>
            </div>
          </div>
          
          <div className="nearby-companies-list">
            <div className="company-card">
              <div className="company-info">
                <h3 className="company-name">테크스타트업 A</h3>
                <p className="company-location">창동역에서 0.8km</p>
                <p className="company-job">백엔드 개발자 채용중</p>
              </div>
              <div className="company-actions">
                <button className="view-button">상세보기</button>
              </div>
            </div>
            
            <div className="company-card">
              <div className="company-info">
                <h3 className="company-name">IT 솔루션 B</h3>
                <p className="company-location">창동역에서 1.2km</p>
                <p className="company-job">풀스택 개발자 채용중</p>
              </div>
              <div className="company-actions">
                <button className="view-button">상세보기</button>
              </div>
            </div>
            
            <div className="company-card">
              <div className="company-info">
                <h3 className="company-name">웹 에이전시 C</h3>
                <p className="company-location">창동역에서 2.5km</p>
                <p className="company-job">백엔드 개발자 채용중</p>
              </div>
              <div className="company-actions">
                <button className="view-button">상세보기</button>
              </div>
            </div>
          </div>
          
          <div className="view-more-container">
            <button className="view-more-button">더 많은 회사 보기</button>
          </div>
        </section>
        
        {/* 인기 스킬 섹션 */}
        <section className="popular-skills">
          <h2 className="section-title">내 직무 인기 스킬</h2>
          <div className="skills-chart">
            <div className="chart-container">
              <div className="chart-header">
                <h3>백엔드 개발자 인기 기술 스택</h3>
                <span className="chart-period">최근 3개월</span>
              </div>
              <div className="skills-ranking">
                <div className="skill-rank-item">
                  <span className="rank">1</span>
                  <span className="skill-name">Spring</span>
                  <div className="skill-bar-container">
                    <div className="skill-bar" style={{width: '85%'}}></div>
                    <span className="skill-percentage">85%</span>
                  </div>
                </div>
                <div className="skill-rank-item">
                  <span className="rank">2</span>
                  <span className="skill-name">Java</span>
                  <div className="skill-bar-container">
                    <div className="skill-bar" style={{width: '78%'}}></div>
                    <span className="skill-percentage">78%</span>
                  </div>
                </div>
                <div className="skill-rank-item">
                  <span className="rank">3</span>
                  <span className="skill-name">MySQL</span>
                  <div className="skill-bar-container">
                    <div className="skill-bar" style={{width: '65%'}}></div>
                    <span className="skill-percentage">65%</span>
                  </div>
                </div>
                <div className="skill-rank-item">
                  <span className="rank">4</span>
                  <span className="skill-name">AWS</span>
                  <div className="skill-bar-container">
                    <div className="skill-bar" style={{width: '62%'}}></div>
                    <span className="skill-percentage">62%</span>
                  </div>
                </div>
                <div className="skill-rank-item">
                  <span className="rank">5</span>
                  <span className="skill-name">Node.js</span>
                  <div className="skill-bar-container">
                    <div className="skill-bar" style={{width: '53%'}}></div>
                    <span className="skill-percentage">53%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  return (
    <div className="mypage-container">
      <h1 className="mypage-title">
        {activeMenu === 'edit-profile' ? '내 정보 수정' : 
         activeMenu === 'liked-posts' ? '좋아요 한 게시글' :
         activeMenu === 'liked-jobs' ? '좋아요 한 채용공고' :
         activeMenu === 'saved-jobs' ? '저장된 채용공고' :
         activeMenu === 'applied-projects' ? '지원한 사이드 프로젝트' :
         activeMenu === 'liked-projects' ? '좋아요 한 사이드 프로젝트' :
         activeMenu === 'saved-projects' ? '저장한 사이드 프로젝트' : '마이페이지'}
      </h1>
      
      <div className="mypage-content">
        {/* 왼쪽 사이드바 */}
        <div className="mypage-sidebar">
          <div className="profile-section">
            <div className="profile-image">
              <img src={profileImage} alt="프로필" />
            </div>
            <div className="profile-info">
              <h2 className="profile-name">홍길동</h2>
              <p className="profile-job">개발자</p>
            </div>
          </div>
          
          <div className="selected-job">
            <h3>내가 선택한 직무</h3>
            <p>백엔드 개발자</p>
          </div>
          
          <nav className="mypage-menu">
            <Link 
              to="#" 
              className={`menu-item ${activeMenu === 'main' ? 'active' : ''}`}
              onClick={() => setActiveMenu('main')}
            >
              마이페이지
            </Link>
            <Link 
              to="#" 
              className={`menu-item ${activeMenu === 'edit-profile' ? 'active' : ''}`}
              onClick={() => setActiveMenu('edit-profile')}
            >
              내 정보 수정
            </Link>
            <Link 
              to="#" 
              className={`menu-item ${activeMenu === 'liked-posts' ? 'active' : ''}`}
              onClick={() => setActiveMenu('liked-posts')}
            >
              좋아요 한 게시글
            </Link>
            <Link 
              to="#" 
              className={`menu-item ${activeMenu === 'liked-jobs' ? 'active' : ''}`}
              onClick={() => setActiveMenu('liked-jobs')}
            >
              좋아요 한 채용공고
            </Link>
            <Link 
              to="#" 
              className={`menu-item ${activeMenu === 'saved-jobs' ? 'active' : ''}`}
              onClick={() => setActiveMenu('saved-jobs')}
            >
              저장된 채용공고
            </Link>
            <Link 
              to="#" 
              className={`menu-item ${activeMenu === 'applied-projects' ? 'active' : ''}`}
              onClick={() => setActiveMenu('applied-projects')}
            >
              지원한 사이드 프로젝트
            </Link>
            <Link 
              to="#" 
              className={`menu-item ${activeMenu === 'liked-projects' ? 'active' : ''}`}
              onClick={() => setActiveMenu('liked-projects')}
            >
              좋아요 한 사이드 프로젝트
            </Link>
            <Link 
              to="#" 
              className={`menu-item ${activeMenu === 'saved-projects' ? 'active' : ''}`}
              onClick={() => setActiveMenu('saved-projects')}
            >
              저장한 사이드 프로젝트
            </Link>
          </nav>
        </div>
        
        {/* 오른쪽 컨텐츠 영역 */}
        <div className="mypage-main">
          {renderMainContent()}
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

      {/* 지원 취소 확인 모달 */}
      {showCancelModal && (
        <div className="cancel-modal-overlay">
          <div className="cancel-modal" ref={cancelModalRef}>
            <div className="cancel-modal-header">
              <h3>지원 취소 확인</h3>
            </div>
            <div className="cancel-modal-content">
              <p>정말 지원을 취소하시겠습니까?</p>
              <p className="cancel-warning">지원 취소 후에는 되돌릴 수 없습니다.</p>
            </div>
            <div className="cancel-modal-footer">
              <button 
                type="button" 
                className="cancel-button"
                onClick={closeCancelModal}
              >
                아니오
              </button>
              <button 
                type="button" 
                className="confirm-button"
                onClick={confirmCancelApply}
              >
                예, 취소합니다
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage; 