import React, { useState } from 'react';
import { IoMdHeartDislike } from 'react-icons/io';
import './LikedJobs.css';

const LikedJobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: '테크스타트',
      position: '백엔드 개발자',
      location: '서울 강남구',
      salary: '4,000~5,000만원',
      requirements: ['Java', 'Spring Boot', 'MySQL'],
      date: '2024-03-20',
      dDay: '7'
    },
    {
      id: 2,
      company: '클라우드코퍼레이션',
      position: '프론트엔드 개발자',
      location: '서울 서초구',
      salary: '3,500~4,500만원',
      requirements: ['React', 'TypeScript', 'Next.js'],
      date: '2024-03-18',
      dDay: '5'
    },
    {
      id: 3,
      company: '모바일테크',
      position: '안드로이드 개발자',
      location: '경기 성남시',
      salary: '3,800~4,800만원',
      requirements: ['Kotlin', 'Android', 'Firebase'],
      date: '2024-03-15',
      dDay: '2'
    }
  ]);

  const handleUnlike = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="liked-jobs-empty">
        <p>좋아요한 채용공고가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="liked-jobs-container">
      {jobs.map(job => (
        <div key={job.id} className="liked-jobs-job-card">
          <div className="liked-jobs-job-header">
            <h3 className="liked-jobs-job-title">{job.position}</h3>
            <button 
              className="liked-jobs-unlike-button"
              onClick={() => handleUnlike(job.id)}
            >
              <IoMdHeartDislike />
              <span>좋아요 취소</span>
            </button>
          </div>
          <div className="liked-jobs-company-info">
            <span className="liked-jobs-company-name">{job.company}</span>
            <span className="liked-jobs-location">{job.location}</span>
          </div>
          <div className="liked-jobs-job-info">
            <div className="liked-jobs-info-item">
              <span className="liked-jobs-label">연봉</span>
              <span className="liked-jobs-value">{job.salary}</span>
            </div>
          </div>
          <div className="liked-jobs-requirements">
            {job.requirements.map((req, index) => (
              <span key={index} className="liked-jobs-requirement-tag">
                {req}
              </span>
            ))}
          </div>
          <div className="liked-jobs-job-footer">
            <span className="liked-jobs-date">{job.date} 등록</span>
            <span className="liked-jobs-d-day">D-{job.dDay}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikedJobs; 