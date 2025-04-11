import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHeart, FaBookmark, FaRegBookmark, FaComment, FaPencilAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { IoMdHeartDislike } from "react-icons/io";
import { MdBookmarkRemove } from "react-icons/md";
import { PiPencilSimpleSlashFill } from "react-icons/pi";
import './MyPage.css';
import LikedPosts from './LikedPosts/LikedPosts';
import LikedJobs from './LikedJobs/LikedJobs';
import SavedJobs from './SavedJobs/SavedJobs';
import AppliedProjects from './AppliedProjects/AppliedProjects';
import LikedProjects from './LikedProjects/LikedProjects';
import SavedProjects from './SavedProjects/SavedProjects';
import EditProfile from './EditProfile/EditProfile';

const MyPage = () => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [profileImage, setProfileImage] = useState('/profile.png');
  const location = useLocation();
  
  // URL 변경 감지하여 activeMenu 설정
  useEffect(() => {
    const path = location.pathname;
    if (path === '/mypage') {
      setActiveMenu('main');
    } else if (path === '/mypage/edit') {
      setActiveMenu('edit-profile');
    } else if (path === '/mypage/recruiting') {
      setActiveMenu('recruiting-projects');
    } else if (path === '/mypage/liked-posts') {
      setActiveMenu('liked-posts');
    } else if (path === '/mypage/liked-jobs') {
      setActiveMenu('liked-jobs');
    } else if (path === '/mypage/saved-jobs') {
      setActiveMenu('saved-jobs');
    } else if (path === '/mypage/applied-projects') {
      setActiveMenu('applied-projects');
    } else if (path === '/mypage/liked-projects') {
      setActiveMenu('liked-projects');
    } else if (path === '/mypage/saved-projects') {
      setActiveMenu('saved-projects');
    }
  }, [location]);

  // 좋아요한 게시글 렌더링
  const renderLikedPosts = () => {
    return <LikedPosts />;
  };

  // 좋아요한 채용공고 렌더링
  const renderLikedJobs = () => {
    return <LikedJobs />;
  };

  // 저장된 채용공고 렌더링
  const renderSavedJobs = () => {
    return <SavedJobs />;
  };

  // 지원한 프로젝트 렌더링
  const renderAppliedProjects = () => {
    return <AppliedProjects />;
  };

  // 좋아요한 프로젝트 렌더링
  const renderLikedProjects = () => {
    return <LikedProjects />;
  };

  // 저장한 프로젝트 렌더링
  const renderSavedProjects = () => {
    return <SavedProjects />;
  };

  // 모집 중인 프로젝트 렌더링
  const renderRecruitingProjects = () => {
    return <SavedProjects filter="recruiting" />;
  };

  // 메인 영역 컨텐츠 결정
  const renderMainContent = () => {
    if (activeMenu === 'edit-profile') {
      return <EditProfile />;
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
    } else if (activeMenu === 'recruiting-projects') {
      return renderRecruitingProjects();
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
            <Link to="/myreport" className="report-link-card" data-discover="true">
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
         activeMenu === 'saved-projects' ? '저장한 사이드 프로젝트' :
         activeMenu === 'recruiting-projects' ? '모집 중인 사이드 프로젝트' : '마이페이지'}
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
              className={`menu-item ${activeMenu === 'main' ? 'active' : ''}`}
              to="/mypage"
              onClick={() => setActiveMenu('main')}
            >
              마이페이지
            </Link>
            <Link 
              className={`menu-item ${activeMenu === 'edit-profile' ? 'active' : ''}`}
              to="/mypage/edit"
              onClick={() => setActiveMenu('edit-profile')}
            >
              내 정보 수정
            </Link>
            <Link 
              className={`menu-item ${activeMenu === 'recruiting-projects' ? 'active' : ''}`} 
              to="/mypage/recruiting"
              onClick={() => setActiveMenu('recruiting-projects')}
            >
              내 사이드 프로젝트
            </Link>
            <Link 
              className={`menu-item ${activeMenu === 'liked-posts' ? 'active' : ''}`}
              to="/mypage/liked-posts"
              onClick={() => setActiveMenu('liked-posts')}
            >
              좋아요 한 게시글
            </Link>
            <Link 
              className={`menu-item ${activeMenu === 'liked-jobs' ? 'active' : ''}`}
              to="/mypage/liked-jobs"
              onClick={() => setActiveMenu('liked-jobs')}
            >
              좋아요 한 채용공고
            </Link>
            <Link 
              className={`menu-item ${activeMenu === 'saved-jobs' ? 'active' : ''}`}
              to="/mypage/saved-jobs"
              onClick={() => setActiveMenu('saved-jobs')}
            >
              저장된 채용공고
            </Link>
            <Link 
              className={`menu-item ${activeMenu === 'applied-projects' ? 'active' : ''}`}
              to="/mypage/applied-projects"
              onClick={() => setActiveMenu('applied-projects')}
            >
              지원한 사이드 프로젝트
            </Link>
            <Link 
              className={`menu-item ${activeMenu === 'liked-projects' ? 'active' : ''}`}
              to="/mypage/liked-projects"
              onClick={() => setActiveMenu('liked-projects')}
            >
              좋아요 한 사이드 프로젝트
            </Link>
            <Link 
              className={`menu-item ${activeMenu === 'saved-projects' ? 'active' : ''}`}
              to="/mypage/saved-projects"
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
    </div>
  );
};

export default MyPage; 