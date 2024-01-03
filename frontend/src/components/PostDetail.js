import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.bubble.css';
import Unauthorized from "../components/Unauthorized";
import "../assets/styles/PostDetail.css";
import ReactQuill from 'react-quill';

function PostDetail({ user }) {
  const location = useLocation();
  const { post } = location.state;

  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');

  const sortComments = (commentsArray) => {
    return [...commentsArray].sort((a, b) => new Date(a.timestamps) - new Date(b.timestamps));
  };

  const handleComment = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (user === undefined) {
      alert('Log in required.');
      return;
    } else {
      if (newComment.trim() !== '') {
        const newCommentVal = {
          userName: user.userName,
          content: newComment,
          timestamps: new Date().toISOString(),
        };

        const updatedComments = sortComments([...comments, newCommentVal]);
        setComments(updatedComments);
        setNewComment('');
      } else {
        alert('Write any comments.');
        return;
      }
    }
  };

  if (((user !== undefined && user.isVerified !== 'true') || user === undefined) && post.category === 'Trade') {
    return <Unauthorized />
  }

  return (
    <div className="detail-page">
      <div className="post-detail-title">
        <h2>[{post.category}]  {post.title}</h2>
        <div className="post-detail-author">
          <p className="author"><i>{post.userName}</i></p>
          <p className="num-comments">{comments.length} comments</p>
        </div>
      </div>
      <div className="post-detail-content">
        <div className="post-detail-text">
          <ReactQuill
            value={post.content}
            readOnly={true}
            theme={"bubble"}
          />
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
              <p className={`comment-userid ${comment.user.userName === 'admin' ? 'admin-style' : ''}`}>
                {comment.user.userName}
              </p>
              <p className='comment-timestamp'>{new Date(comment.createdAt).toLocaleString()}</p>
              <p className='comment-content'>{comment.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostDetail;