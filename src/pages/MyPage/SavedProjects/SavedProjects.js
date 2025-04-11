import React, { useState, useEffect } from 'react';
import { MdBookmarkRemove, MdSchema, MdDelete, MdEdit, MdKeyboardArrowDown, MdChat, MdCalendarToday, MdLink, MdCode, MdDescription, MdAdd, MdPerson, MdClose, MdLibraryBooks, MdDashboard, MdApi, MdAccountTree, MdOpenInNew } from 'react-icons/md';
import { FaUsers, FaGithub } from 'react-icons/fa';
import { SiNotion, SiPostman } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './SavedProjects.css';
import AppliedProjects from '../AppliedProjects/AppliedProjects';

const SavedProjects = ({ filter }) => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: '음악 스트리밍 플랫폼 개발',
      description: '인디 뮤지션을 위한 음악 스트리밍 및 커뮤니티 플랫폼',
      techStack: ['React', 'Node.js', 'MongoDB', 'AWS'],
      positions: [
        { 
          name: '프론트엔드 개발자', 
          applicants: [
            {
              id: 'front1',
              name: '김지원',
              email: 'kim@example.com',
              applyDate: '2024-03-15',
              status: '서류 검토',
              coverLetter: '안녕하세요. 3년차 프론트엔드 개발자입니다. React와 TypeScript를 주로 사용하며, 성능 최적화와 사용자 경험 개선에 관심이 많습니다.',
              resumeUrl: 'https://example.com/resume/kim.pdf'
            },
            {
              id: 'front2',
              name: '이하늘',
              email: 'lee@example.com',
              applyDate: '2024-03-16',
              status: '면접 예정',
              coverLetter: '음악과 개발을 좋아하는 프론트엔드 개발자입니다. 음악 스트리밍 서비스에 대한 경험이 있으며, 웹 오디오 API를 활용한 프로젝트를 진행한 경험이 있습니다.',
              resumeUrl: 'https://example.com/resume/lee.pdf'
            },
            {
              id: 'front3',
              name: '박서연',
              email: 'park@example.com',
              applyDate: '2024-03-17',
              status: '합류 결정',
              coverLetter: '음악 스트리밍 플랫폼 개발에 관심이 많습니다. Next.js와 React Query를 활용한 프로젝트 경험이 있습니다.',
              resumeUrl: 'https://example.com/resume/park.pdf'
            }
          ]
        },
        { 
          name: '백엔드 개발자', 
          applicants: [
            {
              id: 'back1',
              name: '정민우',
              email: 'jung@example.com',
              applyDate: '2024-03-15',
              status: '서류 검토',
              coverLetter: 'Node.js와 MongoDB를 활용한 백엔드 개발 경험이 있습니다. RESTful API 설계와 개발에 자신 있습니다.',
              resumeUrl: 'https://example.com/resume/jung.pdf'
            },
            {
              id: 'back2',
              name: '최유진',
              email: 'choi@example.com',
              applyDate: '2024-03-16',
              status: '불합격',
              coverLetter: '백엔드 개발자로 2년간 일했습니다. AWS 서비스를 활용한 서버 구축 경험이 있습니다.',
              resumeUrl: 'https://example.com/resume/choi.pdf'
            }
          ]
        },
        { 
          name: 'DevOps', 
          applicants: [
            {
              id: 'devops1',
              name: '한도윤',
              email: 'han@example.com',
              applyDate: '2024-03-17',
              status: '면접 예정',
              coverLetter: 'AWS와 Docker를 활용한 인프라 구축 경험이 있습니다. CI/CD 파이프라인 구축에 자신 있습니다.',
              resumeUrl: 'https://example.com/resume/han.pdf'
            }
          ]
        }
      ],
      totalApplicants: 6,
      startDate: '2024-04-05',
      duration: '5개월',
      status: '모집중',
      recruitmentStatus: '모집중',
      teamMembers: {
        PM: [
          { name: '김철수', id: 'user123' }
        ],
        프론트엔드: [
          { name: '이영희', id: 'front123' },
          { name: '박지민', id: 'front456' },
          { name: '김민수', id: 'front789' }
        ],
        백엔드: [
          { name: '홍길동', id: 'back123' },
          { name: '김영수', id: 'back456' }
        ],
        디자이너: [
          { name: '최민지', id: 'design123' },
          { name: '이지은', id: 'design456' },
          { name: '박서연', id: 'design789' }
        ]
      },
      links: {
        github: 'https://github.com/project/music-platform',
        notion: 'https://notion.so/team/music-platform',
        deploy: 'https://music-platform.com'
      }
    },
    {
      id: 2,
      title: '실시간 화상 교육 플랫폼',
      description: '온라인 교육을 위한 실시간 화상 수업 및 학습 관리 시스템',
      techStack: ['Vue.js', 'Spring Boot', 'WebRTC', 'Redis'],
      positions: [
        { name: '프론트엔드 개발자', applicants: 4 },
        { name: '백엔드 개발자', applicants: 3 },
        { name: 'UI/UX 디자이너', applicants: 2 }
      ],
      totalApplicants: 9,
      startDate: '2024-04-10',
      duration: '6개월',
      status: '모집중',
      recruitmentStatus: '모집중',
      isMyProject: true,
      teamMembers: {
        PM: [
          { name: '이지훈', id: 'user456' }
        ],
        프론트엔드: [
          { name: '김서연', id: 'front234' }
        ]
      },
      links: {
        github: 'https://github.com/project/edu-platform',
        notion: 'https://notion.so/team/edu-platform'
      }
    },
    {
      id: 3,
      title: '푸드테크 배달 서비스',
      description: 'AI 기반 맛집 추천과 실시간 배달 현황 추적 서비스',
      techStack: ['React Native', 'Django', 'PostgreSQL', 'TensorFlow'],
      positions: [
        { name: '앱 개발자', applicants: 5 },
        { name: '백엔드 개발자', applicants: 3 },
        { name: 'AI 엔지니어', applicants: 2 }
      ],
      startDate: '2024-04-15',
      duration: '4개월',
      status: '모집완료',
      recruitmentStatus: '모집완료',
      isMyProject: true,
      teamMembers: {
        PM: [
          { name: '박준호', id: 'user789' }
        ],
        '앱 개발자': [
          { name: '김민준', id: 'app123' },
          { name: '이하은', id: 'app456' }
        ],
        '백엔드 개발자': [
          { name: '정우진', id: 'back789' }
        ],
        'AI 엔지니어': [
          { name: '한소희', id: 'ai123' }
        ]
      },
      links: {
        github: 'https://github.com/project/food-delivery',
        notion: 'https://notion.so/team/food-delivery'
      }
    },
    {
      id: 4,
      title: '스마트홈 IoT 플랫폼',
      description: '가정용 IoT 기기 통합 제어 및 모니터링 시스템',
      techStack: ['React', 'NestJS', 'MongoDB', 'MQTT'],
      positions: [
        { name: '프론트엔드 개발자', applicants: 3 },
        { name: '백엔드 개발자', applicants: 2 },
        { name: 'IoT 엔지니어', applicants: 2 }
      ],
      totalApplicants: 7,
      startDate: '2024-03-20',
      duration: '8개월',
      status: '모집중단',
      recruitmentStatus: '모집중단',
      isMyProject: true,
      teamMembers: {
        PM: [
          { name: '최현우', id: 'user101' }
        ],
        프론트엔드: [
          { name: '김태희', id: 'front567' }
        ]
      },
      links: {
        github: 'https://github.com/project/smart-home',
        notion: 'https://notion.so/team/smart-home'
      }
    },
    {
      id: 5,
      title: '블록체인 기반 투표 시스템',
      description: '투명하고 안전한 온라인 투표 플랫폼',
      techStack: ['React', 'Solidity', 'Node.js', 'Ethereum'],
      positions: [
        { name: '프론트엔드 개발자', applicants: 2 },
        { name: '스마트 컨트랙트 개발자', applicants: 3 },
        { name: '백엔드 개발자', applicants: 2 }
      ],
      totalApplicants: 7,
      startDate: '2024-03-15',
      duration: '6개월',
      status: '모집완료',
      recruitmentStatus: '모집완료',
      isMyProject: true,
      teamMembers: {
        PM: [
          { name: '이동훈', id: 'user202' }
        ],
        프론트엔드: [
          { name: '박지영', id: 'front890' }
        ],
        '스마트 컨트랙트': [
          { name: '김현수', id: 'smart123' }
        ],
        백엔드: [
          { name: '정민재', id: 'back234' }
        ]
      },
      links: {
        github: 'https://github.com/project/blockchain-vote',
        notion: 'https://notion.so/team/blockchain-vote'
      }
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('PM');
  const [showDeleteMemberModal, setShowDeleteMemberModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [roleToDeleteFrom, setRoleToDeleteFrom] = useState(null);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [linkType, setLinkType] = useState(null);
  const [linkUrl, setLinkUrl] = useState('');
  const [newRole, setNewRole] = useState('');
  const [customRole, setCustomRole] = useState('');
  const [showCustomRole, setShowCustomRole] = useState(false);
  const [showApplicantDetailModal, setShowApplicantDetailModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  
  // 원본 더미 데이터는 상수로 분리
  const DUMMY_USERS = [
    { email: 'kim@example.com', name: '김철수' },
    { email: 'lee@example.com', name: '이영희' },
    { email: 'park@example.com', name: '박지민' },
    { email: 'choi@example.com', name: '최민지' }
  ];
  
  const [showSearchResults, setShowSearchResults] = useState(false);

  const statusOptions = [
    { value: '진행중', color: '#339af0', bgColor: '#e7f5ff' },
    { value: '진행완료', color: '#868e96', bgColor: '#f1f3f5' },
    { value: '모집중', color: '#FF8A3D', bgColor: '#fff4e6' },
    { value: '모집완료', color: '#339af0', bgColor: '#e7f5ff' },
    { value: '모집중단', color: '#fa5252', bgColor: '#fff5f5' }
  ];

  const applicantStatusOptions = [
    { value: '검토 중', color: '#FF8A3D' },
    { value: '합류 결정', color: '#15CB96' },
    { value: '면접 예정', color: '#339af0' },
    { value: '다음 기회에', color: '#fa5252' }
  ];

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    if (!location.search) {
      navigate('/mypage/recruiting?tab=ongoing', { replace: true });
    }
  }, [location.search, navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/mypage/recruiting?tab=${tab}`);
  };

  const handleRemove = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProject) {
      setProjects(projects.filter(project => project.id !== selectedProject.id));
      setShowDeleteModal(false);
      setSelectedProject(null);
    }
  };

  const handleShowApplicants = (project, position) => {
    // position이 객체가 아닌 경우(숫자만 있는 경우) 처리
    if (!Array.isArray(position.applicants)) {
      position = {
        ...position,
        applicants: Array(position.applicants).fill().map((_, i) => ({
          id: `dummy${i}`,
          name: `지원자 ${i + 1}`,
          email: `applicant${i + 1}@example.com`,
          applyDate: '2024-03-20',
          status: '서류 검토',
          coverLetter: '지원자 정보가 아직 등록되지 않았습니다.',
          resumeUrl: '#'
        }))
      };
    }
    
    setSelectedProject(project);
    setSelectedPosition(position);
    setShowApplicantsModal(true);
  };

  const handleStatusClick = (project) => {
    setSelectedProject(project);
    setShowStatusModal(true);
  };

  const handleStatusChange = (projectId, newStatus) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, recruitmentStatus: newStatus }
        : project
    ));
    setOpenStatusDropdown(null);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowStatusModal(false);
    setShowApplicantsModal(false);
    setSelectedProject(null);
    setSelectedPosition(null);
  };

  const handleAddTeamMember = (project) => {
    setSelectedProject(project);
    setShowTeamModal(true);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length === 0) {
      setShowSearchResults(false);
      return;
    }
    
    setShowSearchResults(true);
  };

  // 검색 결과를 실시간으로 계산
  const getFilteredUsers = () => {
    if (!searchQuery) return [];
    
    return DUMMY_USERS.filter(user => 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSelectUser = (user) => {
    // 선택된 사용자를 팀원으로 추가하는 로직
    const updatedProject = { ...selectedProject };
    if (!updatedProject.teamMembers[selectedRole]) {
      updatedProject.teamMembers[selectedRole] = [];
    }
    
    // 이미 추가된 팀원인지 확인
    const isAlreadyMember = updatedProject.teamMembers[selectedRole].some(
      member => member.id === user.email
    );
    
    if (!isAlreadyMember) {
      updatedProject.teamMembers[selectedRole].push({
        id: user.email,
        name: user.name
      });
      
      setProjects(projects.map(p => 
        p.id === selectedProject.id ? updatedProject : p
      ));
    }
    
    setSearchQuery('');
    setShowSearchResults(false);
    setShowTeamModal(false);
  };

  // 프로젝트 필터링
  const getFilteredProjects = () => {
    if (filter !== 'recruiting') return projects;

    switch (activeTab) {
      case 'ongoing':
        return projects.filter(project => project.recruitmentStatus === '진행중').slice(0, 1);
      case 'recruiting':
        return projects.filter(project => 
          ['모집중', '모집완료', '모집중단'].includes(project.recruitmentStatus) && 
          project.isMyProject
        );
      case 'past':
        return projects.filter(project => project.recruitmentStatus === '진행완료');
      case 'applied':
        return projects.filter(project => project.isApplied);
      default:
        return projects;
    }
  };

  const handleDeleteMember = (role, member) => {
    setMemberToDelete(member);
    setRoleToDeleteFrom(role);
    setShowDeleteMemberModal(true);
  };

  const handleConfirmDeleteMember = () => {
    if (!memberToDelete || !roleToDeleteFrom || !selectedProject) return;

    const updatedProject = { ...selectedProject };
    updatedProject.teamMembers[roleToDeleteFrom] = updatedProject.teamMembers[roleToDeleteFrom].filter(
      m => m.id !== memberToDelete.id
    );

    setProjects(projects.map(p => 
      p.id === selectedProject.id ? updatedProject : p
    ));

    setShowDeleteMemberModal(false);
    setMemberToDelete(null);
    setRoleToDeleteFrom(null);
  };

  const handleAddRole = () => {
    if (!selectedProject) return;

    const roleToAdd = showCustomRole ? customRole : newRole;
    if (!roleToAdd.trim()) return;

    const updatedProject = { ...selectedProject };
    if (!updatedProject.teamMembers) {
      updatedProject.teamMembers = {};
    }

    if (!updatedProject.teamMembers[roleToAdd]) {
      updatedProject.teamMembers[roleToAdd] = [];
      setProjects(projects.map(p =>
        p.id === selectedProject.id ? updatedProject : p
      ));
    }

    setNewRole('');
    setCustomRole('');
    setShowCustomRole(false);
  };

  const handleApplicantStatusChange = (projectId, positionName, applicantId, newStatus) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedPositions = project.positions.map(position => {
          if (position.name === positionName) {
            // position.applicants가 숫자인 경우 처리
            if (!Array.isArray(position.applicants)) {
              position.applicants = Array(position.applicants).fill().map((_, i) => ({
                id: `dummy${i}`,
                name: `지원자 ${i + 1}`,
                email: `applicant${i + 1}@example.com`,
                applyDate: '2024-03-20',
                status: i === 0 ? newStatus : '검토중'
              }));
              return position;
            }
            
            const updatedApplicants = position.applicants.map(applicant => {
              if (applicant.id === applicantId) {
                return { ...applicant, status: newStatus };
              }
              return applicant;
            });
            return { ...position, applicants: updatedApplicants };
          }
          return position;
        });
        return { ...project, positions: updatedPositions };
      }
      return project;
    }));
  };

  const handleViewApplicantDetail = (applicant) => {
    setSelectedApplicant(applicant);
    setShowApplicantDetailModal(true);
  };

  const renderTeamMembers = (project) => {
    // 모집 중, 모집 중단, 모집 완료 상태에서는 표시하지 않음
    if (!project.teamMembers || ['모집중', '모집중단', '모집완료'].includes(project.recruitmentStatus)) return null;

    return (
      <div className="saved-projects-management-section">
        <div className="saved-projects-section-header">
          <h4 className="saved-projects-section-title">팀원 구성</h4>
          {activeTab !== 'past' && project.recruitmentStatus === '진행중' && (
            <button 
              className="saved-projects-add-button"
              onClick={() => handleAddTeamMember(project)}
            >
              <MdAdd />
              <span>팀원 추가</span>
            </button>
          )}
        </div>
        <div className="saved-projects-team-list">
          {Object.entries(project.teamMembers).map(([role, members]) => (
            <div key={role} className="saved-projects-team-item">
              <div className="saved-projects-role-header">
                <span className="saved-projects-role-badge">{role}</span>
                <span className="saved-projects-member-count">{members.length}명</span>
              </div>
              <div className="saved-projects-members">
                {members.map((member, index) => (
                  <div key={index} className="saved-projects-member">
                    <div className="saved-projects-member-info">
                      <MdPerson />
                      <span className="saved-projects-member-name">{member.name}</span>
                      <span className="saved-projects-member-id">@{member.id}</span>
                    </div>
                    {activeTab !== 'past' && (
                      <button
                        className="saved-projects-member-delete"
                        onClick={() => handleDeleteMember(role, member)}
                      >
                        <MdClose />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleEditLink = (project, type) => {
    setSelectedProject(project);
    setLinkType(type);
    setLinkUrl(project.links?.[type] || '');
    setShowLinksModal(true);
  };

  const handleSaveLink = () => {
    if (!selectedProject || !linkType) return;

    const updatedProject = { ...selectedProject };
    if (!updatedProject.links) {
      updatedProject.links = {};
    }
    updatedProject.links[linkType] = linkUrl;

    setProjects(projects.map(p =>
      p.id === selectedProject.id ? updatedProject : p
    ));

    setShowLinksModal(false);
    setSelectedProject(null);
    setLinkType(null);
    setLinkUrl('');
  };

  const renderProjectManagement = (project) => {
    // 모집 중, 모집 중단, 모집 완료 상태에서는 표시하지 않음
    if (['모집중', '모집중단', '모집완료'].includes(project.recruitmentStatus)) return null;

    const tools = [
      { icon: <MdChat />, label: '팀 채팅', link: `/mypage/project/chat/${project.id}` },
      { icon: <MdCalendarToday />, label: '일정 관리', link: `/mypage/project/schedule/${project.id}` },
      { icon: <MdDescription />, label: '회의록', link: `/mypage/project/meetings/${project.id}` },
      { icon: <MdCode />, label: 'API 문서', link: `/mypage/project/api-docs/${project.id}` },
      { icon: <MdLibraryBooks />, label: '기술 문서', link: `/mypage/project/tech-docs/${project.id}` },
      { icon: <MdDashboard />, label: '칸반 보드', link: `/mypage/project/kanban/${project.id}` },
      { icon: <MdAccountTree />, label: '라우팅 정의서', link: `/project/${project.id}/route-docs` },
      { icon: <MdSchema />, label: 'ERD 설계', link: `/project/${project.id}/erd-docs` },
      { icon: <FaGithub />, label: 'GitHub', link: project.links?.github },
      { icon: <SiNotion />, label: 'Notion', link: project.links?.notion }
    ];

    return (
      <div className="saved-projects-management">
        <div className="saved-projects-management-tools">
          {tools.map((tool, index) => (
            <div key={index} className="saved-projects-link-group">
              {['GitHub', 'Notion'].includes(tool.label) ? (
                <button
                  className="saved-projects-management-tool"
                  onClick={() => handleEditLink(project, tool.label.toLowerCase())}
                >
                  {tool.icon}
                  <span>{tool.label}</span>
                  {tool.link && (
                    <button
                      className="saved-projects-external-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(tool.link, '_blank');
                      }}
                    >
                      <MdOpenInNew />
                    </button>
                  )}
                </button>
              ) : (
                <Link
                  to={tool.link}
                  className="saved-projects-management-tool"
                  target={['GitHub', 'Notion'].includes(tool.label) ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                >
                  {tool.icon}
                  <span>{tool.label}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTeamModal = () => {
    if (!showTeamModal || !selectedProject) return null;

    const filteredUsers = getFilteredUsers();
    const existingRoles = selectedProject.teamMembers ? Object.keys(selectedProject.teamMembers) : [];
    const defaultRoles = ['PM', '프론트엔드', '백엔드', '디자이너'];
    const availableRoles = [...new Set([...defaultRoles, ...existingRoles])];

    return (
      <div className="saved-projects-modal-overlay">
        <div className="saved-projects-modal">
          <h2>팀원 추가</h2>
          <div className="saved-projects-form-group">
            <label>역할</label>
            <div className="saved-projects-role-selector">
              <select 
                className="saved-projects-select"
                value={showCustomRole ? 'custom' : newRole}
                onChange={(e) => {
                  if (e.target.value === 'custom') {
                    setShowCustomRole(true);
                    setNewRole('');
                  } else {
                    setShowCustomRole(false);
                    setNewRole(e.target.value);
                  }
                }}
              >
                <option value="">역할 선택</option>
                {availableRoles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
                <option value="custom">직접 입력</option>
              </select>
              {showCustomRole && (
                <div className="saved-projects-custom-role">
                  <input
                    type="text"
                    className="saved-projects-input"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    placeholder="새로운 역할 입력"
                  />
                  <button
                    className="saved-projects-add-role-button"
                    onClick={handleAddRole}
                    disabled={!customRole.trim()}
                  >
                    추가
                  </button>
                </div>
              )}
              {!showCustomRole && newRole && (
                <button
                  className="saved-projects-add-role-button"
                  onClick={handleAddRole}
                >
                  추가
                </button>
              )}
            </div>
          </div>
          {(selectedRole || showCustomRole) && (
            <div className="saved-projects-form-group">
              <label>사용자 검색</label>
              <div className="saved-projects-search-container">
                <input 
                  type="text" 
                  className="saved-projects-input" 
                  placeholder="이메일 또는 이름으로 검색" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                />
                {showSearchResults && filteredUsers.length > 0 && (
                  <div className="saved-projects-search-results">
                    {filteredUsers.map(user => (
                      <button
                        key={user.email}
                        className="saved-projects-search-result-item"
                        onClick={() => handleSelectUser(user)}
                      >
                        <MdPerson className="saved-projects-search-result-icon" />
                        <div className="saved-projects-search-result-info">
                          <span className="saved-projects-search-result-name">{user.name}</span>
                          <span className="saved-projects-search-result-email">{user.email}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="saved-projects-modal-actions">
            <button 
              className="saved-projects-modal-cancel"
              onClick={() => {
                setShowTeamModal(false);
                setSearchQuery('');
                setShowSearchResults(false);
                setNewRole('');
                setCustomRole('');
                setShowCustomRole(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderApplicantsList = (project) => {
    // 모집 중이거나 모집 완료 상태일 때만 표시
    if (!project.positions || !['모집중', '모집완료'].includes(project.recruitmentStatus)) return null;

    // 모든 지원자 정보를 하나의 배열로 합치기
    const allApplicants = project.positions.flatMap(position => 
      Array.isArray(position.applicants) 
        ? position.applicants.map(applicant => ({
            ...applicant,
            position: position.name
          }))
        : Array(position.applicants).fill().map((_, i) => ({
            id: `dummy${i}`,
            name: `지원자 ${i + 1}`,
            position: position.name,
            applyDate: '2024-03-20'
          }))
    );

    return (
      <div className="saved-projects-applicants-section">
        <div className="saved-projects-section-header">
          <span className="saved-projects-label">지원자 목록</span>
        </div>
        <div className="saved-projects-applicants-list">
          {allApplicants.map((applicant, index) => (
            <div 
              key={index} 
              className="saved-projects-applicant-item"
              onClick={() => window.location.href = `/applicant/${applicant.id}`}
            >
              <div className="saved-projects-applicant-info">
                <span className="saved-projects-applicant-name">
                  {applicant.name}
                </span>
                <div className="saved-projects-applicant-date">
                  <span>{applicant.applyDate}</span>
                  <span className="saved-projects-date-label">지원</span>
                </div>
                <select
                  className="saved-projects-status-select"
                  value={applicant.status}
                  onChange={(e) => handleStatusChange(applicant.id, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {applicantStatusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
              <span className="saved-projects-tech-tag">{applicant.position}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const filteredProjects = getFilteredProjects();

  return (
    <div className="saved-projects-container">
      {filter === 'recruiting' && (
        <div className="saved-projects-tabs">
          <button
            className={`saved-projects-tab ${activeTab === 'ongoing' ? 'active' : ''}`}
            onClick={() => handleTabClick('ongoing')}
          >
            진행 중
          </button>
          <button
            className={`saved-projects-tab ${activeTab === 'recruiting' ? 'active' : ''}`}
            onClick={() => handleTabClick('recruiting')}
          >
            모집 중
          </button>
          <button
            className={`saved-projects-tab ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => handleTabClick('past')}
          >
            지난 프로젝트
          </button>
          <button
            className={`saved-projects-tab ${activeTab === 'applied' ? 'active' : ''}`}
            onClick={() => handleTabClick('applied')}
          >
            지원 중
          </button>
        </div>
      )}

      {activeTab === 'applied' ? (
        <AppliedProjects />
      ) : filteredProjects.length === 0 ? (
        <div className="saved-projects-empty">
          <p>
            {activeTab === 'ongoing' ? '진행 중인 프로젝트가 없습니다.' :
             activeTab === 'recruiting' ? '모집 중인 프로젝트가 없습니다.' :
             activeTab === 'past' ? '지난 프로젝트가 없습니다.' :
             '프로젝트가 없습니다.'}
          </p>
        </div>
      ) : (
        filteredProjects.map(project => (
          <div key={project.id} className="saved-projects-project-card">
            <div className="saved-projects-project-header">
              <h3 className="saved-projects-project-title">{project.title}</h3>
              {activeTab !== 'past' && (
                <div className="saved-projects-header-actions">
                  {filter === 'recruiting' ? (
                    <>
                      <span className="saved-projects-total-applicants">
                        <FaUsers /> 총 지원자 {project.totalApplicants}명
                      </span>
                      <button 
                        className="saved-projects-edit-button"
                        onClick={() => window.location.href = `/project/edit/${project.id}`}
                      >
                        <MdEdit />
                        <span>수정하기</span>
                      </button>
                      <button 
                        className="saved-projects-delete-button"
                        onClick={() => handleDeleteClick(project)}
                      >
                        <MdDelete />
                        <span>삭제하기</span>
                      </button>
                    </>
                  ) : (
                    <button 
                      className="saved-projects-unsave-button"
                      onClick={() => handleRemove(project.id)}
                    >
                      <MdBookmarkRemove />
                      <span>저장 취소</span>
                    </button>
                  )}
                </div>
              )}
            </div>
            <p className="saved-projects-project-subtitle">{project.description}</p>
            <div className="saved-projects-project-info">
              <div className="saved-projects-info-item">
                <span className="saved-projects-label">시작일</span>
                <span className="saved-projects-value">{project.startDate}</span>
              </div>
              <div className="saved-projects-info-item">
                <span className="saved-projects-label">{activeTab === 'past' ? '마감 기간' : '예상 기간'}</span>
                <span className="saved-projects-value">{activeTab === 'past' ? '2024-03-15' : project.duration}</span>
              </div>
            </div>
            <div className="saved-projects-info-item">
              <span className="saved-projects-label">기술 스택</span>
              <div className="saved-projects-tags-container">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="saved-projects-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {activeTab === 'recruiting' && renderApplicantsList(project)}
            {renderTeamMembers(project)}
            {renderProjectManagement(project)}
            <div className="saved-projects-project-footer">
              <span className="saved-projects-date">{project.startDate} 등록</span>
              {filter === 'recruiting' ? (
                <div className="saved-projects-status-dropdown">
                  <button 
                    className="saved-projects-status-button"
                    onClick={() => setOpenStatusDropdown(openStatusDropdown === project.id ? null : project.id)}
                  >
                    <span className={`saved-projects-status-badge ${project.recruitmentStatus}`}>
                      {project.recruitmentStatus}
                    </span>
                    <MdKeyboardArrowDown className={`dropdown-arrow ${openStatusDropdown === project.id ? 'open' : ''}`} />
                  </button>
                  {openStatusDropdown === project.id && (
                    <div className="saved-projects-status-dropdown-menu">
                      {statusOptions.map(option => (
                        <button
                          key={option.value}
                          className={`saved-projects-status-option ${project.recruitmentStatus === option.value ? 'active' : ''}`}
                          onClick={() => handleStatusChange(project.id, option.value)}
                          style={{
                            '--status-color': option.color,
                            '--status-bg-color': option.bgColor
                          }}
                        >
                          {option.value}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <span className="saved-projects-status">{project.status}</span>
              )}
            </div>
          </div>
        ))
      )}

      {showDeleteModal && (
        <div className="saved-projects-modal-overlay">
          <div className="saved-projects-modal">
            <h2>프로젝트 삭제</h2>
            <p>
              정말로 이 프로젝트를 삭제하시겠습니까?<br />
              삭제 후에는 되돌릴 수 없습니다.
            </p>
            <div className="saved-projects-modal-actions">
              <button className="saved-projects-modal-cancel" onClick={handleCloseModal}>
                취소
              </button>
              <button className="saved-projects-modal-confirm" onClick={handleConfirmDelete}>
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {showStatusModal && selectedProject && (
        <div className="saved-projects-modal-overlay">
          <div className="saved-projects-modal">
            <h2>모집 상태 변경</h2>
            <div className="saved-projects-status-options">
              <button 
                className={`saved-projects-status-option ${selectedProject.recruitmentStatus === '모집중' ? 'active' : ''}`}
                onClick={() => handleStatusChange(selectedProject.id, '모집중')}
              >
                모집중
              </button>
              <button 
                className={`saved-projects-status-option ${selectedProject.recruitmentStatus === '모집완료' ? 'active' : ''}`}
                onClick={() => handleStatusChange(selectedProject.id, '모집완료')}
              >
                모집완료
              </button>
              <button 
                className={`saved-projects-status-option ${selectedProject.recruitmentStatus === '모집중단' ? 'active' : ''}`}
                onClick={() => handleStatusChange(selectedProject.id, '모집중단')}
              >
                모집중단
              </button>
            </div>
            <div className="saved-projects-modal-actions">
              <button className="saved-projects-modal-cancel" onClick={handleCloseModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}

      {showApplicantsModal && selectedPosition && (
        <div className="saved-projects-modal-overlay">
          <div className="saved-projects-modal saved-projects-modal-large">
            <div className="saved-projects-modal-header">
              <h2>{selectedPosition.name} 지원자 목록</h2>
              <button className="saved-projects-modal-close" onClick={handleCloseModal}>
                <MdClose />
              </button>
            </div>
            <div className="saved-projects-applicants-list">
              {selectedPosition.applicants?.length > 0 ? (
                <table className="saved-projects-applicants-table">
                  <thead>
                    <tr>
                      <th>이름</th>
                      <th>이메일</th>
                      <th>지원일</th>
                      <th>상태</th>
                      <th>관리</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedPosition.applicants.map((applicant) => (
                      <tr key={applicant.id}>
                        <td>{applicant.name}</td>
                        <td>{applicant.email}</td>
                        <td>{applicant.applyDate}</td>
                        <td>
                          <select
                            value={applicant.status}
                            onChange={(e) => handleApplicantStatusChange(
                              selectedProject.id,
                              selectedPosition.name,
                              applicant.id,
                              e.target.value
                            )}
                            className={`saved-projects-status-select ${applicant.status.toLowerCase().replace(' ', '-')}`}
                          >
                            {applicantStatusOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.value}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <button
                            className="saved-projects-view-detail-button"
                            onClick={() => handleViewApplicantDetail(applicant)}
                          >
                            상세보기
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="saved-projects-no-applicants">아직 지원자가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {showDeleteMemberModal && memberToDelete && (
        <div className="saved-projects-modal-overlay">
          <div className="saved-projects-modal">
            <h2>팀원 삭제</h2>
            <p>정말로 {memberToDelete.name}님을 {roleToDeleteFrom} 역할에서 삭제하시겠습니까? 삭제 후에는 되돌릴 수 없습니다.</p>
            <div className="saved-projects-modal-actions">
              <button 
                className="saved-projects-modal-cancel"
                onClick={() => {
                  setShowDeleteMemberModal(false);
                  setMemberToDelete(null);
                  setRoleToDeleteFrom(null);
                }}
              >
                취소
              </button>
              <button 
                className="saved-projects-modal-confirm"
                onClick={handleConfirmDeleteMember}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {showLinksModal && selectedProject && (
        <div className="saved-projects-modal-overlay">
          <div className="saved-projects-modal">
            <h2>
              {linkType === 'github' ? 'GitHub' : 
               linkType === 'notion' ? 'Notion' : 
               '와이어프레임'} 링크 관리
            </h2>
            <div className="saved-projects-form-group">
              <label>링크 URL</label>
              <input
                type="text"
                className="saved-projects-input"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder={`${
                  linkType === 'github' ? 'GitHub' : 
                  linkType === 'notion' ? 'Notion' : 
                  '와이어프레임'} 링크를 입력하세요`}
              />
            </div>
            <div className="saved-projects-modal-actions">
              <button 
                className="saved-projects-modal-cancel"
                onClick={() => {
                  setShowLinksModal(false);
                  setSelectedProject(null);
                  setLinkType(null);
                  setLinkUrl('');
                }}
              >
                취소
              </button>
              <button 
                className="saved-projects-modal-confirm"
                onClick={handleSaveLink}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}

      {showApplicantDetailModal && selectedApplicant && (
        <div className="saved-projects-modal-overlay">
          <div className="saved-projects-modal saved-projects-modal-large">
            <div className="saved-projects-modal-header">
              <h2>지원자 상세 정보</h2>
              <button 
                className="saved-projects-modal-close"
                onClick={() => {
                  setShowApplicantDetailModal(false);
                  setSelectedApplicant(null);
                }}
              >
                <MdClose />
              </button>
            </div>
            <div className="saved-projects-applicant-detail">
              <div className="saved-projects-applicant-info">
                <h3>{selectedApplicant.name}</h3>
                <p><strong>이메일:</strong> {selectedApplicant.email}</p>
                <p><strong>지원일:</strong> {selectedApplicant.applyDate}</p>
                <p><strong>현재 상태:</strong> {selectedApplicant.status}</p>
              </div>
              <div className="saved-projects-applicant-docs">
                <h4>자기소개서</h4>
                <div className="saved-projects-cover-letter">
                  {selectedApplicant.coverLetter}
                </div>
                <div className="saved-projects-resume-link">
                  <a 
                    href={selectedApplicant.resumeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="saved-projects-download-button"
                  >
                    <MdDescription /> 이력서 다운로드
                  </a>
                </div>
              </div>
              <div className="saved-projects-status-actions">
                <h4>지원 상태 변경</h4>
                <div className="saved-projects-status-buttons">
                  {applicantStatusOptions.map(option => (
                    <button
                      key={option.value}
                      className={`saved-projects-status-button ${
                        selectedApplicant.status === option.value ? 'active' : ''
                      }`}
                      onClick={() => handleApplicantStatusChange(
                        selectedProject.id,
                        selectedPosition.name,
                        selectedApplicant.id,
                        option.value
                      )}
                      style={{ '--status-color': option.color }}
                    >
                      {option.value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {renderTeamModal()}
    </div>
  );
};

export default SavedProjects; 