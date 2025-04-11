import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import './ApiDocs.css';

const ApiDocs = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const [apis, setApis] = useState([
    {
      id: 1,
      endpoint: '/api/auth/login',
      method: 'POST',
      description: '사용자 로그인',
      requestBody: {
        email: 'string',
        password: 'string'
      },
      response: {
        token: 'string',
        user: {
          id: 'number',
          email: 'string',
          name: 'string'
        }
      }
    }
  ]);

  const handleBack = () => {
    navigate('/mypage/recruiting');
  };

  const handleAddDoc = () => {
    setSelectedDoc(null);
    setShowModal(true);
  };

  return (
    <div className="api-docs-container">
      <div className="api-docs-header">
        <button className="back-button" onClick={handleBack}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
          </svg>
        </button>
        <div className="api-docs-header-content">
          <h2>API 문서</h2>
          <button className="add-button" onClick={handleAddDoc}>
            <MdAdd /> API 추가
          </button>
        </div>
      </div>

      <div className="api-list">
        {apis.map(doc => (
          <div key={doc.id} className="api-item">
            <div className="api-item-header">
              <div className="api-method" data-method={doc.method.toLowerCase()}>
                {doc.method}
              </div>
              <div className="api-endpoint">{doc.endpoint}</div>
              <div className="api-actions">
                <button className="edit-button">
                  <MdEdit />
                </button>
                <button className="delete-button">
                  <MdDelete />
                </button>
              </div>
            </div>
            <div className="api-description">{doc.description}</div>
            <div className="api-details">
              <div className="api-section">
                <h4>Request Body</h4>
                <pre>{JSON.stringify(doc.requestBody, null, 2)}</pre>
              </div>
              <div className="api-section">
                <h4>Response</h4>
                <pre>{JSON.stringify(doc.response, null, 2)}</pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="doc-modal">
          <div className="modal-content">
            <h3>{selectedDoc ? 'API 수정' : '새 API 작성'}</h3>
            <div className="api-form">
              <div className="form-group">
                <label>Method</label>
                <select>
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>
              </div>
              <div className="form-group">
                <label>Endpoint</label>
                <input type="text" placeholder="/api/..." />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" placeholder="API 설명" />
              </div>
              <div className="form-group">
                <label>Request Body</label>
                <textarea placeholder="{ }" rows={5} />
              </div>
              <div className="form-group">
                <label>Response</label>
                <textarea placeholder="{ }" rows={5} />
              </div>
            </div>
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

export default ApiDocs; 