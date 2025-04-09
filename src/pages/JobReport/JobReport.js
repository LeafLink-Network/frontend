import React from 'react';
import { Link } from 'react-router-dom';
import './JobReport.css';

// 채용 리포트 페이지 컴포넌트
const JobReport = () => {
  return (
    <div className="report-container">
      <h1 className="report-title">채용 리포트</h1>
      
      <div className="report-overview">
        <div className="report-left">
          <div className="report-section">
            <h2 className="section-title">직무별 채용 현황</h2>
            <div className="placeholder-chart"></div>
          </div>
        </div>
        
        <div className="report-right">
          <div className="report-section">
            <h2 className="section-title">채용 많은 직무 TOP 5</h2>
            <ul className="top-jobs-list">
              <li className="job-item">
                <div className="job-name-container">
                  <div className="job-rank">1.</div>
                  <div className="job-name">프론트엔드 개발자</div>
                </div>
                <div className="job-growth positive">+24%</div>
              </li>
              <li className="job-item">
                <div className="job-name-container">
                  <div className="job-rank">2.</div>
                  <div className="job-name">백엔드 개발자</div>
                </div>
                <div className="job-growth positive">+18%</div>
              </li>
              <li className="job-item">
                <div className="job-name-container">
                  <div className="job-rank">3.</div>
                  <div className="job-name">PM/PO</div>
                </div>
                <div className="job-growth positive">+15%</div>
              </li>
              <li className="job-item">
                <div className="job-name-container">
                  <div className="job-rank">4.</div>
                  <div className="job-name">데이터 분석가</div>
                </div>
                <div className="job-growth positive">+12%</div>
              </li>
              <li className="job-item">
                <div className="job-name-container">
                  <div className="job-rank">5.</div>
                  <div className="job-name">UI/UX 디자이너</div>
                </div>
                <div className="job-growth positive">+10%</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="report-3-columns">
        <div className="report-column">
          <div className="report-section">
            <h2 className="section-title">개발자 필수 스킬</h2>
            <div className="skills-tags">
              <span className="skill-tag">Python</span>
              <span className="skill-tag">AWS</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Docker</span>
              <span className="skill-tag">React</span>
            </div>
          </div>
        </div>
        
        <div className="report-column">
          <div className="report-section">
            <h2 className="section-title">지역별 채용 분포</h2>
            <div className="distribution-list">
              <div className="distribution-item">
                <div className="region-name">서울</div>
                <div className="region-bar-container">
                  <div className="region-bar" style={{width: '65%'}}></div>
                </div>
                <div className="region-percentage">65%</div>
              </div>
              <div className="distribution-item">
                <div className="region-name">경기</div>
                <div className="region-bar-container">
                  <div className="region-bar" style={{width: '20%'}}></div>
                </div>
                <div className="region-percentage">20%</div>
              </div>
              <div className="distribution-item">
                <div className="region-name">지방</div>
                <div className="region-bar-container">
                  <div className="region-bar" style={{width: '15%'}}></div>
                </div>
                <div className="region-percentage">15%</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="report-column">
          <div className="report-section">
            <h2 className="section-title">평균 연봉 현황</h2>
            <div className="salary-list">
              <div className="salary-item">
                <div className="position-level">신입</div>
                <div className="salary-amount">3,500만원</div>
              </div>
              <div className="salary-item">
                <div className="position-level">주니어(3년)</div>
                <div className="salary-amount">4,500만원</div>
              </div>
              <div className="salary-item">
                <div className="position-level">미들(5년)</div>
                <div className="salary-amount">5,500만원</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="report-section">
        <h2 className="section-title">채용 트렌드 분석</h2>
        <p className="trend-text">
          최근 커머스 분야 PM 채용이 크게 증가하고 있습니다. 특히 대형 이커머스 기업들의 신규 서비스 출시로 인해 프로덕트 매니저 수요가 늘었습니다. 또한 AI/ML 엔지니어 채용도 꾸준히 증가하고 있으며, 클라우드 네이티브 개발 경험을 가진 개발자의 수요도 높아지고 있습니다.
        </p>
      </div>
      
      <div className="report-summary-link">
        <Link to="/reports/analysis" className="summary-button">
          채용 리포트 요약 보러가기
        </Link>
      </div>
    </div>
  );
};

export default JobReport; 