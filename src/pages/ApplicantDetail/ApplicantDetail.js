import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ApplicantDetail.css';

const MeetingRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingType, setMeetingType] = useState('online'); // online 또는 offline
  const [meetingLocation, setMeetingLocation] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      date: meetingDate,
      time: meetingTime,
      type: meetingType,
      location: meetingLocation
    });
  };

  return (
    <div className="applicant-modal-overlay">
      <div className="applicant-modal">
        <h2>미팅 요청</h2>
        <form onSubmit={handleSubmit}>
          <div className="applicant-modal-form-group">
            <label>미팅 날짜</label>
            <input
              type="date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
              required
            />
          </div>
          <div className="applicant-modal-form-group">
            <label>미팅 시간</label>
            <input
              type="time"
              value={meetingTime}
              onChange={(e) => setMeetingTime(e.target.value)}
              required
            />
          </div>
          <div className="applicant-modal-form-group">
            <label>미팅 방식</label>
            <select
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
            >
              <option value="online">온라인</option>
              <option value="offline">오프라인</option>
            </select>
          </div>
          {meetingType === 'offline' && (
            <div className="applicant-modal-form-group">
              <label>미팅 장소</label>
              <input
                type="text"
                value={meetingLocation}
                onChange={(e) => setMeetingLocation(e.target.value)}
                placeholder="미팅 장소를 입력해주세요"
                required
              />
            </div>
          )}
          <div className="applicant-modal-actions">
            <button type="button" className="applicant-modal-cancel" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="applicant-modal-submit">
              요청하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const JoinConfirmModal = ({ isOpen, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ message });
  };

  return (
    <div className="applicant-modal-overlay">
      <div className="applicant-modal">
        <h2>합류 확인</h2>
        <form onSubmit={handleSubmit}>
          <div className="applicant-modal-form-group">
            <label>메시지 (선택사항)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="합류를 축하하는 메시지를 작성해주세요"
              rows={4}
            />
          </div>
          <div className="applicant-modal-actions">
            <button type="button" className="applicant-modal-cancel" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="applicant-modal-submit">
              합류 확정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ApplicantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleGoBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 실제로는 API에서 데이터를 가져와야 합니다.
  const applicantData = {
    name: '김지원',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    position: '프론트엔드 개발자',
    experience: '3년차 프론트엔드 개발자로 React와 TypeScript를 주로 사용하며, 성능 최적화와 사용자 경험 개선에 관심이 많습니다.',
    portfolioUrl: 'https://portfolio.example.com',
    githubUrl: 'https://github.com/example',
    motivation: '음악과 개발을 좋아하는 프론트엔드 개발자입니다. 음악 스트리밍 서비스에 대한 경험이 있으며, 웹 오디오 API를 활용한 프로젝트를 진행한 경험이 있습니다.',
    availableTime: '주중: 평일 저녁 6시 이후\n주말: 토요일 종일',
    questions: '프로젝트의 구체적인 일정과 마일스톤이 궁금합니다.',
    applyDate: '2024-03-15',
    status: '검토 중'
  };

  const handleSelect = () => {
    setIsJoinModalOpen(true);
  };

  const handleReject = () => {
    // 다음 기회 처리 로직
    console.log('다음 기회 처리');
  };

  const handleMeetingRequest = () => {
    setIsMeetingModalOpen(true);
  };

  const handleMeetingSubmit = (meetingData) => {
    // TODO: API 호출로 미팅 요청 데이터 전송
    console.log('미팅 요청 데이터:', meetingData);
    setIsMeetingModalOpen(false);
    // TODO: 성공 메시지 표시
  };

  const handleJoinSubmit = (data) => {
    // TODO: API 호출로 합류 데이터 전송
    console.log('합류 데이터:', data);
    setIsJoinModalOpen(false);
    // TODO: 성공 메시지 표시
  };

  const applicantStatusOptions = [
    { value: '검토 중', color: '#FF8A3D' },
    { value: '합류 결정', color: '#15CB96' },
    { value: '면접 예정', color: '#339af0' },
    { value: '다음 기회에', color: '#fa5252' }
  ];

  return (
    <div className="applicant-detail-container">
      <div className="applicant-detail-header">
        <h1>지원자 정보</h1>
        <div className="applicant-status">{applicantData.status}</div>
      </div>

      <div className="applicant-detail-section">
        <h2>기본 정보</h2>
        <div className="applicant-detail-grid">
          <div className="applicant-detail-item">
            <label>이름</label>
            <div className="applicant-detail-value">{applicantData.name}</div>
          </div>
          <div className="applicant-detail-item">
            <label>이메일</label>
            <div className="applicant-detail-value">{applicantData.email}</div>
          </div>
          <div className="applicant-detail-item">
            <label>연락처</label>
            <div className="applicant-detail-value">{applicantData.phone}</div>
          </div>
        </div>
      </div>

      <div className="applicant-detail-section">
        <h2>지원 정보</h2>
        <div className="applicant-detail-grid">
          <div className="applicant-detail-item">
            <label>지원 포지션</label>
            <div className="applicant-detail-value">{applicantData.position}</div>
          </div>
          <div className="applicant-detail-item">
            <label>지원일</label>
            <div className="applicant-detail-value">{applicantData.applyDate}</div>
          </div>
        </div>
      </div>

      <div className="applicant-detail-section">
        <h2>경력 및 포트폴리오</h2>
        <div className="applicant-detail-grid">
          <div className="applicant-detail-item">
            <label>경력</label>
            <div className="applicant-detail-value">{applicantData.experience}</div>
          </div>
          <div className="applicant-detail-item">
            <label>포트폴리오</label>
            <div className="applicant-detail-value">
              <a href={applicantData.portfolioUrl} target="_blank" rel="noopener noreferrer">포트폴리오 링크</a>
            </div>
          </div>
          <div className="applicant-detail-item">
            <label>GitHub</label>
            <div className="applicant-detail-value">
              <a href={applicantData.githubUrl} target="_blank" rel="noopener noreferrer">GitHub 프로필</a>
            </div>
          </div>
        </div>
      </div>

      <div className="applicant-detail-section">
        <h2>자기소개</h2>
        <div className="applicant-detail-grid">
          <div className="applicant-detail-item">
            <label>지원 동기</label>
            <div className="applicant-detail-value">{applicantData.motivation}</div>
          </div>
          <div className="applicant-detail-item">
            <label>참여 가능 시간</label>
            <div className="applicant-detail-value">{applicantData.availableTime}</div>
          </div>
          <div className="applicant-detail-item">
            <label>문의사항</label>
            <div className="applicant-detail-value">{applicantData.questions}</div>
          </div>
        </div>
      </div>

      <div className="applicant-detail-actions">
        <button className="applicant-back-button" onClick={handleGoBack}>뒤로가기</button>
        <div className="applicant-action-buttons">
          <button className="applicant-meeting-button" onClick={handleMeetingRequest}>미팅 요청</button>
          <button className="applicant-select-button" onClick={handleSelect}>합류</button>
          <button className="applicant-reject-button" onClick={handleReject}>다음 기회에</button>
        </div>
      </div>

      <MeetingRequestModal
        isOpen={isMeetingModalOpen}
        onClose={() => setIsMeetingModalOpen(false)}
        onSubmit={handleMeetingSubmit}
      />

      <JoinConfirmModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSubmit={handleJoinSubmit}
      />
    </div>
  );
};

export default ApplicantDetail; 