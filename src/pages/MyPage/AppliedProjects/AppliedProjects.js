import React, { useState } from 'react';
import { PiPencilSimpleSlashFill } from 'react-icons/pi';
import './AppliedProjects.css';
import { Link } from 'react-router-dom';

const AppliedProjects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: '음악 스트리밍 플랫폼 개발',
      description: '인디 뮤지션을 위한 음악 스트리밍 및 커뮤니티 플랫폼',
      techStack: ['React', 'Node.js', 'MongoDB', 'AWS'],
      positions: ['프론트엔드 개발자', '백엔드 개발자', 'DevOps'],
      startDate: '2024-04-05',
      duration: '5개월',
      status: '검토 중',
      appliedPosition: '프론트엔드 개발자',
      coverLetter: '안녕하세요. 3년차 프론트엔드 개발자입니다. React와 TypeScript를 주로 사용하며, 성능 최적화와 사용자 경험 개선에 관심이 많습니다.',
      resumeUrl: 'https://example.com/resume/kim.pdf',
      meetingRequest: null
    },
    {
      id: 2,
      title: '실시간 화상 교육 플랫폼',
      description: '온라인 교육을 위한 실시간 화상 수업 및 학습 관리 시스템',
      techStack: ['Vue.js', 'Spring Boot', 'WebRTC', 'Redis'],
      positions: ['프론트엔드 개발자', '백엔드 개발자', 'UI/UX 디자이너'],
      startDate: '2024-04-10',
      duration: '6개월',
      status: '미팅 요청',
      appliedPosition: '백엔드 개발자',
      coverLetter: '안녕하세요. 4년차 백엔드 개발자입니다. Spring Boot와 Node.js를 주로 사용하며, 마이크로서비스 아키텍처와 클라우드 인프라 구축에 관심이 많습니다.',
      resumeUrl: 'https://example.com/resume/lee.pdf',
      meetingRequest: {
        date: '2024-04-12',
        time: '14:00',
        location: '온라인 (Zoom)',
        status: 'pending' // pending, accepted, rejected
      }
    },
    {
      id: 3,
      title: '푸드테크 배달 서비스',
      description: 'AI 기반 맛집 추천과 실시간 배달 현황 추적 서비스',
      techStack: ['React Native', 'Django', 'PostgreSQL', 'TensorFlow'],
      positions: ['앱 개발자', '백엔드 개발자', 'AI 엔지니어'],
      startDate: '2024-04-15',
      duration: '4개월',
      status: '합류 결정',
      appliedPosition: '앱 개발자',
      coverLetter: '안녕하세요. 2년차 앱 개발자입니다. React Native와 Flutter를 주로 사용하며, 모바일 앱 성능 최적화와 사용자 경험 개선에 관심이 많습니다.',
      resumeUrl: 'https://example.com/resume/park.pdf',
      meetingRequest: null
    }
  ]);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const handleCancelClick = (project) => {
    setSelectedProject(project);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    // TODO: API 호출하여 지원 취소 처리
    console.log('지원 취소:', selectedProject);
    setShowCancelModal(false);
    setSelectedProject(null);
  };

  const handleCloseModal = () => {
    setShowCancelModal(false);
    setSelectedProject(null);
  };

  const handleCancel = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const handleMeetingResponse = (projectId, response) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          meetingRequest: {
            ...project.meetingRequest,
            status: response
          }
        };
      }
      return project;
    }));
    setShowMeetingModal(false);
  };

  if (!projects || projects.length === 0) {
    return (
      <div className="applied-projects-empty">
        <p>지원한 프로젝트가 없습니다.</p>
      </div>
    );
  }

  const getStatusClass = (status) => {
    switch (status) {
      case '검토 중':
        return 'status-reviewing';
      case '미팅 요청':
        return 'status-meeting';
      case '합류 결정':
        return 'status-accepted';
      case '다음 기회에':
        return 'status-rejected';
      default:
        return '';
    }
  };

  return (
    <div className="applied-projects-container">
      {projects.map(project => (
        <div key={project.id} className="applied-projects-project-card">
          <div className="applied-projects-project-header">
            <h3 className="applied-projects-project-title">{project.title}</h3>
            <button 
              className="applied-projects-cancel-button"
              onClick={() => handleCancel(project.id)}
            >
              <PiPencilSimpleSlashFill />
              <span>지원 취소</span>
            </button>
          </div>
          <p className="applied-projects-project-subtitle">{project.description}</p>
          <div className="applied-projects-project-info">
            <div className="applied-projects-info-item">
              <span className="applied-projects-label">지원 포지션</span>
              <span className="applied-projects-value">{project.appliedPosition}</span>
            </div>
            <div className="applied-projects-info-item">
              <span className="applied-projects-label">시작 예정</span>
              <span className="applied-projects-value">{project.startDate}</span>
            </div>
            <div className="applied-projects-info-item">
              <span className="applied-projects-label">예상 기간</span>
              <span className="applied-projects-value">{project.duration}</span>
            </div>
          </div>
          <div className="applied-projects-tech-stacks">
            <h4 className="applied-projects-section-title">기술 스택</h4>
            <div className="applied-projects-tags-container">
              {project.techStack.map((tech, index) => (
                <span key={index} className="applied-projects-tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="applied-projects-positions">
            <h4 className="applied-projects-section-title">모집 포지션</h4>
            <div className="applied-projects-tags-container">
              {project.positions.map((position, index) => (
                <span key={index} className="applied-projects-position-tag">
                  {position}
                </span>
              ))}
            </div>
          </div>
          <div className="applied-projects-documents">
            <Link 
              to={`/applicant/dummy0`}
              className="applied-projects-view-documents"
            >
              내 지원 서류 보기
            </Link>
          </div>
          <div className="applied-projects-project-footer">
            <span className="applied-projects-date">{project.startDate} 지원</span>
            <span className={`applied-projects-status ${getStatusClass(project.status)}`}>
              {project.status}
            </span>
          </div>
          {project.meetingRequest && project.meetingRequest.status === 'pending' && (
            <div className="applied-projects-meeting-request">
              <div className="applied-projects-meeting-info">
                <span className="applied-projects-meeting-label">미팅 일정</span>
                <span className="applied-projects-meeting-value">
                  {project.meetingRequest.date} {project.meetingRequest.time}
                </span>
                <span className="applied-projects-meeting-location">
                  {project.meetingRequest.location}
                </span>
              </div>
              <div className="applied-projects-meeting-actions">
                <button 
                  className="applied-projects-meeting-accept"
                  onClick={() => handleMeetingResponse(project.id, 'accepted')}
                >
                  참여하기
                </button>
                <button 
                  className="applied-projects-meeting-reject"
                  onClick={() => handleMeetingResponse(project.id, 'rejected')}
                >
                  거절하기
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {showCancelModal && (
        <div className="cancel-confirm-modal-overlay">
          <div className="cancel-confirm-modal">
            <h2>지원 취소</h2>
            <p>
              정말로 프로젝트 지원을 취소하시겠습니까?<br />
              취소 후에는 되돌릴 수 없습니다.
            </p>
            <div className="cancel-confirm-actions">
              <button className="cancel-no" onClick={handleCloseModal}>
                아니오
              </button>
              <button className="cancel-yes" onClick={handleConfirmCancel}>
                예, 취소할게요
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedProjects; 