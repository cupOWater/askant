import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "../assets/styles/PostDetail.css";

function PostDetail() {
  const location = useLocation();
  const { post } = location.state; 

  const dummyData = [ // delete dummy data later
      {
        author: 'tony1234',
        comment: 'nice!'
      },
      {
        author: 'khoi3344',
        comment: 'good'
      },
      {
        author: 'david4231',
        comment: 'great!'
      },
    ]

  const [commets, setCommets] = useState(dummyData);

  const fetchComments = async () => {
    // bring comments data from db
    // setcomments(real data);
  };

  return (
    <div className="detail-page">
      <div className="post-detail-title">
        <h2>[{post.category}]  {post.title}</h2>
        <div className="post-detail-author">
          <p className="author"><i>{post.author}</i></p>
          <p className="num-of-comments">{post.comments} comments</p>
        </div>
      </div>
      <div className="post-detail-content">
        <div className="post-detail-info">
          {/* You can add more post details here */}
        </div>
        <div className="post-detail-body">
          {/* Add the main content/body of the post here */}
          {/* For instance, the post content or additional details */}
        </div>
      </div>
  </div>
  );
}

export default PostDetail;