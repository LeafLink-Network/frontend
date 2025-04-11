import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdSend, MdAdd, MdSearch, MdChevronLeft, MdChevronRight, MdCalendarToday, MdArrowBack } from 'react-icons/md';
import './ProjectChat.css';

function ProjectChat() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(() => {
    // 테스트용 메시지 생성
    const testMessages = [];
    const users = ['김철수', '이영희', '박지민', '최동욱', '정미나'];
    const contents = [
      '안녕하세요!',
      '프로젝트 진행상황 공유드립니다.',
      '다음 회의 일정 확인해주세요.',
      'API 문서 업데이트했습니다.',
      '피드백 부탁드립니다.',
      '수정사항 반영했습니다.',
      '확인했습니다!',
      '좋은 의견 감사합니다.',
      '다음 주 일정 조율이 필요합니다.',
      '코드 리뷰 부탁드립니다.'
    ];

    // 2025-04-10 메시지
    const date1 = new Date('2025-04-10');
    for (let i = 0; i < 15; i++) {
      testMessages.push({
        id: Date.now() + i,
        sender: users[Math.floor(Math.random() * users.length)],
        content: contents[Math.floor(Math.random() * contents.length)],
        timestamp: new Date(date1.getTime() + i * 1000 * 60 * 30).toISOString(), // 30분 간격
        type: 'text'
      });
    }

    // 2025-04-09 메시지
    const date2 = new Date('2025-04-09');
    for (let i = 15; i < 30; i++) {
      testMessages.push({
        id: Date.now() + i,
        sender: users[Math.floor(Math.random() * users.length)],
        content: contents[Math.floor(Math.random() * contents.length)],
        timestamp: new Date(date2.getTime() + i * 1000 * 60 * 30).toISOString(), // 30분 간격
        type: 'text'
      });
    }

    return testMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  });
  const [newMessage, setNewMessage] = useState('');
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date('2025-04-10'));
  const [meetingForm, setMeetingForm] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: '김철수', role: '프론트엔드', status: 'online' },
    { id: 2, name: '이영희', role: '백엔드', status: 'offline' },
    { id: 3, name: '박지민', role: '디자이너', status: 'online' },
    // 실제로는 API에서 팀원 목록을 가져와야 합니다
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: '김철수',
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleMessageSelect = (messageId) => {
    setSelectedMessages(prev => {
      if (prev.includes(messageId)) {
        return prev.filter(id => id !== messageId);
      }
      return [...prev, messageId];
    });
  };

  const handleAddToMeeting = () => {
    if (selectedMessages.length === 0) {
      alert('회의록에 추가할 대화 내용을 선택해주세요.');
      return;
    }
    setShowMeetingModal(true);
    
    // 선택된 메시지들을 시간순으로 정렬하여 내용 생성
    const selectedContent = messages
      .filter(msg => selectedMessages.includes(msg.id))
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .map(msg => `${msg.sender}: ${msg.content}`)
      .join('\n');
    
    setMeetingForm(prev => ({
      ...prev,
      content: selectedContent
    }));
  };

  const handleCreateMeeting = () => {
    // 회의록 생성 로직
    const meetingData = {
      ...meetingForm,
      messages: selectedMessages.map(id => 
        messages.find(msg => msg.id === id)
      ),
      participants: teamMembers.filter(member => member.status === 'online')
    };

    // 회의록 저장 후 회의록 페이지로 이동
    navigate(`/mypage/project/meetings/${projectId}?date=${meetingForm.date}`);
    
    // 모달 초기화
    setShowMeetingModal(false);
    setSelectedMessages([]);
    setMeetingForm({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // 날짜가 다른 경우 날짜도 표시
    if (date.toDateString() !== today.toDateString()) {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDateChange = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const handleSelectDate = () => {
    const datePicker = document.createElement('input');
    datePicker.type = 'date';
    datePicker.onchange = (e) => {
      setCurrentDate(new Date(e.target.value));
    };
    datePicker.click();
  };

  const handleSelectAllMessages = (date) => {
    const dayMessages = messages.filter(message => {
      const messageDate = new Date(message.timestamp);
      return messageDate.toDateString() === date.toDateString();
    });
    
    if (dayMessages.length === 0) return;

    const messageIds = dayMessages.map(msg => msg.id);
    
    // 이미 모든 메시지가 선택되어 있다면 선택 해제
    if (messageIds.every(id => selectedMessages.includes(id))) {
      setSelectedMessages(prev => prev.filter(id => !messageIds.includes(id)));
    } else {
      // 아니라면 모든 메시지 선택
      setSelectedMessages(prev => [...new Set([...prev, ...messageIds])]);
    }
  };

  const filteredMessages = messages.filter(message => {
    const messageDate = new Date(message.timestamp);
    const isCurrentDate = messageDate.toDateString() === currentDate.toDateString();
    const matchesSearch = searchQuery === '' || 
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase());
    return isCurrentDate && matchesSearch;
  });

  const renderMessages = () => {
    let currentDate = null;
    return (
      <div className="messages-content">
        {filteredMessages.map((message, index) => {
          const messageDate = new Date(message.timestamp).toDateString();
          let dateHeader = null;
          
          if (messageDate !== currentDate) {
            currentDate = messageDate;
            const date = new Date(message.timestamp);
            const isAllSelected = filteredMessages
              .filter(msg => new Date(msg.timestamp).toDateString() === messageDate)
              .every(msg => selectedMessages.includes(msg.id));

            dateHeader = (
              <div key={`date-${message.timestamp}`} className="date-header">
                <span>
                  {date.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <button 
                  className={`select-all-messages ${isAllSelected ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectAllMessages(date);
                  }}
                >
                  {isAllSelected ? '전체 선택 해제' : '전체 선택'}
                </button>
              </div>
            );
          }

          return (
            <React.Fragment key={message.id}>
              {dateHeader}
              <div 
                className={`message ${selectedMessages.includes(message.id) ? 'selected' : ''}`}
                onClick={() => handleMessageSelect(message.id)}
              >
                <div className="message-header">
                  <span className="sender">{message.sender}</span>
                  <span className="timestamp">{formatTime(message.timestamp)}</span>
                </div>
                <div className="message-content">
                  {message.content}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    // 메시지가 추가되면 스크롤을 맨 아래로
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 날짜가 변경되면 해당 날짜의 첫 메시지로 스크롤
  useEffect(() => {
    const firstMessage = filteredMessages[0];
    if (firstMessage) {
      const messageElement = document.getElementById(`message-${firstMessage.id}`);
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [currentDate]);

  const handleBack = () => {
    navigate('/mypage/recruiting');
  };

  return (
    <>
      <div className="chat-header">
        <button className="back-button" onClick={handleBack}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
          </svg>
        </button>
        <div className="chat-header-content">
          <div className="chat-search">
            <MdSearch />
            <input
              type="text"
              placeholder="대화 내용 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="chat-header-actions">
            <div className="date-navigation">
              <button onClick={() => handleDateChange(-1)}>
                <MdChevronLeft />
              </button>
              <button className="select-date-btn" onClick={handleSelectDate}>
                <MdCalendarToday />
                {currentDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </button>
              <button onClick={() => handleDateChange(1)}>
                <MdChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-sidebar">
          <div className="sidebar-header">
            <h3>팀원 목록</h3>
            <button 
              className="create-meeting-btn" 
              onClick={handleAddToMeeting}
              disabled={selectedMessages.length === 0}
            >
              <MdAdd /> 회의록에 추가
            </button>
          </div>
          <div className="team-members-list">
            {teamMembers.map(member => (
              <div key={member.id} className="team-member">
                <div className="member-info">
                  <span className="member-name">{member.name}</span>
                  <span className="member-role">{member.role}</span>
                </div>
                <span className={`status-indicator ${member.status}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="chat-main">
          <div className="chat-messages">
            {renderMessages()}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chat-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
            />
            <button type="submit">
              <MdSend />
            </button>
          </form>
        </div>
      </div>

      {showMeetingModal && (
        <div className="meeting-modal">
          <div className="modal-content">
            <h3>회의록에 대화 내용 추가</h3>
            <input
              type="date"
              value={meetingForm.date}
              onChange={e => setMeetingForm({...meetingForm, date: e.target.value})}
            />
            <input
              type="text"
              placeholder="회의록 제목"
              value={meetingForm.title}
              onChange={e => setMeetingForm({...meetingForm, title: e.target.value})}
            />
            <textarea
              placeholder="선택된 대화 내용"
              value={meetingForm.content}
              onChange={e => setMeetingForm({...meetingForm, content: e.target.value})}
              readOnly
            />
            <div className="modal-actions">
              <button onClick={handleCreateMeeting}>추가</button>
              <button onClick={() => {
                setShowMeetingModal(false);
                setSelectedMessages([]);
              }}>취소</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectChat; 