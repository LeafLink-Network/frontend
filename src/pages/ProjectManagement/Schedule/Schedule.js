import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdArrowForward, MdAdd, MdEdit, MdDelete, MdGroup } from 'react-icons/md';
import './Schedule.css';

const Schedule = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [teams, setTeams] = useState([
    { id: 1, name: '프론트엔드 팀', color: '#339af0' },
    { id: 2, name: '백엔드 팀', color: '#51cf66' },
    { id: 3, name: '디자인 팀', color: '#ff6b6b' },
  ]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const horizontalScrollRef = useRef(null);

  const [scheduleForm, setScheduleForm] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    teamId: '',
  });

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const daySchedules = schedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate.toDateString() === date.toDateString() &&
          (!selectedTeam || schedule.teamId === selectedTeam);
      });

      days.push(
        <div 
          key={day} 
          className={`calendar-day ${date.toDateString() === new Date().toDateString() ? 'today' : ''}`}
          onClick={() => handleDayClick(date)}
        >
          <span className="day-number">{day}</span>
          {daySchedules.map((schedule, index) => (
            <div 
              key={index} 
              className="schedule-indicator"
              style={{ backgroundColor: teams.find(t => t.id === schedule.teamId)?.color }}
              onClick={(e) => {
                e.stopPropagation();
                handleScheduleClick(schedule);
              }}
            >
              {schedule.title}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  const renderHorizontalCalendar = () => {
    const days = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 7);

    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const daySchedules = schedules.filter(schedule => {
        const scheduleDate = new Date(schedule.date);
        return scheduleDate.toDateString() === date.toDateString() &&
          (!selectedTeam || schedule.teamId === selectedTeam);
      });

      days.push(
        <div 
          key={i} 
          className={`horizontal-day ${date.toDateString() === today.toDateString() ? 'today' : ''}`}
        >
          <div className="day-header">
            <span className="day-name">{date.toLocaleDateString('ko-KR', { weekday: 'short' })}</span>
            <span className="day-number">{date.getDate()}</span>
          </div>
          <div className="day-schedules">
            {daySchedules.map((schedule, index) => (
              <div 
                key={index} 
                className="schedule-item"
                style={{ backgroundColor: teams.find(t => t.id === schedule.teamId)?.color }}
                onClick={() => handleScheduleClick(schedule)}
              >
                <span className="schedule-time">{schedule.startTime}</span>
                <span className="schedule-title">{schedule.title}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setScheduleForm({
      ...scheduleForm,
      date: date.toISOString().split('T')[0],
      teamId: selectedTeam || ''
    });
    setShowModal(true);
  };

  const handleScheduleClick = (schedule) => {
    setScheduleForm(schedule);
    setShowModal(true);
  };

  const handleScroll = (direction) => {
    if (horizontalScrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      horizontalScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    navigate('/mypage/recruiting');
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <button className="back-button" onClick={handleBack}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
          </svg>
        </button>
        <div className="schedule-header-content">
          <h2>일정 관리</h2>
          <div className="calendar-navigation">
            <button onClick={handlePrevMonth}><MdArrowBack /></button>
            <span>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</span>
            <button onClick={handleNextMonth}><MdArrowForward /></button>
          </div>
        </div>
      </div>

      <div className="team-filter">
        <button 
          className={`team-button ${!selectedTeam ? 'active' : ''}`}
          onClick={() => setSelectedTeam(null)}
        >
          전체
        </button>
        {teams.map(team => (
          <button
            key={team.id}
            className={`team-button ${selectedTeam === team.id ? 'active' : ''}`}
            onClick={() => setSelectedTeam(team.id)}
            style={{ '--team-color': team.color }}
          >
            <MdGroup /> {team.name}
          </button>
        ))}
      </div>

      <div className="calendar-container">
        <div className="calendar-header">
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>
        <div className="calendar-grid">
          {renderCalendar()}
        </div>
      </div>

      <div className="horizontal-calendar-section">
        <h3>주간 일정</h3>
        <div className="horizontal-calendar-container">
          <button className="scroll-button left" onClick={() => handleScroll('left')}>
            <MdArrowBack />
          </button>
          <div className="horizontal-calendar" ref={horizontalScrollRef}>
            {renderHorizontalCalendar()}
          </div>
          <button className="scroll-button right" onClick={() => handleScroll('right')}>
            <MdArrowForward />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="schedule-modal">
          <div className="modal-content">
            <h3>{scheduleForm.id ? '일정 수정' : '새 일정'}</h3>
            <input
              type="text"
              placeholder="일정 제목"
              value={scheduleForm.title}
              onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })}
            />
            <div className="time-inputs">
              <input
                type="time"
                value={scheduleForm.startTime}
                onChange={(e) => setScheduleForm({ ...scheduleForm, startTime: e.target.value })}
              />
              <span>~</span>
              <input
                type="time"
                value={scheduleForm.endTime}
                onChange={(e) => setScheduleForm({ ...scheduleForm, endTime: e.target.value })}
              />
            </div>
            <select
              value={scheduleForm.teamId}
              onChange={(e) => setScheduleForm({ ...scheduleForm, teamId: e.target.value })}
            >
              <option value="">팀 선택</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <textarea
              placeholder="일정 설명"
              value={scheduleForm.description}
              onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={() => {/* 저장 로직 */}}>저장</button>
              <button onClick={() => setShowModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule; 