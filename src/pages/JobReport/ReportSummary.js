import React from 'react';
import { Link } from 'react-router-dom';
import './JobReport.css';

// 채용 리포트 요약 페이지 컴포넌트
const ReportSummary = () => {
  return (
    <div className="report-container">
      <h1 className="report-title">내 직무 기반 리포트</h1>
      
      <div className="job-profile">
        <div className="job-profile-header">
          <div className="profile-icon">
            <span>BE</span>
          </div>
          <div className="profile-info">
            <h2>백엔드 개발자</h2>
            <p>지난 30일간 채용 공고 분석 결과입니다.</p>
          </div>
        </div>
      </div>
      
      <div className="summary-header">
        <div className="summary-box">
          <h2 className="summary-value">1,248개</h2>
          <p className="summary-label">총 채용공고</p>
        </div>
        <div className="summary-box">
          <h2 className="summary-value">5,250만원</h2>
          <p className="summary-label">평균 연봉</p>
        </div>
        <div className="summary-box">
          <h2 className="summary-value">+12.4%</h2>
          <p className="summary-label">전월 대비 증가율</p>
        </div>
      </div>
      
      <div className="report-section">
        <h2 className="section-title">백엔드 개발자 채용 트렌드</h2>
        <div className="trend-chart placeholder-chart"></div>
        <div className="trend-insights">
          <div className="insight-item">
            <div className="insight-icon">📈</div>
            <div className="insight-content">
              <h3>클라우드 기술 수요 증가</h3>
              <p>AWS, Azure, GCP 등 클라우드 환경 경험이 있는 백엔드 개발자 선호도가 20% 증가했습니다.</p>
            </div>
          </div>
          <div className="insight-item">
            <div className="insight-icon">🔄</div>
            <div className="insight-content">
              <h3>MSA 아키텍처 전환</h3>
              <p>많은 기업들이 마이크로서비스 아키텍처로 전환 중이며, 관련 경험을 가진 개발자 수요가 높습니다.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="report-3-columns">
        <div className="report-column">
          <div className="report-section">
            <h2 className="section-title">필수 기술 스택</h2>
            <div className="skill-demand-list">
              <div className="skill-demand-item">
                <div className="skill-name">Spring</div>
                <div className="skill-demand-bar-container">
                  <div className="skill-demand-bar" style={{width: '85%'}}></div>
                  <span className="skill-demand-percentage">85%</span>
                </div>
              </div>
              <div className="skill-demand-item">
                <div className="skill-name">MySQL</div>
                <div className="skill-demand-bar-container">
                  <div className="skill-demand-bar" style={{width: '78%'}}></div>
                  <span className="skill-demand-percentage">78%</span>
                </div>
              </div>
              <div className="skill-demand-item">
                <div className="skill-name">Java</div>
                <div className="skill-demand-bar-container">
                  <div className="skill-demand-bar" style={{width: '72%'}}></div>
                  <span className="skill-demand-percentage">72%</span>
                </div>
              </div>
              <div className="skill-demand-item">
                <div className="skill-name">AWS</div>
                <div className="skill-demand-bar-container">
                  <div className="skill-demand-bar" style={{width: '65%'}}></div>
                  <span className="skill-demand-percentage">65%</span>
                </div>
              </div>
              <div className="skill-demand-item">
                <div className="skill-name">Docker</div>
                <div className="skill-demand-bar-container">
                  <div className="skill-demand-bar" style={{width: '58%'}}></div>
                  <span className="skill-demand-percentage">58%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="report-column">
          <div className="report-section">
            <h2 className="section-title">경력별 채용 비중</h2>
            <div className="donut-chart-container">
              <div className="donut-chart">
                <div className="donut-segment junior"></div>
                <div className="donut-segment middle"></div>
                <div className="donut-segment senior"></div>
                <div className="donut-hole">
                  <div className="donut-text">경력</div>
                </div>
              </div>
              <div className="donut-legend">
                <div className="legend-item">
                  <span className="legend-color junior"></span>
                  <span className="legend-text">신입 ~ 3년 (25%)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color middle"></span>
                  <span className="legend-text">3년 ~ 7년 (45%)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color senior"></span>
                  <span className="legend-text">7년 이상 (30%)</span>
                </div>
              </div>
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
                  <div className="region-bar" style={{width: '68%'}}></div>
                </div>
                <div className="region-percentage">68%</div>
              </div>
              <div className="distribution-item">
                <div className="region-name">경기</div>
                <div className="region-bar-container">
                  <div className="region-bar" style={{width: '22%'}}></div>
                </div>
                <div className="region-percentage">22%</div>
              </div>
              <div className="distribution-item">
                <div className="region-name">부산</div>
                <div className="region-bar-container">
                  <div className="region-bar" style={{width: '5%'}}></div>
                </div>
                <div className="region-percentage">5%</div>
              </div>
              <div className="distribution-item">
                <div className="region-name">기타</div>
                <div className="region-bar-container">
                  <div className="region-bar" style={{width: '5%'}}></div>
                </div>
                <div className="region-percentage">5%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="report-section">
        <h2 className="section-title">경력별 평균 연봉</h2>
        <div className="salary-chart">
          <div className="salary-chart-bar">
            <div className="salary-label">신입 ~ 3년</div>
            <div className="salary-bar-container">
              <div className="salary-bar" style={{width: '60%'}}>
                <span className="salary-amount">4,000만원</span>
              </div>
            </div>
          </div>
          <div className="salary-chart-bar">
            <div className="salary-label">3년 ~ 7년</div>
            <div className="salary-bar-container">
              <div className="salary-bar" style={{width: '78%'}}>
                <span className="salary-amount">5,250만원</span>
              </div>
            </div>
          </div>
          <div className="salary-chart-bar">
            <div className="salary-label">7년 이상</div>
            <div className="salary-bar-container">
              <div className="salary-bar" style={{width: '100%'}}>
                <span className="salary-amount">6,800만원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="report-section">
        <h2 className="section-title">주요 채용기업 플랫폼 분석</h2>
        <div className="company-platform-list">
          <div className="platform-item">
            <div className="platform-logo">🏢</div>
            <div className="platform-info">
              <h3 className="platform-name">대기업</h3>
              <div className="platform-stats">
                <span className="platform-stat">평균연봉: 6,300만원</span>
                <span className="platform-stat">전체 채용의 35%</span>
              </div>
              <div className="platform-skills">
                <span className="platform-skill">Spring</span>
                <span className="platform-skill">MSA</span>
                <span className="platform-skill">AWS</span>
                <span className="platform-skill">Kubernetes</span>
              </div>
            </div>
          </div>
          <div className="platform-item">
            <div className="platform-logo">🚀</div>
            <div className="platform-info">
              <h3 className="platform-name">스타트업</h3>
              <div className="platform-stats">
                <span className="platform-stat">평균연봉: 5,100만원</span>
                <span className="platform-stat">전체 채용의 40%</span>
              </div>
              <div className="platform-skills">
                <span className="platform-skill">Node.js</span>
                <span className="platform-skill">NoSQL</span>
                <span className="platform-skill">Docker</span>
                <span className="platform-skill">CI/CD</span>
              </div>
            </div>
          </div>
          <div className="platform-item">
            <div className="platform-logo">🌍</div>
            <div className="platform-info">
              <h3 className="platform-name">외국계</h3>
              <div className="platform-stats">
                <span className="platform-stat">평균연봉: 7,200만원</span>
                <span className="platform-stat">전체 채용의 25%</span>
              </div>
              <div className="platform-skills">
                <span className="platform-skill">Java</span>
                <span className="platform-skill">Cloud</span>
                <span className="platform-skill">Microservices</span>
                <span className="platform-skill">DevOps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="button-container">
        <Link to="/reports/analysis" className="report-button">
          기업별 채용 요약 보기
        </Link>
      </div>
    </div>
  );
};

export default ReportSummary; 