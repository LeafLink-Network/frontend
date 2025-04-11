import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MyPage from './pages/MyPage/MyPage';
import JobReport from './pages/JobReport/JobReport';
import ReportAnalysis from './pages/ReportAnalysis/ReportAnalysis';
import MyReport from './pages/MyReport/MyReport';
import SideProjectList from './pages/SideProjectList/SideProjectList';
import ProjectCreate from './pages/ProjectCreate/ProjectCreate';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import ProjectApply from './pages/ProjectApply/ProjectApply';
import ProjectChat from './pages/ProjectManagement/Chat/ProjectChat';
import ApiDocs from './pages/ProjectManagement/ApiDocs/ApiDocs';
import TechDocs from './pages/ProjectManagement/TechDocs/TechDocs';
import KanbanBoard from './pages/ProjectManagement/KanbanBoard/KanbanBoard';
import Schedule from './pages/ProjectManagement/Schedule/Schedule';
import Meetings from './pages/ProjectManagement/Meetings/Meetings';
import RouteDocs from './pages/ProjectManagement/RouteDocs/RouteDocs';
import ErdDocs from './pages/ProjectManagement/ErdDocs/ErdDocs';
import ApplicantDetail from './pages/ApplicantDetail/ApplicantDetail';
import SavedProjects from './pages/MyPage/SavedProjects/SavedProjects';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로컬 스토리지에서 로그인 상태 불러오기
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // 로그인 상태 변경 함수
  const handleLoginStatus = (status) => {
    setIsLoggedIn(status);
    localStorage.setItem('isLoggedIn', status);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={handleLoginStatus} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={handleLoginStatus} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/edit" element={<MyPage />} />
            <Route path="/mypage/recruiting" element={<MyPage />} />
            <Route path="/mypage/liked-posts" element={<MyPage />} />
            <Route path="/mypage/liked-jobs" element={<MyPage />} />
            <Route path="/mypage/saved-jobs" element={<MyPage />} />
            <Route path="/mypage/applied-projects" element={<MyPage />} />
            <Route path="/mypage/liked-projects" element={<MyPage />} />
            <Route path="/mypage/saved-projects" element={<MyPage />} />
            <Route path="/mypage/recruiting" element={<SavedProjects />} />
            <Route path="/mypage/project/chat/:projectId" element={<ProjectChat />} />
            <Route path="/mypage/project/meetings/:projectId" element={<Meetings />} />
            <Route path="/mypage/project/api-docs/:projectId" element={<ApiDocs />} />
            <Route path="/mypage/project/tech-docs/:projectId" element={<TechDocs />} />
            <Route path="/mypage/project/kanban/:projectId" element={<KanbanBoard />} />
            <Route path="/mypage/project/schedule/:projectId" element={<Schedule />} />
            <Route path="/myreport" element={<MyReport />} />
            <Route path="/reports/summary" element={<JobReport />} />
            <Route path="/reports/analysis" element={<ReportAnalysis />} />
            <Route path="/projects" element={<SideProjectList />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="/projects/:projectId/apply" element={<ProjectApply />} />
            <Route path="/project/create" element={<ProjectCreate />} />
            <Route path="/project/:projectId/route-docs" element={<RouteDocs />} />
            <Route path="/project/:projectId/erd-docs" element={<ErdDocs />} />
            <Route path="/applicant/:id" element={<ApplicantDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
