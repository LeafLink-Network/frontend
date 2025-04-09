import React from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import './JobReport.css';

const ReportAnalysis = () => {
  return (
    <div className="report-container">
      <h1 className="report-title">채용 리포트 요약</h1>
      
      <div className="home__search">
        <div className="search__bar">
          <input type="text" placeholder="원하는 회사를 검색하세요" />
          <button className="search__button">
            <IoSearch size={20} />
            검색
          </button>
        </div>
        <div className="search__tags">
          <span className="tag">#개발자</span>
          <span className="tag">#백엔드</span>
          <span className="tag">#프론트</span>
          <span className="tag">#PM</span>
        </div>
      </div>
      
      <div className="company-header">
        <h2 className="company-title">LG Careers <span className="job-type">백엔드 개발자</span></h2>
      </div>
      
      <div className="skills-section">
        <h3 className="section-subtitle">주요 기술 스택</h3>
        <div className="skills-tags">
          <span className="skill-tag">Figma</span>
          <span className="skill-tag">Adobe XD</span>
          <span className="skill-tag">3년 이상</span>
        </div>
      </div>
      
      <div className="report-2-columns">
        <div className="report-column">
          <div className="section-box">
            <h3 className="section-subtitle">우대사항</h3>
            <ul className="bullet-list">
              <li>대규모 트래픽 처리 경험</li>
              <li>MSA 아키텍처 이해</li>
              <li>인증형 웹 개발 경험</li>
            </ul>
          </div>
        </div>
        
        <div className="report-column">
          <div className="section-box">
            <h3 className="section-subtitle">최근 채용 트렌드</h3>
            <ul className="bullet-list">
              <li>LG는 최근 클라우드 기반 시스템 전환을 적극적으로 진행 중</li>
              <li>경력직 비중 증가: 실무 능력 중심의 채용 강화</li>
              <li>직무별 과제 채용 요구 증가</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="report-2-columns">
        <div className="report-column">
          <div className="section-box">
            <h3 className="section-subtitle">면접 질문 예시</h3>
            <ul className="bullet-list speech-bubble">
              <li>"대규모 트래픽을 어떻게 효율적으로 처리했는가?"</li>
              <li>"MSA 전환 시 고려했던 요소는?"</li>
            </ul>
          </div>
        </div>
        
        <div className="report-column">
          <div className="section-box">
            <h3 className="section-subtitle">추천 준비 방향</h3>
            <ul className="bullet-list check-list">
              <li>프로젝트 경험 중 실제 트래픽 처리/배포 경험 중심으로 정리</li>
              <li>Spring Boot + AWS 기반 실무 경험 어필 필요</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="button-container">
        <Link to="/reports/summary" className="report-button">
          채용 리포트 둘러보기
        </Link>
      </div>
    </div>
  );
};

export default ReportAnalysis; 