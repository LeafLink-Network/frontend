import React, { useState } from 'react';
import { IoMdHeartDislike } from 'react-icons/io';
import './LikedProjects.css';

const LikedProjects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: '음악 스트리밍 플랫폼 개발',
      description: '인디 뮤지션을 위한 음악 스트리밍 및 커뮤니티 플랫폼',
      techStack: ['React', 'Node.js', 'MongoDB', 'AWS'],
      positions: ['프론트엔드 개발자', '백엔드 개발자', 'DevOps'],
      startDate: '2024-04-05',
      duration: '5개월',
      status: '모집중'
    },
    {
      id: 2,
      title: '실시간 화상 교육 플랫폼',
      description: '온라인 교육을 위한 실시간 화상 수업 및 학습 관리 시스템',
      techStack: ['Vue.js', 'Spring Boot', 'WebRTC', 'Redis'],
      positions: ['프론트엔드 개발자', '백엔드 개발자', 'UI/UX 디자이너'],
      startDate: '2024-04-10',
      duration: '6개월',
      status: '모집중'
    },
    {
      id: 3,
      title: '푸드테크 배달 서비스',
      description: 'AI 기반 맛집 추천과 실시간 배달 현황 추적 서비스',
      techStack: ['React Native', 'Django', 'PostgreSQL', 'TensorFlow'],
      positions: ['앱 개발자', '백엔드 개발자', 'AI 엔지니어'],
      startDate: '2024-04-15',
      duration: '4개월',
      status: '모집완료'
    }
  ]);

  const handleUnlike = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="liked-projects-empty">
        <p>좋아요한 프로젝트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="liked-projects-container">
      {projects.map(project => (
        <div key={project.id} className="liked-projects-project-card">
          <div className="liked-projects-project-header">
            <h3 className="liked-projects-project-title">{project.title}</h3>
            <button 
              className="liked-projects-unlike-button"
              onClick={() => handleUnlike(project.id)}
            >
              <IoMdHeartDislike />
              <span>좋아요 취소</span>
            </button>
          </div>
          <p className="liked-projects-project-subtitle">{project.description}</p>
          <div className="liked-projects-project-info">
            <div className="liked-projects-info-item">
              <span className="liked-projects-label">시작 예정</span>
              <span className="liked-projects-value">{project.startDate}</span>
            </div>
            <div className="liked-projects-info-item">
              <span className="liked-projects-label">예상 기간</span>
              <span className="liked-projects-value">{project.duration}</span>
            </div>
          </div>
          <div className="liked-projects-tech-stacks">
            <h4 className="liked-projects-section-title">기술 스택</h4>
            <div className="liked-projects-tags-container">
              {project.techStack.map((tech, index) => (
                <span key={index} className="liked-projects-tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="liked-projects-positions">
            <h4 className="liked-projects-section-title">모집 포지션</h4>
            <div className="liked-projects-tags-container">
              {project.positions.map((position, index) => (
                <span key={index} className="liked-projects-position-tag">
                  {position}
                </span>
              ))}
            </div>
          </div>
          <div className="liked-projects-project-footer">
            <span className="liked-projects-date">{project.startDate} 등록</span>
            <span className="liked-projects-status">{project.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikedProjects; 