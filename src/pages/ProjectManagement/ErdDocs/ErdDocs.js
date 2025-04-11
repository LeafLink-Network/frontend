import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdAdd, MdEdit, MdDelete, MdLink, MdInfo } from 'react-icons/md';
import './ErdDocs.css';

const ErdDocs = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [entities, setEntities] = useState([
    {
      id: 1,
      name: 'User',
      description: '사용자 정보',
      attributes: [
        { name: 'id', type: 'UUID', isPrimary: true, description: '사용자 고유 식별자' },
        { name: 'email', type: 'VARCHAR(255)', isUnique: true, description: '사용자 이메일' },
        { name: 'password', type: 'VARCHAR(255)', description: '암호화된 비밀번호' },
        { name: 'name', type: 'VARCHAR(100)', description: '사용자 이름' },
        { name: 'created_at', type: 'TIMESTAMP', description: '생성 일시' }
      ],
      relations: [
        { to: 'Project', type: 'OneToMany', description: '사용자가 생성한 프로젝트' }
      ]
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingEntity, setEditingEntity] = useState(null);
  const [newEntity, setNewEntity] = useState({
    name: '',
    description: '',
    attributes: [],
    relations: []
  });

  const [showAttributeModal, setShowAttributeModal] = useState(false);
  const [newAttribute, setNewAttribute] = useState({
    name: '',
    type: '',
    isPrimary: false,
    isUnique: false,
    description: ''
  });

  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const erdDescription = `ERD 설계 작성 방법:
1. 엔티티 정의: 시스템에서 사용되는 모든 엔티티(테이블)를 정의하고 각각의 역할과 특성을 설명합니다.
2. 관계 정의: 엔티티 간의 관계를 정의하고 관계의 유형(1:1, 1:N, N:M)과 참조 무결성을 설명합니다.
3. 속성 정의: 각 엔티티의 속성(컬럼)을 정의하고 데이터 타입, 길이, NULL 허용 여부 등을 명시합니다.
4. 제약 조건: 기본키, 외래키, 유니크 제약조건 등 데이터 무결성을 위한 제약조건을 정의합니다.
5. 인덱스 설계: 조회 성능 향상을 위한 인덱스 전략을 수립하고 각 인덱스의 구성과 목적을 설명합니다.`;

  const handleBack = () => {
    navigate('/mypage/recruiting');
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.info-icon') && !event.target.closest('.info-popup')) {
      setShowInfoPopup(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddEntity = () => {
    if (!newEntity.name) return;

    if (editingEntity) {
      setEntities(entities.map(entity =>
        entity.id === editingEntity.id
          ? { ...newEntity, id: entity.id }
          : entity
      ));
    } else {
      setEntities([
        ...entities,
        {
          ...newEntity,
          id: entities.length + 1
        }
      ]);
    }

    setNewEntity({ name: '', description: '', attributes: [], relations: [] });
    setEditingEntity(null);
    setShowModal(false);
  };

  const handleAddAttribute = () => {
    if (!newAttribute.name || !newAttribute.type) return;

    const updatedEntity = {
      ...newEntity,
      attributes: [...newEntity.attributes, newAttribute]
    };
    setNewEntity(updatedEntity);
    setNewAttribute({
      name: '',
      type: '',
      isPrimary: false,
      isUnique: false,
      description: ''
    });
    setShowAttributeModal(false);
  };

  const handleEditEntity = (entity) => {
    setEditingEntity(entity);
    setNewEntity({
      name: entity.name,
      description: entity.description,
      attributes: entity.attributes,
      relations: entity.relations
    });
    setShowModal(true);
  };

  const handleDeleteEntity = (entityId) => {
    setEntities(entities.filter(entity => entity.id !== entityId));
  };

  return (
    <div className="erd-docs-container">
      <div className="erd-docs-header">
        <button className="back-button" onClick={handleBack}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
          </svg>
        </button>
        <div className="erd-docs-header-content">
          <div className="title-with-info">
            <h2>ERD 설계</h2>
            <div className="info-icon" onClick={() => setShowInfoPopup(!showInfoPopup)}>
              <MdInfo />
            </div>
            {showInfoPopup && (
              <div className="info-popup">
                <h4>ERD 설계 작성 방법</h4>
                <ol>
                  <li>엔티티 정의: 시스템에서 사용되는 모든 엔티티(테이블)를 정의하고 각각의 역할과 특성을 설명합니다.</li>
                  <li>관계 정의: 엔티티 간의 관계를 정의하고 관계의 유형(1:1, 1:N, N:M)과 참조 무결성을 설명합니다.</li>
                  <li>속성 정의: 각 엔티티의 속성(컬럼)을 정의하고 데이터 타입, 길이, NULL 허용 여부 등을 명시합니다.</li>
                  <li>제약 조건: 기본키, 외래키, 유니크 제약조건 등 데이터 무결성을 위한 제약조건을 정의합니다.</li>
                  <li>인덱스 설계: 조회 성능 향상을 위한 인덱스 전략을 수립하고 각 인덱스의 구성과 목적을 설명합니다.</li>
                </ol>
              </div>
            )}
          </div>
          <button className="add-button" onClick={() => setShowModal(true)}>
            <MdAdd /> 엔티티 추가
          </button>
        </div>
      </div>

      <div className="entities-list">
        {entities.map(entity => (
          <div key={entity.id} className="entity-item">
            <div className="entity-header">
              <h4 className="entity-name">{entity.name}</h4>
              <div className="entity-actions">
                <button className="edit-button" onClick={() => handleEditEntity(entity)}>
                  <MdEdit />
                </button>
                <button className="delete-button" onClick={() => handleDeleteEntity(entity.id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
            <p className="entity-description">{entity.description}</p>
            
            <div className="attributes-section">
              <h5>속성</h5>
              <table className="attributes-table">
                <thead>
                  <tr>
                    <th>이름</th>
                    <th>타입</th>
                    <th>제약조건</th>
                    <th>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {entity.attributes.map((attr, index) => (
                    <tr key={index}>
                      <td>{attr.name}</td>
                      <td>{attr.type}</td>
                      <td>
                        {attr.isPrimary && <span className="constraint primary">PK</span>}
                        {attr.isUnique && <span className="constraint unique">UQ</span>}
                      </td>
                      <td>{attr.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {entity.relations.length > 0 && (
              <div className="relations-section">
                <h5>관계</h5>
                <div className="relations-list">
                  {entity.relations.map((relation, index) => (
                    <div key={index} className="relation-item">
                      <MdLink />
                      <span className="relation-to">{relation.to}</span>
                      <span className="relation-type">{relation.type}</span>
                      <span className="relation-description">{relation.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="entity-modal">
          <div className="modal-content">
            <h3>{editingEntity ? '엔티티 수정' : '새 엔티티 추가'}</h3>
            <div className="form-group">
              <label>엔티티 이름</label>
              <input
                type="text"
                value={newEntity.name}
                onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })}
                placeholder="User"
              />
            </div>
            <div className="form-group">
              <label>설명</label>
              <textarea
                value={newEntity.description}
                onChange={(e) => setNewEntity({ ...newEntity, description: e.target.value })}
                placeholder="엔티티에 대한 설명을 입력하세요"
              />
            </div>
            <div className="attributes-list">
              <div className="attributes-header">
                <h5>속성</h5>
                <button className="add-attribute-button" onClick={() => setShowAttributeModal(true)}>
                  <MdAdd /> 속성 추가
                </button>
              </div>
              {newEntity.attributes.map((attr, index) => (
                <div key={index} className="attribute-item">
                  <span>{attr.name}</span>
                  <span>{attr.type}</span>
                  <span>{attr.description}</span>
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button onClick={handleAddEntity}>
                {editingEntity ? '수정' : '추가'}
              </button>
              <button onClick={() => setShowModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}

      {showAttributeModal && (
        <div className="attribute-modal">
          <div className="modal-content">
            <h3>속성 추가</h3>
            <div className="form-group">
              <label>속성 이름</label>
              <input
                type="text"
                value={newAttribute.name}
                onChange={(e) => setNewAttribute({ ...newAttribute, name: e.target.value })}
                placeholder="id"
              />
            </div>
            <div className="form-group">
              <label>데이터 타입</label>
              <input
                type="text"
                value={newAttribute.type}
                onChange={(e) => setNewAttribute({ ...newAttribute, type: e.target.value })}
                placeholder="VARCHAR(255)"
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={newAttribute.isPrimary}
                  onChange={(e) => setNewAttribute({ ...newAttribute, isPrimary: e.target.checked })}
                />
                기본키
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={newAttribute.isUnique}
                  onChange={(e) => setNewAttribute({ ...newAttribute, isUnique: e.target.checked })}
                />
                고유키
              </label>
            </div>
            <div className="form-group">
              <label>설명</label>
              <textarea
                value={newAttribute.description}
                onChange={(e) => setNewAttribute({ ...newAttribute, description: e.target.value })}
                placeholder="속성에 대한 설명을 입력하세요"
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleAddAttribute}>추가</button>
              <button onClick={() => setShowAttributeModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ErdDocs; 