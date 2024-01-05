import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'react-quill/dist/quill.bubble.css';
import Unauthorized from "../components/Unauthorized";
import "../assets/styles/PostDetail.css";
import ReactQuill from 'react-quill';
import { postService } from '../service/postService';

function PostDetail({ user }) {
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    postService.getPost(postId).then(res => {
      if(res.status === 200){
        const data = res.data;
        setPost(data);
        setComments(sortComments(data.comments));
        setIsLoading(false);
      }
    })
  }, [])

  const sortComments = (commentsArray) => {
    return [...commentsArray].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const handleComment = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (user === undefined) {
      alert('Log in required.');
      return;
    } else {
      if (newComment.trim() !== '') {
        const res = await postService.createComment(post._id, newComment);
        console.log(res);
        if (res.status === 201) {
          const updatedComments = sortComments(res.data);
          setComments(updatedComments);
          setNewComment('');
        }
      } else {
        alert('Write any comments.');
        return;
      }
    }
  };

  if(isLoading){
    return <></>
  }
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