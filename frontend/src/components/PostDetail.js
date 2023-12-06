import React from 'react';
import { useLocation } from 'react-router-dom';

function PostDetail() {
  const location = useLocation();
  const { post } = location.state; 

  return (
    <div>
      {post.title}
    </div>
  );
}

export default PostDetail;