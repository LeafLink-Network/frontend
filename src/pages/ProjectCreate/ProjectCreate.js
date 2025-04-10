import React, { useState, useRef } from 'react';
import './ProjectCreate.css';

const ProjectCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    positions: [], // [{position: '프론트엔드', memberCount: 2, techStacks: ['React', 'TypeScript'], requirements: []}, ...]
    projectLocation: '', // 장소 (온라인/오프라인/혼합)
    offlineLocation: '', // 오프라인 장소
    meetingSchedule: '', // 미팅 일정 (예: 주 1회 오프라인 미팅)
    recruitmentDeadline: '', // 모집 마감일
    projectDuration: '', // 프로젝트 예상 기간
    contactMethod: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const positionOptions = ['프론트엔드', '백엔드', '풀스택', 'DevOps', '디자이너', 'PM'];
  const techStackOptions = {
    '프론트엔드': ['React', 'Vue.js', 'Angular', 'Svelte', 'TypeScript', 'JavaScript'],
    '백엔드': ['Node.js', 'Spring', 'Django', 'Express', 'NestJS', 'FastAPI'],
    '풀스택': ['React', 'Node.js', 'TypeScript', 'JavaScript', 'Spring', 'Django'],
    'DevOps': ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Jenkins', 'GitHub Actions'],
    '디자이너': ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator'],
    'PM': ['Jira', 'Notion', 'Confluence', 'Slack', 'Trello']
  };

  const locationOptions = ['온라인', '오프라인', '온/오프라인 병행'];

  const [selectedPosition, setSelectedPosition] = useState('');
  const [memberCount, setMemberCount] = useState(1);
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [requirements, setRequirements] = useState(['']);
  const [projectImages, setProjectImages] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const formRefs = {
    title: useRef(null),
    description: useRef(null),
    projectLocation: useRef(null),
    meetingSchedule: useRef(null),
    recruitmentDeadline: useRef(null),
    projectDuration: useRef(null),
    contactMethod: useRef(null),
    positions: useRef(null)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechStackChange = (tech) => {
    setSelectedTechStacks(prev => 
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
  };

  const handleAddRequirement = (e) => {
    if (e.key === 'Enter' && currentRequirement.trim()) {
      e.preventDefault();
      setRequirements(prev => [...prev, currentRequirement.trim()]);
      setCurrentRequirement('');
    }
  };

  const handleRemoveRequirement = (indexToRemove) => {
    setRequirements(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleAddPosition = () => {
    if (!selectedPosition || memberCount < 1) return;

    setFormData(prev => ({
      ...prev,
      positions: [...prev.positions, {
        position: selectedPosition,
        memberCount: memberCount,
        techStacks: selectedTechStacks,
        requirements: requirements
      }]
    }));

    // 입력 필드 초기화
    setSelectedPosition('');
    setMemberCount(1);
    setSelectedTechStacks([]);
    setRequirements([]);
    setCurrentRequirement('');
  };

  const handleRemovePosition = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      positions: prev.positions.filter((_, index) => index !== indexToRemove)
    }));
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = {
      title: '프로젝트명을 입력해주세요.',
      description: '프로젝트 설명을 입력해주세요.',
      projectLocation: '진행 방식을 선택해주세요.',
      meetingSchedule: '미팅 일정을 입력해주세요.',
      recruitmentDeadline: '모집 마감일을 입력해주세요.',
      projectDuration: '프로젝트 예상 기간을 입력해주세요.',
      contactMethod: '연락 방법을 입력해주세요.'
    };

    Object.entries(requiredFields).forEach(([key, message]) => {
      if (!formData[key]) {
        errors[key] = message;
      }
    });

    if (formData.positions.length === 0) {
      errors.positions = '최소 1개 이상의 모집 포지션을 추가해주세요.';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      const targetRef = formRefs[firstErrorField];
      
      if (targetRef && targetRef.current) {
        targetRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }

      setAlertMessage('필수 항목을 모두 입력해주세요.');
      setShowAlert(true);
      return;
    }

    console.log('Form submitted:', formData);
    // TODO: API 호출 구현
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setProjectImages([...projectImages, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = projectImages.filter((_, i) => i !== index);
    setProjectImages(newImages);
  };

  return (
    <div className="project-create-container">
      {showAlert && (
        <div className="custom-alert">
          <div className="alert-content">
            <div className="alert-header">
              <h3>필수 항목 입력 필요</h3>
              <button 
                className="close-alert"
                onClick={() => setShowAlert(false)}
              >
                ✕
              </button>
            </div>
            <div className="alert-message">
              {alertMessage.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <h1 className="project-create-title">사이드 프로젝트 모집 등록</h1>
      
      <form onSubmit={handleSubmit} className="project-create-form">
        <div className="form-group" ref={formRefs.title}>
          <label>
            프로젝트명
            <span className="required-mark">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="프로젝트명을 입력하세요"
            className={isSubmitted && formErrors.title ? 'input-error' : ''}
          />
          {isSubmitted && formErrors.title && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {formErrors.title}
            </div>
          )}
        </div>

        <div className="form-group" ref={formRefs.description}>
          <label>
            프로젝트 설명
            <span className="required-mark">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="프로젝트에 대한 상세 설명을 입력하세요"
            rows="5"
            className={isSubmitted && formErrors.description ? 'input-error' : ''}
          />
          {isSubmitted && formErrors.description && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {formErrors.description}
            </div>
          )}
        </div>

        <div className="form-group" ref={formRefs.projectLocation}>
          <label>
            진행 방식
            <span className="required-mark">*</span>
          </label>
          <select
            name="projectLocation"
            value={formData.projectLocation}
            onChange={handleInputChange}
            className={`location-select ${isSubmitted && formErrors.projectLocation ? 'input-error' : ''}`}
          >
            <option value="">진행 방식 선택</option>
            {locationOptions.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          {isSubmitted && formErrors.projectLocation && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {formErrors.projectLocation}
            </div>
          )}
        </div>

        {(formData.projectLocation === '오프라인' || formData.projectLocation === '온/오프라인 병행') && (
          <div className="form-group">
            <label>오프라인 장소</label>
            <input
              type="text"
              name="offlineLocation"
              value={formData.offlineLocation}
              onChange={handleInputChange}
              placeholder="오프라인 모임 장소를 입력하세요 (예: 강남역 인근 카페)"
            />
          </div>
        )}

        <div className="form-group" ref={formRefs.meetingSchedule}>
          <label>
            미팅 일정
            <span className="required-mark">*</span>
          </label>
          <input
            type="text"
            name="meetingSchedule"
            value={formData.meetingSchedule}
            onChange={handleInputChange}
            placeholder="미팅 일정을 입력하세요 (예: 주 1회 오프라인 미팅)"
            className={isSubmitted && formErrors.meetingSchedule ? 'input-error' : ''}
          />
          {isSubmitted && formErrors.meetingSchedule && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {formErrors.meetingSchedule}
            </div>
          )}
        </div>

        <div className="form-group" ref={formRefs.recruitmentDeadline}>
          <label>
            모집 마감일
            <span className="required-mark">*</span>
          </label>
          <input
            type="date"
            name="recruitmentDeadline"
            value={formData.recruitmentDeadline}
            onChange={handleInputChange}
            className={isSubmitted && formErrors.recruitmentDeadline ? 'input-error' : ''}
          />
          {isSubmitted && formErrors.recruitmentDeadline && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {formErrors.recruitmentDeadline}
            </div>
          )}
        </div>

        <div className="form-group" ref={formRefs.projectDuration}>
          <label>
            프로젝트 예상 기간
            <span className="required-mark">*</span>
          </label>
          <input
            type="text"
            name="projectDuration"
            value={formData.projectDuration}
            onChange={handleInputChange}
            placeholder="예상 기간을 입력하세요 (예: 3개월)"
            className={isSubmitted && formErrors.projectDuration ? 'input-error' : ''}
          />
          {isSubmitted && formErrors.projectDuration && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {formErrors.projectDuration}
            </div>
          )}
        </div>

        <div className="form-group" ref={formRefs.positions}>
          <label>
            모집 포지션
            <span className="required-mark">*</span>
          </label>
          <div className="position-form">
            <div className="position-input-section">
              <div className="position-row">
                <select 
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="position-select"
                >
                  <option value="">포지션 선택</option>
                  {positionOptions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
                <div className="member-count-wrapper">
                  <span className="member-count-label">모집 인원</span>
                  <div className="member-count-controls">
                    <button 
                      type="button" 
                      onClick={() => setMemberCount(prev => Math.max(1, prev - 1))}
                      className="count-button"
                    >
                      -
                    </button>
                    <span className="member-count-display">{memberCount}명</span>
                    <button 
                      type="button" 
                      onClick={() => setMemberCount(prev => prev + 1)}
                      className="count-button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {selectedPosition && (
                <>
                  <div className="tech-stack-selection">
                    <label className="sub-label">기술 스택</label>
                    <div className="tech-stack-options">
                      {techStackOptions[selectedPosition].map(tech => (
                        <label key={tech} className="tech-stack-item">
                          <input
                            type="checkbox"
                            checked={selectedTechStacks.includes(tech)}
                            onChange={() => handleTechStackChange(tech)}
                          />
                          <span>{tech}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="requirements-section">
                    <label className="sub-label">자격 요건</label>
                    <div className="requirements-input-wrapper">
                      <input
                        type="text"
                        value={currentRequirement}
                        onChange={(e) => setCurrentRequirement(e.target.value)}
                        onKeyDown={handleAddRequirement}
                        placeholder="자격 요건을 입력하고 Enter를 눌러 추가하세요"
                        className="requirements-input"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (currentRequirement.trim()) {
                            setRequirements(prev => [...prev, currentRequirement.trim()]);
                            setCurrentRequirement('');
                          }
                        }}
                        className="add-requirement-button"
                      >
                        추가
                      </button>
                    </div>
                    {requirements.length > 0 && (
                      <ul className="requirements-list">
                        {requirements.map((req, index) => (
                          <li key={index} className="requirement-item">
                            <span className="requirement-bullet">•</span>
                            <span className="requirement-text">{req}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveRequirement(index)}
                              className="remove-requirement-button"
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddPosition}
              disabled={!selectedPosition || memberCount < 1}
              className="add-position-button"
            >
              + 포지션 추가하기
            </button>

            <div className="selected-positions">
              <h3 className="selected-positions-title">추가된 모집 포지션</h3>
              {formData.positions.map((pos, index) => (
                <div key={index} className="position-item">
                  <div className="position-info">
                    <div className="position-header">
                      <h4>{pos.position}</h4>
                      <span className="member-count-badge">{pos.memberCount}명 모집</span>
                    </div>
                    <div className="selected-tech-stacks">
                      {pos.techStacks.map(tech => (
                        <span key={tech} className="tech-stack-tag">{tech}</span>
                      ))}
                    </div>
                    {pos.requirements.length > 0 && (
                      <div className="requirements-display">
                        <ul className="requirements-list-display">
                          {pos.requirements.map((req, idx) => (
                            <li key={idx}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePosition(index)}
                    className="remove-position-button"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group" ref={formRefs.contactMethod}>
          <label>
            연락 방법
            <span className="required-mark">*</span>
          </label>
          <input
            type="text"
            name="contactMethod"
            value={formData.contactMethod}
            onChange={handleInputChange}
            placeholder="이메일 또는 연락처를 입력하세요"
            className={isSubmitted && formErrors.contactMethod ? 'input-error' : ''}
          />
          {isSubmitted && formErrors.contactMethod && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {formErrors.contactMethod}
            </div>
          )}
        </div>

        <div className="form-section">
          <h2>프로젝트 이미지 (선택)</h2>
          <div className="image-upload-section">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              id="project-images"
              className="image-input"
            />
            <label htmlFor="project-images" className="image-upload-button">
              이미지 업로드
            </label>
            <div className="image-preview-container">
              {projectImages.map((image, index) => (
                <div key={index} className="image-preview-item">
                  <img src={image.preview} alt={`프로젝트 이미지 ${index + 1}`} />
                  <button 
                    type="button" 
                    onClick={() => removeImage(index)}
                    className="remove-image-button"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button">취소</button>
          <button type="submit" className="submit-button">등록하기</button>
        </div>
      </form>
    </div>
  );
};

export default ProjectCreate; 