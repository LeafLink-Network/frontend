import React from 'react';
import './Main.css';

const Main = () => {
  return (
    <main className="main">
      <section className="hero">
        <div className="hero-content">
          <h1>배움의 나무가 자라는 곳</h1>
          <p>LearnLeaf와 함께 새로운 지식을 쌓아보세요</p>
          <button className="cta-button">시작하기</button>
        </div>
      </section>

      <section className="features">
        <h2>주요 기능</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>다양한 강의</h3>
            <p>전문가들이 만든 풍부한 강의 컨텐츠</p>
          </div>
          <div className="feature-card">
            <h3>실시간 학습</h3>
            <p>실시간으로 질문하고 답변받는 학습 환경</p>
          </div>
          <div className="feature-card">
            <h3>커뮤니티</h3>
            <p>다른 학습자들과 소통하며 함께 성장</p>
          </div>
        </div>
      </section>

      <section className="popular-courses">
        <h2>인기 강의</h2>
        <div className="course-grid">
          {/* 강의 카드들이 들어갈 자리 */}
        </div>
      </section>
    </main>
  );
};

export default Main; 