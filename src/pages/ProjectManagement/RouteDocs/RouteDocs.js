import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack, MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import './RouteDocs.css';

const RouteDocs = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([
    {
      id: 1,
      path: '/auth',
      description: '인증 관련 라우트',
      children: [
        { path: '/login', method: 'GET', component: 'LoginPage', auth: false },
        { path: '/register', method: 'GET', component: 'RegisterPage', auth: false },
        { path: '/forgot-password', method: 'GET', component: 'ForgotPasswordPage', auth: false }
      ]
    },
    {
      id: 2,
      path: '/mypage',
      description: '마이페이지 관련 라우트',
      children: [
        { path: '/profile', method: 'GET', component: 'ProfilePage', auth: true },
        { path: '/saved-projects', method: 'GET', component: 'SavedProjectsPage', auth: true },
        { path: '/applied-projects', method: 'GET', component: 'AppliedProjectsPage', auth: true }
      ]
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [newRoute, setNewRoute] = useState({
    path: '',
    description: '',
    children: []
  });

  const handleBack = () => {
    navigate('/mypage/recruiting');
  };

  const handleAddRoute = () => {
    if (!newRoute.path) return;

    if (editingRoute) {
      setRoutes(routes.map(route =>
        route.id === editingRoute.id
          ? { ...newRoute, id: route.id }
          : route
      ));
    } else {
      setRoutes([
        ...routes,
        {
          ...newRoute,
          id: routes.length + 1
        }
      ]);
    }

    setNewRoute({ path: '', description: '', children: [] });
    setEditingRoute(null);
    setShowModal(false);
  };

  const handleEditRoute = (route) => {
    setEditingRoute(route);
    setNewRoute({
      path: route.path,
      description: route.description,
      children: route.children
    });
    setShowModal(true);
  };

  const handleDeleteRoute = (routeId) => {
    setRoutes(routes.filter(route => route.id !== routeId));
  };

  return (
    <div className="route-docs-container">
      <div className="route-docs-header">
        <button className="back-button" onClick={handleBack}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.82843 6.99955L8.36396 9.53509L6.94975 10.9493L2 5.99955L6.94975 1.0498L8.36396 2.46402L5.82843 4.99955H13C17.4183 4.99955 21 8.58127 21 12.9996C21 17.4178 17.4183 20.9996 13 20.9996H4V18.9996H13C16.3137 18.9996 19 16.3133 19 12.9996C19 9.68584 16.3137 6.99955 13 6.99955H5.82843Z"></path>
          </svg>
        </button>
        <div className="route-docs-header-content">
          <h2>라우팅 정의서</h2>
          <button className="add-button" onClick={() => setShowModal(true)}>
            <MdAdd /> 라우트 추가
          </button>
        </div>
      </div>

      <div className="routes-list">
        {routes.map(route => (
          <div key={route.id} className="route-item">
            <div className="route-item-header">
              <div className="route-path">{route.path}</div>
              <div className="route-actions">
                <button className="edit-button" onClick={() => handleEditRoute(route)}>
                  <MdEdit />
                </button>
                <button className="delete-button" onClick={() => handleDeleteRoute(route.id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
            <div className="route-description">{route.description}</div>
            {route.children && route.children.length > 0 && (
              <div className="route-children">
                <h4>하위 라우트</h4>
                {route.children.map((child, index) => (
                  <div key={index} className="child-route">
                    <div className="child-route-path">{child.path}</div>
                    <div className="child-route-details">
                      <div className="route-info">
                        <span className="route-label">컴포넌트:</span>
                        <span className="route-value">{child.component}</span>
                      </div>
                      <div className="route-info">
                        <span className="route-label">메소드:</span>
                        <span className="route-value">{child.method}</span>
                      </div>
                      <div className="route-info">
                        <span className="route-label">인증 필요:</span>
                        <span className="route-value">{child.auth ? '예' : '아니오'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="route-modal">
          <div className="modal-content">
            <h3>{editingRoute ? '라우트 수정' : '새 라우트 추가'}</h3>
            <div className="form-group">
              <label>경로</label>
              <input
                type="text"
                value={newRoute.path}
                onChange={(e) => setNewRoute({ ...newRoute, path: e.target.value })}
                placeholder="/example"
              />
            </div>
            <div className="form-group">
              <label>설명</label>
              <textarea
                value={newRoute.description}
                onChange={(e) => setNewRoute({ ...newRoute, description: e.target.value })}
                placeholder="라우트에 대한 설명을 입력하세요"
              />
            </div>
            <div className="modal-actions">
              <button onClick={handleAddRoute}>
                {editingRoute ? '수정' : '추가'}
              </button>
              <button onClick={() => setShowModal(false)}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteDocs; 