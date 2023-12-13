import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import forbidden from "../assets/images/forbidden.jpg"
import "../assets/styles/PostDetail.css";

function PostDetail() {
  const location = useLocation();
  const { post } = location.state; 

  return (
    <div className="detail-page">
      <div className="post-detail-title">
        <h2>[{post.category}]  {post.title}</h2>
        <div className="post-detail-author">
          <p className="author"><i>{post.user_id}</i></p>
          <p className="num-comments">{post.comments.length} comments</p>
        </div>
      </div>
      <div className="post-detail-content">
        <div className="post-detail-pic">
          <img src={forbidden} className="post-image" />
        </div>
        <div className="post-detail-text">
          <p>{post.content}</p>
        </div>
      </div>
      <div className="comments-section">
        <h3 className='comments-number'>Comments {post.comments.length}</h3>
        <ul className="display-comment">
          {post.comments.map((comment, index) => (
            <li key={index}>
              <p className='comment-userid'>{comment.user_id}</p>
              <p className='comment-timestamp'>{new Date(comment.timestamp).toLocaleString()}</p>
              <p className='comment-content'>{comment.content}</p>
            </li>
          ))}
        </ul>
      </div>
  </div>
  );
}

export default PostDetail;