import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdClose, MdDragIndicator, MdArrowBack } from 'react-icons/md';
import './KanbanBoard.css';

const KanbanBoard = ({ projectId }) => {
  const navigate = useNavigate();
  const [columns, setColumns] = useState({
    backlog: {
      title: '백로그',
      items: [
        { id: 1, title: '프로젝트 요구사항 분석', description: '프로젝트 범위 및 기능 요구사항 정의', assignee: '김철수', dueDate: '2024-03-25' },
        { id: 2, title: '기술 스택 선정', description: '프로젝트에 사용할 기술 스택 결정', assignee: '이영희', dueDate: '2024-03-27' },
      ]
    },
    todo: {
      title: '할 일',
      items: [
        { id: 3, title: 'API 설계', description: 'RESTful API 엔드포인트 설계', assignee: '김철수', dueDate: '2024-03-25' },
        { id: 4, title: '데이터베이스 모델링', description: 'ERD 작성 및 테이블 설계', assignee: '이영희', dueDate: '2024-03-27' },
      ]
    },
    inProgress: {
      title: '진행 중',
      items: [
        { id: 5, title: '로그인 기능 구현', description: '소셜 로그인 포함', assignee: '박지민', dueDate: '2024-03-23' },
      ]
    },
    done: {
      title: '완료',
      items: [
        { id: 6, title: '프로젝트 초기 설정', description: '개발 환경 구성', assignee: '김철수', dueDate: '2024-03-20' },
      ]
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    dueDate: ''
  });

  const handleBack = () => {
    navigate('/mypage/recruiting');
  };

  const handleDragStart = (e, columnId, itemId) => {
    e.dataTransfer.setData('columnId', columnId);
    e.dataTransfer.setData('itemId', itemId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const sourceColumnId = e.dataTransfer.getData('columnId');
    const itemId = parseInt(e.dataTransfer.getData('itemId'));

    if (sourceColumnId === targetColumnId) return;

    const sourceItem = columns[sourceColumnId].items.find(item => item.id === itemId);
    
    setColumns(prev => ({
      ...prev,
      [sourceColumnId]: {
        ...prev[sourceColumnId],
        items: prev[sourceColumnId].items.filter(item => item.id !== itemId)
      },
      [targetColumnId]: {
        ...prev[targetColumnId],
        items: [...prev[targetColumnId].items, sourceItem]
      }
    }));
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    const newId = Math.max(...Object.values(columns).flatMap(col => col.items.map(item => item.id))) + 1;
    
    setColumns(prev => ({
      ...prev,
      [selectedColumn]: {
        ...prev[selectedColumn],
        items: [...prev[selectedColumn].items, { ...newTask, id: newId }]
      }
    }));

    setNewTask({ title: '', description: '', assignee: '', dueDate: '' });
    setShowModal(false);
  };

  return (
    <div className="kanban-container">
      <div className="kanban-header">
        <button className="back-button" onClick={handleBack}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
          </svg>
        </button>
        <div className="kanban-header-content">
          <h2>칸반 보드</h2>
        </div>
      </div>
      
      <div className="kanban-board">
        {Object.entries(columns).map(([columnId, column]) => (
          <div
            key={columnId}
            className="kanban-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnId)}
          >
            <div className="kanban-column-header">
              <h3>{column.title}</h3>
              <button
                className="kanban-add-button"
                onClick={() => {
                  setSelectedColumn(columnId);
                  setShowModal(true);
                }}
              >
                <MdAdd />
              </button>
            </div>

            <div className="kanban-items">
              {column.items.map(item => (
                <div
                  key={item.id}
                  className="kanban-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, columnId, item.id)}
                >
                  <div className="kanban-item-drag-handle">
                    <MdDragIndicator />
                  </div>
                  <div className="kanban-item-content">
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <div className="kanban-item-footer">
                      <span className="kanban-item-assignee">{item.assignee}</span>
                      <span className="kanban-item-due-date">{item.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="kanban-modal-overlay">
          <div className="kanban-modal">
            <div className="kanban-modal-header">
              <h3>새 작업 추가</h3>
              <button className="kanban-modal-close" onClick={() => setShowModal(false)}>
                <MdClose />
              </button>
            </div>
            
            <div className="kanban-modal-content">
              <div className="kanban-modal-field">
                <label>제목</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="작업 제목을 입력하세요"
                />
              </div>

              <div className="kanban-modal-field">
                <label>설명</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="작업 설명을 입력하세요"
                />
              </div>

              <div className="kanban-modal-field">
                <label>담당자</label>
                <input
                  type="text"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                  placeholder="담당자 이름을 입력하세요"
                />
              </div>

              <div className="kanban-modal-field">
                <label>마감일</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="kanban-modal-actions">
              <button className="kanban-modal-cancel" onClick={() => setShowModal(false)}>
                취소
              </button>
              <button className="kanban-modal-save" onClick={handleAddTask}>
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard; 