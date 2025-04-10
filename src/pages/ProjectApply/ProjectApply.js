import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProjectApply.css';

const ProjectApply = () => {
  const { projectId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    career: '',
    portfolioUrl: '',
    githubUrl: '',
    motivation: '',
    availability: '',
    questions: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = {
      name: '이름을 입력해주세요.',
      email: '이메일을 입력해주세요.',
      phone: '연락처를 입력해주세요.',
      position: '지원 포지션을 선택해주세요.',
      motivation: '지원 동기를 입력해주세요.',
      availability: '참여 가능 시간을 입력해주세요.'
    };

    Object.entries(requiredFields).forEach(([key, message]) => {
      if (!formData[key]) {
        errors[key] = message;
      }
    });

    // 이메일 형식 검증
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = '올바른 이메일 형식이 아닙니다.';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // TODO: API 호출 구현
    console.log('Form submitted:', formData);
  };

  // 임시 프로젝트 데이터 (실제로는 API에서 받아와야 함)
  const projectData = {
    title: "프로젝트 제목",
    positions: ['프론트엔드', '백엔드', '디자이너']
  };

  return (
    <div className="project-apply-container">
      <div className="apply-header">
        <h1>프로젝트 지원하기</h1>
        <h2>{projectData.title}</h2>
      </div>

      <form onSubmit={handleSubmit} className="apply-form">
        <div className="form-section">
          <h3>기본 정보</h3>
          
          <div className="form-group">
            <label>
              이름
              <span className="required-mark">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="이름을 입력하세요"
              className={isSubmitted && formErrors.name ? 'input-error' : ''}
            />
            {isSubmitted && formErrors.name && (
              <div className="error-message">
                <span className="error-icon">!</span>
                {formErrors.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>
              이메일
              <span className="required-mark">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력하세요"
              className={isSubmitted && formErrors.email ? 'input-error' : ''}
            />
            {isSubmitted && formErrors.email && (
              <div className="error-message">
                <span className="error-icon">!</span>
                {formErrors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>
              연락처
              <span className="required-mark">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="연락처를 입력하세요"
              className={isSubmitted && formErrors.phone ? 'input-error' : ''}
            />
            {isSubmitted && formErrors.phone && (
              <div className="error-message">
                <span className="error-icon">!</span>
                {formErrors.phone}
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3>지원 정보</h3>
          
          <div className="form-group">
            <label>
              지원 포지션
              <span className="required-mark">*</span>
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className={isSubmitted && formErrors.position ? 'input-error' : ''}
            >
              <option value="">포지션을 선택하세요</option>
              {projectData.positions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
            {isSubmitted && formErrors.position && (
              <div className="error-message">
                <span className="error-icon">!</span>
                {formErrors.position}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>
              경력 사항
            </label>
            <textarea
              name="career"
              value={formData.career}
              onChange={handleInputChange}
              placeholder="관련 경력 사항을 입력하세요"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>
              포트폴리오 URL
            </label>
            <input
              type="url"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleInputChange}
              placeholder="포트폴리오 URL을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label>
              GitHub URL
            </label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleInputChange}
              placeholder="GitHub URL을 입력하세요"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>자기소개</h3>
          
          <div className="form-group">
            <label>
              지원 동기
              <span className="required-mark">*</span>
            </label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              placeholder="프로젝트에 지원하게 된 동기와 기여할 수 있는 점을 작성해주세요"
              rows="5"
              className={isSubmitted && formErrors.motivation ? 'input-error' : ''}
            />
            {isSubmitted && formErrors.motivation && (
              <div className="error-message">
                <span className="error-icon">!</span>
                {formErrors.motivation}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>
              참여 가능 시간
              <span className="required-mark">*</span>
            </label>
            <textarea
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              placeholder="주중/주말 참여 가능한 시간을 작성해주세요"
              rows="3"
              className={isSubmitted && formErrors.availability ? 'input-error' : ''}
            />
            {isSubmitted && formErrors.availability && (
              <div className="error-message">
                <span className="error-icon">!</span>
                {formErrors.availability}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>
              문의사항
            </label>
            <textarea
              name="questions"
              value={formData.questions}
              onChange={handleInputChange}
              placeholder="프로젝트에 대해 궁금한 점이 있다면 작성해주세요"
              rows="3"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button">취소</button>
          <button type="submit" className="submit-button">지원하기</button>
        </div>
      </form>
    </div>
  );
};

export default ProjectApply; 