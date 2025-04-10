import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RiArrowGoBackLine } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // 실제 구현시에는 API로부터 데이터를 받아와야 합니다
  const [project, setProject] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    // 실제 구현시에는 API 호출로 대체됩니다
    setProject({
      id: parseInt(id),
      title: '첫 이직 준비 중입니다. 조언 부탁드려요.',
      author: {
        name: '홍길동',
        createdAt: '1시간 전',
        viewCount: 123
      },
      description: '현재 스타트업에서 2년차 개발자로 일하고 있습니다. 최근 이직을 고민하고 있는데, 어떤 준비를 해야 할지 막막합니다. 저와 비슷한 경험이 있으신 분들의 조언을 듣고 싶습니다.',
      images: [
        '/sample-project-image1.jpg',
        '/sample-project-image2.jpg'
      ],
      positions: [
        {
          title: '프론트엔드 개발자 (2명)',
          skills: ['React', 'TypeScript'],
          requirements: ['상태관리 라이브러리 사용 경험', '반응형 웹 개발 경험']
        },
        {
          title: '백엔드 개발자 (2명)',
          skills: ['Node.js', 'Express'],
          requirements: ['MongoDB 사용 경험', 'RESTful API 설계 경험']
        },
        {
          title: 'UI/UX 디자이너 (1명)',
          skills: ['웹/앱 디자인 경험', 'Figma'],
          requirements: ['프로토타입 제작 경험']
        }
      ],
      process: {
        location: '온/오프라인 병행',
        duration: '주 1회 오프라인 미팅 (서울 강남)',
        recruitmentDeadline: '2025-04-31',
        projectDuration: '1개월'
      },
      contact: 'project@email.com'
    });
    setComments([
      {
        id: 1,
        author: '김철수',
        content: '저도 비슷한 경험이 있습니다. 이직 준비하실 때 포트폴리오를 잘 준비하시는 게 좋을 것 같아요.',
        createdAt: '2시간 전',
        likes: 5,
        isLiked: false,
        replies: [
          {
            id: 2,
            author: '이영희',
            content: '맞아요. 특히 실무 프로젝트 위주로 준비하시면 좋을 것 같아요.',
            createdAt: '1시간 전',
            likes: 2,
            isLiked: false,
          }
        ]
      }
    ]);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setComments([
      ...comments,
      {
        id: Date.now(),
        author: '사용자',
        content: comment,
        createdAt: '방금 전'
      }
    ]);
    setComment('');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleApply = () => {
    navigate(`/projects/${id}/apply`);
  };

  const handleCommentLike = (commentId, isReply = false, parentId = null) => {
    setComments(comments.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies.map(reply => 
            reply.id === commentId
              ? { ...reply, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1, isLiked: !reply.isLiked }
              : reply
          )
        };
      }
      if (!isReply && comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  const handleReplySubmit = (e, parentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            {
              id: Date.now(),
              author: '사용자',
              content: replyText,
              createdAt: '방금 전',
              likes: 0,
              isLiked: false
            }
          ]
        };
      }
      return comment;
    }));
    setReplyText('');
    setReplyingTo(null);
  };

  if (!project) {
    return <div className="loading">로딩 중...</div>;
  }

  return (
    <div className="project-detail-container">
      <button className="back-button" onClick={handleBack}>
        <RiArrowGoBackLine />
      </button>

      <div className="project-detail-header">
        <h1 className="project-title">{project.title}</h1>
        <div className="project-meta">
          <span className="author">{project.author.name}</span>
          <span className="separator">•</span>
          <span className="created-at">{project.author.createdAt}</span>
          <span className="separator">•</span>
          <span className="view-count">조회수 {project.author.viewCount}</span>
          <div className="action-buttons">
            <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
              {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <button className="share-button">공유하기</button>
            <button className="save-button">저장</button>
          </div>
        </div>
      </div>

      <div className="project-content">
        <section className="description-section">
          <h2>상세 설명</h2>
          <p>{project.description}</p>
        </section>

        {project.images && project.images.length > 0 && (
          <section className="project-images-section">
            <h2>프로젝트 이미지</h2>
            <div className="project-images-grid">
              {project.images.map((image, index) => (
                <div key={index} className="project-image-container">
                  <img 
                    src={image} 
                    alt={`프로젝트 이미지 ${index + 1}`} 
                    className="project-image"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="process-section">
          <h2>진행 정보</h2>
          <div className="process-info">
            <div className="info-item">
              <label>진행 방식</label>
              <p>{project.process.location}</p>
            </div>
            <div className="info-item">
              <label>미팅 일정</label>
              <p>{project.process.duration}</p>
            </div>
            <div className="info-item">
              <label>모집 마감일</label>
              <p>{project.process.recruitmentDeadline}</p>
            </div>
            <div className="info-item">
              <label>프로젝트 예상 기간</label>
              <p>{project.process.projectDuration}</p>
            </div>
          </div>
        </section>

        <section className="positions-section">
          <h2>모집 분야 및 자격요건</h2>
          <div className="positions-list">
            {project.positions.map((position, index) => (
              <div key={index} className="position-card">
                <h3>{position.title}</h3>
                <div className="skills">
                  {position.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <div className="requirements">
                  <h4>자격 요건</h4>
                  <ul>
                    {position.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section">
          <h2>연락처</h2>
          <p>{project.contact}</p>
        </section>

        <div className="project-actions">
          <button className="apply-button" onClick={handleApply}>
            지원하기
          </button>
        </div>
      </div>

      <div className="project-footer">
        <div className="interaction-buttons">
          <button className="comment-button">
            💬 댓글 {comments.length}
          </button>
        </div>

        <div className="comments-section">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="comment-input"
            />
            <button type="submit" className="comment-submit">등록</button>
          </form>

          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment-item">
                <div className="comment-header">
                  <span className="comment-author">{comment.author}</span>
                  <span className="comment-date">{comment.createdAt}</span>
                </div>
                <p className="comment-content">{comment.content}</p>
                <div className="comment-actions">
                  <button 
                    className={`comment-like-button ${comment.isLiked ? 'liked' : ''}`}
                    onClick={() => handleCommentLike(comment.id)}
                  >
                    {comment.isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                    <span>{comment.likes}</span>
                  </button>
                  <button 
                    className="reply-button"
                    onClick={() => setReplyingTo(comment.id)}
                  >
                    답글
                  </button>
                </div>

                {replyingTo === comment.id && (
                  <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="reply-form">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="답글을 입력하세요..."
                      className="reply-input"
                    />
                    <button type="submit" className="reply-submit">등록</button>
                  </form>
                )}

                {comment.replies && comment.replies.length > 0 && (
                  <div className="replies-list">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="reply-item">
                        <div className="comment-header">
                          <span className="comment-author">{reply.author}</span>
                          <span className="comment-date">{reply.createdAt}</span>
                        </div>
                        <p className="comment-content">{reply.content}</p>
                        <div className="comment-actions">
                          <button 
                            className={`comment-like-button ${reply.isLiked ? 'liked' : ''}`}
                            onClick={() => handleCommentLike(reply.id, true, comment.id)}
                          >
                            {reply.isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
                            <span>{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 