import React from 'react';
import { Link } from 'react-router-dom';
import '../JobReport/JobReport.css';

// 내 직무 기반 리포트 페이지 (마이페이지에서 연결되는 개인화된 리포트)
const MyReport = () => {
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
            <p>홍길동님의 직무 맞춤형 채용 분석 리포트입니다.</p>
          </div>
        </div>
      </div>
      
      <div className="summary-header">
        <div className="summary-box">
          <h2 className="summary-value">1,248개</h2>
          <p className="summary-label">백엔드 채용공고</p>
        </div>
        <div className="summary-box">
          <h2 className="summary-value">5,250만원</h2>
          <p className="summary-label">평균 연봉</p>
        </div>
        <div className="summary-box">
          <h2 className="summary-value">82%</h2>
          <p className="summary-label">스킬 일치율</p>
        </div>
      </div>
      
      <div className="report-section">
        <h2 className="section-title">나의 기술 스택 분석</h2>
        <p className="subtitle">홍길동님의 선택한 기술 스택과 현재 채용 시장의 요구사항을 비교했습니다.</p>
        <div className="trend-insights">
          <div className="insight-item">
            <div className="insight-icon">🔍</div>
            <div className="insight-content">
              <h3>기술 매칭 분석</h3>
              <p>보유 기술인 Spring, Java, MySQL은 현재 채용 시장에서 가장 수요가 높은 기술과 일치합니다.</p>
            </div>
          </div>
          <div className="insight-item">
            <div className="insight-icon">💡</div>
            <div className="insight-content">
              <h3>추천 보완 기술</h3>
              <p>현재 시장 트렌드를 고려할 때, Docker와 Kubernetes 기술을 추가로 습득하면 경쟁력이 더욱 높아질 것입니다.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="report-3-columns">
        <div className="report-column">
          <div className="report-section">
            <h2 className="section-title">나의 기술 스킬 시장 가치</h2>
            <div className="skill-demand-list">
              <div className="skill-demand-item">
                <div className="skill-name">Spring (보유)</div>
                <div className="skill-demand-bar-container">
                  <div className="skill-demand-bar" style={{width: '85%'}}></div>
                  <span className="skill-demand-percentage">85%</span>
                </div>
              </div>
              <div className="skill-demand-item">
                <div className="skill-name">Java (보유)</div>
                <div className="skill-demand-bar-container">
                  <div className="skill-demand-bar" style={{width: '72%'}}></div>
                  <span className="skill-demand-percentage">72%</span>
                </div>
              </div>
              <div className="skill-demand-item">
                <div className="skill-name">MySQL (보유)</div>
                <div className="skill-demand-bar-container">
                  <div className="skill-demand-bar" style={{width: '78%'}}></div>
                  <span className="skill-demand-percentage">78%</span>
                </div>
              </div>
              <div className="skill-demand-item">
                <div className="skill-name">AWS (미보유)</div>
                <div className="skill-demand-bar-container">
                  <div className="skill-demand-bar" style={{width: '65%', backgroundColor: '#ccc'}}></div>
                  <span className="skill-demand-percentage">65%</span>
                </div>
              </div>
              <div className="skill-demand-item">
                <div className="skill-name">Docker (미보유)</div>
                <div className="skill-demand-bar-container">
                  <div className="skill-demand-bar" style={{width: '58%', backgroundColor: '#ccc'}}></div>
                  <span className="skill-demand-percentage">58%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="report-column">
          <div className="report-section">
            <h2 className="section-title">내 경력 단계 채용 비중</h2>
            <div className="donut-chart-container">
              <div className="donut-chart">
                <div className="donut-segment middle" style={{background: '#15CB96'}}></div>
                <div className="donut-hole">
                  <div className="donut-text">현재<br/>경력</div>
                </div>
              </div>
              <div className="donut-legend">
                <div className="legend-item">
                  <span className="legend-color" style={{backgroundColor: '#15CB96'}}></span>
                  <span className="legend-text">3년차 (현재 경력)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-text" style={{fontWeight: 'bold', marginLeft: '20px'}}>채용 공고의 45%가 현재 경력 단계를 요구합니다.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="report-column">
          <div className="report-section">
            <h2 className="section-title">내 위치 기반 채용 분포</h2>
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
              <div className="region-note" style={{marginTop: '10px', fontSize: '14px', color: '#666'}}>
                <p>현재 위치 (도봉구) 반경 10km 내 채용: <strong>12개</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="report-section">
        <h2 className="section-title">나의 경력 단계 평균 연봉</h2>
        <div className="salary-chart">
          <div className="salary-chart-bar">
            <div className="salary-label">신입 ~ 3년</div>
            <div className="salary-bar-container">
              <div className="salary-bar" style={{width: '60%', backgroundColor: '#15CB96'}}>
                <span className="salary-amount">4,000만원</span>
              </div>
            </div>
            <div className="salary-note" style={{marginLeft: '10px', fontSize: '14px', color: '#15CB96'}}>현재 단계</div>
          </div>
          <div className="salary-chart-bar">
            <div className="salary-label">3년 ~ 7년</div>
            <div className="salary-bar-container">
              <div className="salary-bar" style={{width: '78%'}}>
                <span className="salary-amount">5,250만원</span>
              </div>
            </div>
            <div className="salary-note" style={{marginLeft: '10px', fontSize: '14px', color: '#666'}}>다음 단계</div>
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
        <h2 className="section-title">맞춤형 채용 추천</h2>
        <div className="company-platform-list">
          <div className="platform-item">
            <div className="platform-logo">🔥</div>
            <div className="platform-info">
              <h3 className="platform-name">백엔드 개발자 - 네이버</h3>
              <div className="platform-stats">
                <span className="platform-stat">예상 연봉: 5,800만원</span>
                <span className="platform-stat">스킬 일치율: 90%</span>
              </div>
              <div className="platform-skills">
                <span className="platform-skill">Spring</span>
                <span className="platform-skill">Java</span>
                <span className="platform-skill">MySQL</span>
                <span className="platform-skill">AWS</span>
              </div>
            </div>
          </div>
          <div className="platform-item">
            <div className="platform-logo">🚀</div>
            <div className="platform-info">
              <h3 className="platform-name">서버 개발자 - 토스</h3>
              <div className="platform-stats">
                <span className="platform-stat">예상 연봉: 5,500만원</span>
                <span className="platform-stat">스킬 일치율: 85%</span>
              </div>
              <div className="platform-skills">
                <span className="platform-skill">Java</span>
                <span className="platform-skill">Spring Boot</span>
                <span className="platform-skill">MySQL</span>
                <span className="platform-skill">MSA</span>
              </div>
            </div>
          </div>
          <div className="platform-item">
            <div className="platform-logo">🌟</div>
            <div className="platform-info">
              <h3 className="platform-name">백엔드 개발자 - 카카오</h3>
              <div className="platform-stats">
                <span className="platform-stat">예상 연봉: 6,000만원</span>
                <span className="platform-stat">스킬 일치율: 80%</span>
              </div>
              <div className="platform-skills">
                <span className="platform-skill">Java</span>
                <span className="platform-skill">Spring</span>
                <span className="platform-skill">JPA</span>
                <span className="platform-skill">Docker</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="button-container">
        <Link to="/reports/job" className="report-button">
          더 많은 채용 정보 보기
        </Link>
      </div>
    </div>
  );
};

export default MyReport; 