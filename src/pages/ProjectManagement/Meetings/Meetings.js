import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdAdd, MdEdit, MdDelete, MdClose, MdArrowForward } from 'react-icons/md';
import './Meetings.css';

const Meetings = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: '김철수', role: '프론트엔드' },
    { id: 2, name: '이영희', role: '백엔드' },
    { id: 3, name: '박지민', role: '디자이너' },
    // 실제로는 API에서 팀원 목록을 가져와야 합니다
  ]);
  const [showParticipantDropdown, setShowParticipantDropdown] = useState(false);
  const [participantSearch, setParticipantSearch] = useState('');
  const [meetingForm, setMeetingForm] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    agenda: '',
    participants: [],
    decisions: '',
    actionItems: []
  });

  // 달력 관련 함수들
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

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // 이전 달의 날짜들
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayMeetings = meetings.filter(meeting => {
        const meetingDate = new Date(meeting.date);
        return meetingDate.toDateString() === date.toDateString();
      });

      days.push(
        <div 
          key={day} 
          className={`calendar-day ${date.toDateString() === new Date().toDateString() ? 'today' : ''}`}
          onClick={() => handleDayClick(date)}
        >
          <span className="day-number">{day}</span>
          {dayMeetings.map((meeting, index) => (
            <div key={index} className="meeting-indicator" onClick={(e) => {
              e.stopPropagation();
              setSelectedMeeting(meeting);
              setShowModal(true);
            }}>
              {meeting.title}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  const handleDayClick = (date) => {
    setMeetingForm({
      ...meetingForm,
      date: date.toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleBack = () => {
    navigate('/mypage/recruiting');
  };

  const handleAddMeeting = () => {
    setSelectedMeeting(null);
    setMeetingForm({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      agenda: '',
      participants: [],
      decisions: '',
      actionItems: []
    });
    setShowModal(true);
  };

  const handleEditMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setMeetingForm(meeting);
    setShowModal(true);
  };

  const handleSaveMeeting = () => {
    if (selectedMeeting) {
      // 기존 회의록 수정 로직
      const updatedMeetings = meetings.map(meeting => 
        meeting.id === selectedMeeting.id ? { ...meetingForm, id: meeting.id } : meeting
      );
      setMeetings(updatedMeetings);
    } else {
      // 새 회의록 추가 로직
      const newMeeting = {
        ...meetingForm,
        id: Date.now()
      };
      setMeetings([...meetings, newMeeting]);
    }
    setShowModal(false);
  };

  const handleDeleteMeeting = (meetingId) => {
    setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
  };

  const handleAddActionItem = () => {
    setMeetingForm({
      ...meetingForm,
      actionItems: [...meetingForm.actionItems, { task: '', assignee: '', dueDate: '' }]
    });
  };

  const handleActionItemChange = (index, field, value) => {
    const updatedActionItems = meetingForm.actionItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setMeetingForm({
      ...meetingForm,
      actionItems: updatedActionItems
    });
  };

  const handleAddParticipant = (member) => {
    if (!meetingForm.participants.find(p => p.id === member.id)) {
      setMeetingForm({
        ...meetingForm,
        participants: [...meetingForm.participants, member]
      });
    }
    setParticipantSearch('');
    setShowParticipantDropdown(false);
  };

  const handleRemoveParticipant = (memberId) => {
    setMeetingForm({
      ...meetingForm,
      participants: meetingForm.participants.filter(p => p.id !== memberId)
    });
  };

  const filteredTeamMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(participantSearch.toLowerCase()) &&
    !meetingForm.participants.find(p => p.id === member.id)
  );

  return (
    <div className="meetings-container">
      <div className="meetings-header">
        <button className="back-button" onClick={handleBack}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
          </svg>
        </button>
        <div className="meetings-header-content">
          <h2>회의록</h2>
          <div className="calendar-navigation">
            <button onClick={handlePrevMonth}><MdArrowBack /></button>
            <span>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</span>
            <button onClick={handleNextMonth}><MdArrowForward /></button>
          </div>
        </div>
        <button className="add-meeting-btn" onClick={handleAddMeeting}>
          <MdAdd /> 회의록 작성
        </button>
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

      <div className="meetings-list">
        {meetings.map(meeting => (
          <div key={meeting.id} className="meeting-item">
            <div className="meeting-info">
              <h3>{meeting.title}</h3>
              <div className="meeting-meta">
                <p className="meeting-date">{meeting.date}</p>
                <p className="meeting-time">{meeting.startTime} - {meeting.endTime}</p>
                <p className="meeting-location">{meeting.location}</p>
              </div>
              <div className="meeting-content">
                <h4>회의 안건</h4>
                <p>{meeting.agenda}</p>
                <h4>결정 사항</h4>
                <p>{meeting.decisions}</p>
                <h4>실행 항목</h4>
                <ul className="action-items-list">
                  {meeting.actionItems.map((item, index) => (
                    <li key={index} className="action-item">
                      <span className="task">{item.task}</span>
                      <span className="assignee">{item.assignee}</span>
                      <span className="due-date">{item.dueDate}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="meeting-actions">
              <button onClick={() => handleEditMeeting(meeting)}>
                <MdEdit /> 수정
              </button>
              <button onClick={() => handleDeleteMeeting(meeting.id)}>
                <MdDelete /> 삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="meeting-modal">
          <div className="modal-content">
            <h3>{selectedMeeting ? '회의록 수정' : '회의록 작성'}</h3>
            <input
              type="text"
              placeholder="회의 제목"
              value={meetingForm.title}
              onChange={e => setMeetingForm({...meetingForm, title: e.target.value})}
            />
            <input
              type="date"
              value={meetingForm.date}
              onChange={e => setMeetingForm({...meetingForm, date: e.target.value})}
            />
            <div className="time-inputs">
              <input
                type="time"
                value={meetingForm.startTime}
                onChange={e => setMeetingForm({...meetingForm, startTime: e.target.value})}
              />
              <input
                type="time"
                value={meetingForm.endTime}
                onChange={e => setMeetingForm({...meetingForm, endTime: e.target.value})}
              />
            </div>
            <input
              type="text"
              placeholder="회의 장소"
              value={meetingForm.location}
              onChange={e => setMeetingForm({...meetingForm, location: e.target.value})}
            />
            
            <div className="participants-section">
              <h4>참여자</h4>
              <div className="participants-input-container">
                <div className="selected-participants">
                  {meetingForm.participants.map(participant => (
                    <div key={participant.id} className="participant-tag">
                      <span>{participant.name}</span>
                      <button onClick={() => handleRemoveParticipant(participant.id)}>
                        <MdClose />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="participant-search">
                  <input
                    type="text"
                    placeholder="참여자 검색..."
                    value={participantSearch}
                    onChange={e => {
                      setParticipantSearch(e.target.value);
                      setShowParticipantDropdown(true);
                    }}
                    onFocus={() => setShowParticipantDropdown(true)}
                  />
                  {showParticipantDropdown && filteredTeamMembers.length > 0 && (
                    <div className="participant-dropdown">
                      {filteredTeamMembers.map(member => (
                        <div
                          key={member.id}
                          className="participant-option"
                          onClick={() => handleAddParticipant(member)}
                        >
                          <span className="member-name">{member.name}</span>
                          <span className="member-role">{member.role}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <textarea
              placeholder="회의 안건"
              value={meetingForm.agenda}
              onChange={e => setMeetingForm({...meetingForm, agenda: e.target.value})}
            />
            <textarea
              placeholder="결정 사항"
              value={meetingForm.decisions}
              onChange={e => setMeetingForm({...meetingForm, decisions: e.target.value})}
            />
            <div className="action-items-section">
              <h4>실행 항목</h4>
              {meetingForm.actionItems.map((item, index) => (
                <div key={index} className="action-item-inputs">
                  <input
                    type="text"
                    placeholder="할 일"
                    value={item.task}
                    onChange={e => handleActionItemChange(index, 'task', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="담당자"
                    value={item.assignee}
                    onChange={e => handleActionItemChange(index, 'assignee', e.target.value)}
                  />
                  <input
                    type="date"
                    value={item.dueDate}
                    onChange={e => handleActionItemChange(index, 'dueDate', e.target.value)}
                  />
                </div>
              ))}
              <button className="add-action-item-btn" onClick={handleAddActionItem}>
                <MdAdd /> 실행 항목 추가
              </button>
            </div>
            <div className="modal-actions">
              <button onClick={handleSaveMeeting}>저장</button>
              <button onClick={() => setShowModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meetings; 