import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { BiTrendingUp, BiTrendingDown } from 'react-icons/bi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, Cell } from 'recharts';
import './Home.css';

const Home = () => {
  const tags = ['#개발자', '#백엔드', '#프론트', '#PM'];
  
  const formatSalary = (minSalary, maxSalary) => {
    const min = minSalary / 1000;
    const max = maxSalary / 1000;
    return `연봉 ${min}~${max}`;
  };

  const [featuredJobs, setFeaturedJobs] = useState([
    {
      id: 1,
      title: 'AI/머신러닝 프론트엔드 개발자',
      company: '네이버',
      platform: 'wanted',
      skills: ['React', 'TypeScript', '웹 개발'],
      location: '서울 · 강남구',
      minSalary: 6000000,
      maxSalary: 8000000,
      dDay: 'D-14',
      isBookmarked: false,
      isSaved: true
    },
    {
      id: 2,
      title: 'UX/UI 디자이너',
      company: '카카오',
      platform: 'jobkorea',
      skills: ['Figma', 'Adobe XD', '웹 디자인'],
      location: '제주 · 제주시',
      minSalary: 5000000,
      maxSalary: 7000000,
      dDay: '상시채용',
      isBookmarked: true,
      isSaved: false
    },
    {
      id: 3,
      title: '백엔드 개발자',
      company: '라인',
      platform: 'saramin',
      skills: ['Java', 'Spring', '웹 개발'],
      location: '성남 · 분당구',
      minSalary: 5500000,
      maxSalary: 7500000,
      dDay: 'D-7',
      isBookmarked: false,
      isSaved: false
    }
  ]);

  const toggleBookmark = (jobId) => {
    setFeaturedJobs(featuredJobs.map(job => 
      job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
    ));
  };
  
  const toggleSave = (jobId) => {
    setFeaturedJobs(featuredJobs.map(job => 
      job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
    ));
  };

  const recentJobs = [
    {
      id: 4,
      title: '데이터 엔지니어',
      company: '우형',
      platform: 'wanted',
      location: '서울 · 송파구',
      minSalary: 5000000,
      maxSalary: 7000000,
      dDay: 'D-5'
    },
    {
      id: 5,
      title: '프론트엔드 매니저',
      company: '당근마켓',
      platform: 'saramin',
      location: '서울 · 서초구',
      minSalary: 6000000,
      maxSalary: 8000000,
      dDay: '상시채용'
    },
    {
      id: 6,
      title: '마케팅 매니저',
      company: '토스',
      platform: 'jobkorea',
      location: '서울 · 강남구',
      minSalary: 4500000,
      maxSalary: 6500000,
      dDay: 'D-2'
    },
    {
      id: 7,
      title: '안드로이드 개발자',
      company: '배달의민족',
      platform: 'wanted',
      location: '서울 · 송파구',
      minSalary: 5500000,
      maxSalary: 7500000,
      dDay: 'D-10'
    }
  ];

  const trendData = [
    { name: '1월', '백엔드': 120, 'PM': 90, '프론트': 150, 'AI': 80, '데이터': 100 },
    { name: '2월', '백엔드': 150, 'PM': 100, '프론트': 160, 'AI': 100, '데이터': 120 },
    { name: '3월', '백엔드': 180, 'PM': 120, '프론트': 140, 'AI': 130, '데이터': 150 },
    { name: '4월', '백엔드': 220, 'PM': 140, '프론트': 180, 'AI': 160, '데이터': 160 },
    { name: '5월', '백엔드': 280, 'PM': 160, '프론트': 220, 'AI': 200, '데이터': 190 },
    { name: '6월', '백엔드': 350, 'PM': 180, '프론트': 280, 'AI': 230, '데이터': 210 }
  ];

  const chartColors = {
    '백엔드': '#15CB96',
    'PM': '#9333EA',
    '프론트': '#2563EB',
    'AI': '#F59E0B',
    '데이터': '#FF6B6B'
  };

  const getPlatformLabel = (platform) => {
    switch (platform) {
      case 'wanted':
        return '원티드';
      case 'saramin':
        return '사람인';
      case 'jobkorea':
        return '잡코리아';
      default:
        return '';
    }
  };

  const skillByPosition = {
    '백엔드': [
      { name: 'Spring', value: 85 },
      { name: 'Java', value: 75 },
      { name: 'SQL', value: 65 },
      { name: 'AWS', value: 55 },
      { name: 'Node.js', value: 45 }
    ],
    'PM': [
      { name: 'Jira', value: 80 },
      { name: '기획', value: 75 },
      { name: 'Figma', value: 60 },
      { name: 'SQL', value: 45 },
      { name: 'GA', value: 40 }
    ],
    '프론트': [
      { name: 'React', value: 90 },
      { name: 'JavaScript', value: 85 },
      { name: 'TypeScript', value: 70 },
      { name: 'HTML/CSS', value: 60 },
      { name: 'Vue.js', value: 50 }
    ],
    'AI': [
      { name: 'Python', value: 95 },
      { name: 'TensorFlow', value: 80 },
      { name: 'PyTorch', value: 75 },
      { name: '머신러닝', value: 70 },
      { name: '딥러닝', value: 65 }
    ],
    '데이터': [
      { name: 'SQL', value: 90 },
      { name: 'Python', value: 85 },
      { name: 'Hadoop', value: 65 },
      { name: 'Spark', value: 60 },
      { name: 'Tableau', value: 55 }
    ]
  };

  const [selectedPosition, setSelectedPosition] = React.useState('백엔드');

  return (
    <div className="home">
      <section className="home__search">
        <h1>원하는 채용정보를 찾아보세요</h1>
        <div className="search__bar">
          <input type="text" placeholder="직무, 회사, 지역 검색" />
          <button className="search__button">
            <IoSearch size={20} />
            검색
          </button>
        </div>
        <div className="search__tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </section>

      <section className="featured__jobs">
        <div className="section__header">
          <h2>추천 채용공고</h2>
          <Link to="/jobs" className="more-link">더보기</Link>
        </div>
        <div className="job__cards">
          {featuredJobs.map(job => (
            <div key={job.id} className="job__card">
              <div className="card__header">
                <div className="card__actions">
                  <button 
                    className={`bookmark-btn ${job.isBookmarked ? 'active' : ''}`}
                    onClick={() => toggleBookmark(job.id)}
                  >
                    {job.isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
                  </button>
                  <button 
                    className={`star-btn ${job.isSaved ? 'active' : ''}`}
                    onClick={() => toggleSave(job.id)}
                  >
                    {job.isSaved ? <AiFillStar /> : <AiOutlineStar />}
                  </button>
                  <span className="d-day">
                    {job.dDay}
                  </span>
                </div>
              </div>
              <h3>{job.title}</h3>
              <div className="company-info">
                <p className="company">{job.company}</p>
                <span className={`platform-badge ${job.platform}`}>
                  {getPlatformLabel(job.platform)}
                </span>
              </div>
              <div className="skills">
                {job.skills.map((skill, index) => (
                  <span key={index} className="skill">{skill}</span>
                ))}
              </div>
              <div className="job__info">
                <span>{job.location}</span>
                <span>{formatSalary(job.minSalary, job.maxSalary)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="recent__jobs">
        <div className="section__header">
          <h2>신규 채용공고</h2>
          <Link to="/jobs" className="more-link">더보기</Link>
        </div>
        <div className="job__list">
          {recentJobs.map(job => (
            <div key={job.id} className="job__item">
              <div className="item__left">
                <div className="item__header">
                  <span className={`platform-badge ${job.platform}`}>
                    {getPlatformLabel(job.platform)}
                  </span>
                </div>
                <h3>{job.title}</h3>
                <p className="company">{job.company}</p>
              </div>
              <div className="item__right">
                <p>{job.location}</p>
                <p className="salary">{formatSalary(job.minSalary, job.maxSalary)}</p>
                <span className="d-day">
                  {job.dDay}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="job__skills">
        <div className="section__header">
          <h2>직무별 인기 스킬</h2>
        </div>
        <div className="skills__container">
          <div className="skills__tabs">
            {Object.keys(skillByPosition).map(position => (
              <button 
                key={position} 
                className={`skill-tab ${selectedPosition === position ? 'active' : ''}`}
                onClick={() => setSelectedPosition(position)}
              >
                {position}
              </button>
            ))}
          </div>
          <div className="skills__chart">
            <h3>{selectedPosition} 직무 인기 스킬 TOP 5</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={skillByPosition[selectedPosition]}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 60, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '요구 비율']}
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                  />
                  <Bar dataKey="value" barSize={30}>
                    {skillByPosition[selectedPosition].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#FF6B6B' : index === 1 ? '#FF9B6B' : `#${(7 + index) * 111}`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="job__trends">
        <div className="trends__container">
          <div className="trends__list">
            <h2>실시간 인기 검색어</h2>
            <div className="trend__items">
              <div className="trend__item">
                <span className="rank">1</span>
                <span className="keyword">프론트엔드</span>
                <span className="change up"><BiTrendingUp /> 5</span>
              </div>
              <div className="trend__item">
                <span className="rank">2</span>
                <span className="keyword">데이터 분석가</span>
                <span className="change down"><BiTrendingDown /> 2</span>
              </div>
              <div className="trend__item">
                <span className="rank">3</span>
                <span className="keyword">PM</span>
                <span className="change up"><BiTrendingUp /> 3</span>
              </div>
              <div className="trend__item">
                <span className="rank">4</span>
                <span className="keyword">UX 디자이너</span>
                <span className="change up"><BiTrendingUp /> 1</span>
              </div>
              <div className="trend__item">
                <span className="rank">5</span>
                <span className="keyword">DevOps</span>
                <span className="change up"><BiTrendingUp /> 1</span>
              </div>
            </div>
          </div>
          <div className="trends__chart">
            <h2>채용 현황</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="백엔드" stroke={chartColors['백엔드']} fill={chartColors['백엔드']} fillOpacity={0.3} />
                  <Area type="monotone" dataKey="PM" stroke={chartColors['PM']} fill={chartColors['PM']} fillOpacity={0.3} />
                  <Area type="monotone" dataKey="프론트" stroke={chartColors['프론트']} fill={chartColors['프론트']} fillOpacity={0.3} />
                  <Area type="monotone" dataKey="AI" stroke={chartColors['AI']} fill={chartColors['AI']} fillOpacity={0.3} />
                  <Area type="monotone" dataKey="데이터" stroke={chartColors['데이터']} fill={chartColors['데이터']} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 