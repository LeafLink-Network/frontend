import React, { useState } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';
import { IoMdHeartDislike } from 'react-icons/io';
import './LikedPosts.css';

const LikedPosts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '주니어 개발자의 성장 이야기',
      content: '1년차 개발자로서의 경험과 배운 점을 공유합니다.',
      author: '김개발',
      date: '2024-03-15',
      likes: 128,
      comments: 45,
      tags: ['개발', '성장', '주니어']
    },
    {
      id: 2,
      title: 'Spring Boot 실전 프로젝트 후기',
      content: 'Spring Boot로 실제 서비스를 개발하면서 겪은 경험을 공유합니다.',
      author: '이스프링',
      date: '2024-03-14',
      likes: 256,
      comments: 89,
      tags: ['Spring Boot', '백엔드', '프로젝트']
    },
    {
      id: 3,
      title: 'React와 TypeScript 시작하기',
      content: 'React 프로젝트에 TypeScript를 도입한 경험을 공유합니다.',
      author: '박리액트',
      date: '2024-03-13',
      likes: 189,
      comments: 67,
      tags: ['React', 'TypeScript', '프론트엔드']
    }
  ]);

  // 좋아요 취소 처리
  const handleUnlike = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="liked-posts-empty">
        <p>좋아요한 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="liked-posts-container">
      {posts.map(post => (
        <div key={post.id} className="liked-posts-post-card">
          <div className="liked-posts-post-header">
            <h3 className="liked-posts-post-title">{post.title}</h3>
            <button 
              className="liked-posts-unlike-button"
              onClick={() => handleUnlike(post.id)}
            >
              <IoMdHeartDislike />
              <span>좋아요 취소</span>
            </button>
          </div>
          
          <p className="liked-posts-post-content">{post.content}</p>
          
          <div className="liked-posts-post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="liked-posts-tag">#{tag}</span>
            ))}
          </div>
          
          <div className="liked-posts-post-footer">
            <div className="liked-posts-post-info">
              <span className="liked-posts-author">{post.author}</span>
              <span className="liked-posts-date">{post.date}</span>
            </div>
            
            <div className="liked-posts-post-stats">
              <div className="liked-posts-stat">
                <FaHeart className="liked-posts-icon heart" />
                <span>{post.likes}</span>
              </div>
              <div className="liked-posts-stat">
                <FaComment className="liked-posts-icon comment" />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LikedPosts; 