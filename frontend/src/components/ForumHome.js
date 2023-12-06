import React, { useState, useEffect } from 'react';
import "../assets/styles/ForumHome.css";

function ForumHome() {
    const dummyData = [
        {
          id: 1,
          title: '첫 번째 포스트',
          author: 'User1',
          profilePicture: 'profile1.jpg',
          category: 'Tech',
          comments: 8,
        },
        {
          id: 2,
          title: '리액트의 마법',
          author: 'User2',
          profilePicture: 'profile2.jpg',
          category: 'Programming',
          comments: 12,
        },
        // ... 중간에 더미 데이터 추가
        {
          id: 15,
          title: '마지막 포스트',
          author: 'User3',
          profilePicture: 'profile3.jpg',
          category: 'Design',
          comments: 5,
        },
      ];

    const [posts, setPosts] = useState(dummyData); // 포스트 데이터를 담을 상태 -> 나중에 []로 고치기
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 담을 상태

  // API를 통해 포스트 데이터를 가져오는 함수 (예시)
  const fetchPosts = async () => {
    // API 호출 및 데이터 가져오기
    // 예를 들어, fetch나 axios 등의 라이브러리를 사용하여 데이터를 가져올 수 있습니다.
    // 가져온 데이터는 setPosts로 상태를 업데이트합니다.
    // 예시: const data = await fetch('API_ENDPOINT');
    // setPosts(data);
  };

  useEffect(() => {
    fetchPosts(); // 컴포넌트가 마운트되면 포스트 데이터를 가져옵니다.
  }, []); // 빈 배열을 넣어 최초 한 번만 호출되도록 합니다.

  // 페이지 변경 시 실행되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // 해당 페이지의 데이터를 가져오는 로직을 추가할 수 있습니다.
  };

  // 현재 페이지에 해당하는 포스트 목록을 계산하는 로직
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="forum-page">
            <div className="sidebar">
                <button className="btn btn-warning btn-rounded post-button">Post</button>
                <div className="category-sev">
                    <p className="all-dis">All discussion</p>
                    <ul class="sev-list">
                        <li>First</li>
                        <li>Second</li>
                        <li>Third</li>
                        <li>Fourth</li>
                    </ul>
                </div>
            </div>

            <div className="display-posts">
                {currentPosts.map((post) => (
                    <div key={post.id} className="post-item">
                        <div className="profile-picture">
                            {/* 유저 프로필 사진 */}
                            <img src={post.profilePicture} alt="Profile" />
                        </div>
                        <div className="post-content">
                            {/* 글 제목 */}
                            <h2>{post.title}</h2>
                            {/* 작성자 정보 */}
                            <p>Written by {post.author}</p>
                        </div>
                        <div className="post-details">
                            {/* 카테고리와 댓글 수 */}
                            <p>{post.category}</p>
                            <p>{post.comments}</p>
                        </div>
                    </div>
                ))}
            
                {/* Pagination */}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
                        <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ForumHome;