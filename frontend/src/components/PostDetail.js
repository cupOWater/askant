import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import forbidden from "../assets/images/forbidden.jpg"
import "../assets/styles/PostDetail.css";

function PostDetail({ user }) {
  const location = useLocation();
  const { post } = location.state; 

  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');

  const handleComment = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const newCommentVal = {
        user_id: 'admin', // dummy data; must change to current user id
        content: newComment,
        timestamp: new Date().toISOString(),
      };

      setComments([...comments, newCommentVal]);
      setNewComment('');

      //window.location.reload(); // refresh(required?)
    }
  };

  return (
    <div className="detail-page">
      <div className="post-detail-title">
        <h2>[{post.category}]  {post.title}</h2>
        <div className="post-detail-author">
          <p className="author"><i>{post.user_id}</i></p>
          <p className="num-comments">{comments.length} comments</p>
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
        <h3 className='comments-number'>Comments {comments.length}</h3>
        <div className='comment-container'>
          <input className='comment-input'
            type='text'
            value={newComment}
            onChange={handleComment}
            placeholder='Write your comment...'
          />
          <button className="btn btn-warning btn-rounded comment-submit" onClick={handleAddComment}>Submit</button>
        </div>
        <ul className="display-comment">
          {comments.map((comment, index) => (
            <li key={index}>
                    <p className={`comment-userid ${comment.user_id === 'admin' ? 'admin-style' : ''}`}>
                      {comment.user_id}
                    </p>
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