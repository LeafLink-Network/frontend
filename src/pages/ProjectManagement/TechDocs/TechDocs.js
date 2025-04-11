import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdAdd, MdClose, MdEdit, MdDelete, MdInfo } from 'react-icons/md';
import './TechDocs.css';

const TechDocs = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [docs, setDocs] = useState([
    {
      id: 1,
      title: '프로젝트 아키텍처',
      content: `# 프로젝트 아키텍처

## 기술 스택
- Frontend: React, TypeScript
- Backend: Node.js, Express
- Database: PostgreSQL
- Infrastructure: AWS

## 디렉토리 구조
\`\`\`
src/
  ├── components/
  ├── pages/
  ├── hooks/
  ├── utils/
  └── api/
\`\`\`

## 주요 기능
1. 사용자 인증
2. 프로젝트 관리
3. 팀 협업
`,
      category: '아키텍처',
      lastModified: '2024-03-20'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [newDoc, setNewDoc] = useState({
    title: '',
    content: '',
    category: ''
  });

  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const documentTemplates = [
    {
      id: 'architecture',
      title: '아키텍처 설계서',
      description: '시스템 아키텍처와 컴포넌트 구조를 정의합니다.',
      sections: [
        '1. 시스템 개요',
        '2. 아키텍처 구성도',
        '3. 컴포넌트 설계',
        '4. 인터페이스 정의',
        '5. 배포 구성'
      ]
    },
    {
      id: 'erd',
      title: 'ERD 설계서',
      description: '데이터베이스 구조와 엔티티 간의 관계를 정의합니다.',
      sections: [
        {
          title: '1. 엔티티 정의',
          description: '시스템에서 사용되는 모든 엔티티(테이블)를 정의하고 각각의 역할과 특성을 설명합니다.'
        },
        {
          title: '2. 관계 정의',
          description: '엔티티 간의 관계를 정의하고 관계의 유형(1:1, 1:N, N:M)과 참조 무결성을 설명합니다.'
        },
        {
          title: '3. 속성 정의',
          description: '각 엔티티의 속성(컬럼)을 정의하고 데이터 타입, 길이, NULL 허용 여부 등을 명시합니다.'
        },
        {
          title: '4. 제약 조건',
          description: '기본키, 외래키, 유니크 제약조건 등 데이터 무결성을 위한 제약조건을 정의합니다.'
        },
        {
          title: '5. 인덱스 설계',
          description: '조회 성능 향상을 위한 인덱스 전략을 수립하고 각 인덱스의 구성과 목적을 설명합니다.'
        }
      ]
    },
    {
      id: 'api',
      title: 'API 문서',
      description: 'API 엔드포인트와 요청/응답 구조를 정의합니다.',
      sections: [
        '1. API 개요',
        '2. 인증 방식',
        '3. 엔드포인트 목록',
        '4. 요청/응답 형식',
        '5. 에러 코드'
      ]
    }
  ];

  const handleBack = () => {
    navigate('/mypage/recruiting');
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // 선택된 템플릿에 따라 해당 문서 작성 페이지로 이동
    switch (template.id) {
      case 'api':
        navigate(`/project/${projectId}/api-docs`);
        break;
      case 'erd':
        navigate(`/project/${projectId}/erd-docs`);
        break;
      default:
        // 기본 문서 작성 페이지로 이동
        navigate(`/project/${projectId}/tech-docs/create`, { state: { template } });
    }
  };

  const handleAddDoc = () => {
    if (!newDoc.title || !newDoc.content) return;

    if (editingDoc) {
      setDocs(docs.map(doc =>
        doc.id === editingDoc.id
          ? { ...newDoc, id: doc.id, lastModified: new Date().toISOString().split('T')[0] }
          : doc
      ));
    } else {
      setDocs([
        ...docs,
        {
          ...newDoc,
          id: docs.length + 1,
          lastModified: new Date().toISOString().split('T')[0]
        }
      ]);
    }

    setNewDoc({ title: '', content: '', category: '' });
    setEditingDoc(null);
    setShowModal(false);
  };

  const handleEditDoc = (doc) => {
    setEditingDoc(doc);
    setNewDoc({
      title: doc.title,
      content: doc.content,
      category: doc.category
    });
    setShowModal(true);
  };

  const handleDeleteDoc = (docId) => {
    setDocs(docs.filter(doc => doc.id !== docId));
  };

  return (
    <div className="tech-docs-container">
      <div className="tech-docs-header">
        <button className="back-button" onClick={handleBack}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
          </svg>
        </button>
        <div className="tech-docs-header-content">
          <h2>기술 문서</h2>
          <button className="add-button" onClick={() => setShowTemplateModal(true)}>
            <MdAdd /> 문서 작성
          </button>
        </div>
      </div>

      <div className="templates-section">
        <h3>문서 템플릿</h3>
        <p className="section-description">
          프로젝트에 필요한 기술 문서를 작성하세요. 아래 템플릿을 선택하여 시작할 수 있습니다.
        </p>
        <div className="templates-grid">
          {documentTemplates.map(template => (
            <div key={template.id} className="template-card" onClick={() => handleTemplateSelect(template)}>
              <h4>{template.title}</h4>
              <p>{template.description}</p>
              <div className="template-sections">
                {template.sections.map((section, index) => (
                  <div key={index} className="section-item">
                    {typeof section === 'string' ? section : section.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="documents-section">
        <h3>작성된 문서</h3>
        <div className="documents-grid">
          {docs.map(doc => (
            <div key={doc.id} className="document-card">
              <h4>{doc.title}</h4>
              <p>{doc.description}</p>
              <div className="document-actions">
                <button className="edit-button" onClick={() => handleEditDoc(doc)}>
                  <MdEdit /> 수정
                </button>
                <button className="delete-button" onClick={() => handleDeleteDoc(doc.id)}>
                  <MdDelete /> 삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="document-modal">
          <div className="modal-content">
            <h3>{selectedTemplate.title} 작성</h3>
            <div className="template-preview">
              <h4>문서 구조</h4>
              {selectedTemplate.sections.map((section, index) => (
                <div key={index} className="section-preview">
                  {section}
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button onClick={() => {/* 문서 작성 시작 */}}>문서 작성 시작</button>
              <button onClick={() => setShowModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {showTemplateModal && (
        <div className="template-modal">
          <div className="modal-content">
            <h3>문서 템플릿 선택</h3>
            <div className="template-list">
              {documentTemplates.map(template => (
                <div key={template.id} className="template-item" onClick={() => handleTemplateSelect(template)}>
                  <h4>{template.title}</h4>
                  <p>{template.description}</p>
                  <div className="template-sections">
                    {Array.isArray(template.sections) && template.sections.map((section, index) => (
                      <div key={index} className="template-section">
                        {typeof section === 'string' ? (
                          section
                        ) : (
                          <div className="section-with-info">
                            <span>{section.title}</span>
                            <div className="info-icon" title={section.description}>
                              <MdInfo />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowTemplateModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechDocs; 