import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideProjectList.css';

const SideProjectList = () => {
  const navigate = useNavigate();
  const [searchProject, setSearchProject] = useState('');
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [showTechDropdown, setShowTechDropdown] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // 기술 스택 목록
  const techStacks = ['React', 'Node.js', 'Python', 'Java', 'Spring', 'Vue.js', 'Django', 'JavaScript', 'TypeScript'];
  
  // 포지션 목록
  const positions = ['프론트엔드', '백엔드', '풀스택', 'DevOps', '디자이너', 'PM'];

  // 임시 프로젝트 데이터
  const projects = [
    {
      id: 1,
      title: 'AI 기반 이미지 생성 플랫폼',
      likes: 25,
      comments: 12,
      techStacks: ['Python', 'React', 'TensorFlow'],
      positions: ['풀스택', '프론트엔드'],
      members: 3,
      date: '2024-03-31',
      status: '모집중'
    },
    {
      id: 2,
      title: '블록체인 기반 거래 시스템',
      likes: 18,
      comments: 8,
      techStacks: ['Solidity', 'React', 'Node.js'],
      positions: ['백엔드', 'DevOps'],
      members: 2,
      date: '2024-04-15',
      status: '모집중'
    },
    {
      id: 3,
      title: '실시간 협업 툴 개발',
      likes: 32,
      comments: 15,
      techStacks: ['Vue.js', 'Firebase', 'WebRTC'],
      positions: ['프론트엔드', '백엔드'],
      members: 4,
      date: '2024-04-10',
      status: '모집중'
    },
    {
      id: 4,
      title: '모바일 헬스케어 앱',
      likes: 21,
      comments: 9,
      techStacks: ['React Native', 'Node.js', 'MongoDB'],
      positions: ['풀스택', 'UI/UX 디자이너'],
      members: 3,
      date: '2024-04-20',
      status: '모집중'
    },
    {
      id: 5,
      title: '데이터 분석 대시보드',
      likes: 15,
      comments: 6,
      techStacks: ['Python', 'Django', 'React'],
      positions: ['백엔드', '데이터 엔지니어'],
      members: 2,
      date: '2024-04-05',
      status: '마감임박'
    },
    {
      id: 6,
      title: '소셜 네트워크 서비스',
      likes: 28,
      comments: 14,
      techStacks: ['React', 'Spring Boot', 'MySQL'],
      positions: ['프론트엔드', '백엔드', 'DevOps'],
      members: 5,
      date: '2024-04-25',
      status: '모집중'
    },
    {
      id: 7,
      title: 'IoT 스마트홈 플랫폼',
      likes: 23,
      comments: 11,
      techStacks: ['Node.js', 'MQTT', 'React'],
      positions: ['백엔드', 'IoT 개발자'],
      members: 3,
      date: '2024-04-18',
      status: '모집중'
    },
    {
      id: 8,
      title: '온라인 교육 플랫폼',
      likes: 19,
      comments: 7,
      techStacks: ['Vue.js', 'Django', 'PostgreSQL'],
      positions: ['풀스택', 'UI/UX 디자이너'],
      members: 4,
      date: '2024-04-12',
      status: '마감임박'
    },
    {
      id: 9,
      title: '인공지능 챗봇 서비스',
      likes: 31,
      comments: 16,
      techStacks: ['Python', 'TensorFlow', 'FastAPI'],
      positions: ['머신러닝 엔지니어', '백엔드'],
      members: 3,
      date: '2024-04-28',
      status: '모집중'
    },
    {
      id: 10,
      title: '크로스플랫폼 게임 개발',
      likes: 27,
      comments: 13,
      techStacks: ['Unity', 'C#', 'Node.js'],
      positions: ['게임 개발자', '그래픽 디자이너'],
      members: 4,
      date: '2024-04-22',
      status: '모집중'
    }
  ];

  const handleTechStackSelect = (tech) => {
    if (selectedTechStacks.includes(tech)) {
      setSelectedTechStacks(selectedTechStacks.filter(item => item !== tech));
    } else {
      setSelectedTechStacks([...selectedTechStacks, tech]);
    }
  };

  const handlePositionSelect = (position) => {
    if (selectedPositions.includes(position)) {
      setSelectedPositions(selectedPositions.filter(item => item !== position));
    } else {
      setSelectedPositions([...selectedPositions, position]);
    }
  };

  const handleSearch = () => {
    // 검색 로직 구현
    console.log('Search:', { searchProject, selectedTechStacks, selectedPositions });
  };

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="project-list-container">
      <h1 className="project-list-title">원하는 사이드프로젝트를 찾아보세요</h1>
      
      <div className="search-section">
        <div className="search-filters">
          <div className="filter-group">
            <div className="dropdown-container">
              <button 
                className="dropdown-button"
                onClick={() => setShowTechDropdown(!showTechDropdown)}
              >
                {selectedTechStacks.length > 0 
                  ? `선택된 기술스택 (${selectedTechStacks.length})`
                  : '기술스택 선택'}
              </button>
              {showTechDropdown && (
                <div className="dropdown-content">
                  {techStacks.map(tech => (
                    <label key={tech} className="tech-option">
                      <input
                        type="checkbox"
                        checked={selectedTechStacks.includes(tech)}
                        onChange={() => handleTechStackSelect(tech)}
                      />
                      {tech}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="dropdown-container">
              <button 
                className="dropdown-button"
                onClick={() => setShowPositionDropdown(!showPositionDropdown)}
              >
                {selectedPositions.length > 0 
                  ? `선택된 포지션 (${selectedPositions.length})`
                  : '포지션 선택'}
              </button>
              {showPositionDropdown && (
                <div className="dropdown-content">
                  {positions.map(position => (
                    <label key={position} className="position-option">
                      <input
                        type="checkbox"
                        checked={selectedPositions.includes(position)}
                        onChange={() => handlePositionSelect(position)}
                      />
                      {position}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="프로젝트 검색"
              value={searchProject}
              onChange={(e) => setSearchProject(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>검색</button>
          </div>

          <div className="filter-buttons">
            <button className="filter-button">모집 중인 프로젝트</button>
            <button className="filter-button">마감임박 프로젝트</button>
          </div>
        </div>
      </div>

      <div className="project-list-header">
        <Link to="/project/create" className="create-project-button">
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          프로젝트 생성
        </Link>
        <div className="sort-text">
          <span>최신순</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <div className="project-list">
        <div className="project-header">
          <div className="header-item">프로젝트명</div>
          <div className="header-item">기술 스택</div>
          <div className="header-item">포지션</div>
          <div className="header-item">모집 인원</div>
          <div className="header-item">마감일</div>
          <div className="header-item">상태</div>
        </div>
        
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="project-item"
            onClick={() => handleProjectClick(project.id)}
          >
            <div className="project-title">
              <span>{project.title}</span>
              <div className="post-meta">
                <div className="post-stats">
                  <span className="like-count">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="like-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                    </svg>
                    {project.likes}
                  </span>
                  <span className="comment-count">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="comment-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path>
                    </svg>
                    {project.comments}
                  </span>
                </div>
              </div>
            </div>
            <div className="project-tech-stack">
              {project.techStacks.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-positions">
              {project.positions.map((position, index) => (
                <span key={index} className="position-tag">{position}</span>
              ))}
            </div>
            <div className="project-members">{project.members}명</div>
            <div className="project-date">{project.date}</div>
            <div className={`project-status ${project.status === '모집중' ? 'recruiting' : project.status === '마감임박' ? 'urgent' : 'closed'}`}>
              {project.status}
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button>&lt;</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <span>...</span>
        <button>10</button>
        <button>&gt;</button>
      </div>
    </div>
  );
};

export default SideProjectList;
