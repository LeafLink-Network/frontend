import React, { useState } from 'react';
import { MdBookmarkRemove } from 'react-icons/md';
import './SavedJobs.css';

const SavedJobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: '디지털솔루션',
      position: '데이터 엔지니어',
      location: '서울 영등포구',
      salary: '4,500~5,500만원',
      requirements: ['Python', 'Spark', 'AWS'],
      date: '2024-03-19',
      dDay: 'D-6'
    },
    {
      id: 2,
      company: '핀테크랩',
      position: '블록체인 개발자',
      location: '서울 강남구',
      salary: '5,000~6,000만원',
      requirements: ['Solidity', 'Node.js', 'Web3.js'],
      date: '2024-03-17',
      dDay: 'D-4'
    },
    {
      id: 3,
      company: 'AI스타트',
      position: 'AI 엔지니어',
      location: '서울 마포구',
      salary: '4,000~5,000만원',
      requirements: ['Python', 'TensorFlow', 'PyTorch'],
      date: '2024-03-16',
      dDay: 'D-3'
    }
  ]);

  const handleRemove = (jobId) => {
    setJobs(jobs.filter(job => job.id !== jobId));
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="saved-jobs-empty">
        <p>저장한 채용공고가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="saved-jobs-container">
      {jobs.map(job => (
        <div key={job.id} className="saved-jobs-job-card">
          <div className="saved-jobs-job-header">
            <h3 className="saved-jobs-job-title">{job.company}</h3>
            <button 
              className="saved-jobs-unsave-button"
              onClick={() => handleRemove(job.id)}
            >
              <MdBookmarkRemove />
              <span>저장 취소</span>
            </button>
          </div>
          <div className="saved-jobs-company-info">
            <span className="saved-jobs-company-name">{job.company}</span>
            <span className="saved-jobs-location">{job.location}</span>
          </div>
          <div className="saved-jobs-job-info">
            <div className="saved-jobs-info-item">
              <span className="saved-jobs-label">연봉</span>
              <span className="saved-jobs-value">{job.salary}</span>
            </div>
          </div>
          <div className="saved-jobs-requirements">
            {job.requirements.map((req, index) => (
              <span key={index} className="saved-jobs-requirement-tag">
                {req}
              </span>
            ))}
          </div>
          <div className="saved-jobs-job-footer">
            <span className="saved-jobs-date">{job.date} 등록</span>
            <span className="saved-jobs-d-day">D-{job.dDay}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedJobs; 