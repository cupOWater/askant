import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/ForumHome.css";
import ArrowClockwise from "../assets/images/arrow-clockwise.svg";
import Check from "../assets/images/check-lg.svg";
import { postService } from "../service/postService";
import { userService } from "../service/userService";

function ForumHome({ user }) {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [doVerify, setDoVerify] = useState(false);
  const [pendingUsers, setPendingUsers] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await postService.getAllPosts();
      const sortedPosts = res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setPosts(sortedPosts);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const res = await userService.getPendingUsers();
      setPendingUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => { // must load the posts from server & refresh when the sorting way is changed
    if (user !== undefined && user.type === 'admin') {
      fetchPendingUsers();
    }
    const sortedPosts = sortPosts();
    setPosts(sortedPosts);
  }, [sortBy, user]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (option) => {
    setSortBy(option);
  };

  const handleCategorySelect = (category) => {
    if (category === 'All') {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }

    if (category === 'Verification') {
      setDoVerify(true);
    } else {
      setDoVerify(false);
    }
  };

  const handleRefresh = () => {
    fetchPosts();
  };

  const handleDeletePost = async (postId) => {
    try {
      await postService.deletePost(postId);
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePending = async () => {
    try {
      const res = await userService.requestPending();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (userId) => {
    try {
      const response = await userService.verifyUser(userId);
      
      const updatedUsers = pendingUsers.filter(user => user._id !== userId);
      setPendingUsers(updatedUsers);
    } catch (error) {
      console.error('Error accepting user:', error);
    }
  }

  const handleDecline = async (userId) => {
    try {
      const response = await userService.refuseUser(userId);

      const updatedUsers = pendingUsers.filter(user => user._id !== userId);
      setPendingUsers(updatedUsers);
    } catch (error) {
      console.error('Error declining user:', error);
    }
  }

  const sortPosts = () => { // sorting method
    if (sortBy === 'latest') {
      return posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'comments') {
      return posts.slice().sort((a, b) => b.comments.length - a.comments.length);
    }
    return posts;
  };

  const postsPerPage = 10;
  const idxOfLastPost = currentPage * postsPerPage;
  const idxOfFirstPost = idxOfLastPost - postsPerPage;

  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.category === selectedCategory)
    : posts;
  const currentPosts = filteredPosts.slice(idxOfFirstPost, idxOfLastPost);

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const buttonsOnPage = 10;
    const buttons = [];
    let startPageIdx, endPageIdx;
  
    if (totalPages <= buttonsOnPage) {
      startPageIdx = 1;
      endPageIdx = totalPages;
    } else {
      if (currentPage <= Math.floor(buttonsOnPage / 2)) {
        startPageIdx = 1;
        endPageIdx = buttonsOnPage;
      } else if (currentPage + Math.floor(buttonsOnPage / 2) >= totalPages) {
        startPageIdx = totalPages - buttonsOnPage + 1;
        endPageIdx = totalPages;
      } else {
        startPageIdx = currentPage - Math.floor(buttonsOnPage / 2);
        endPageIdx = currentPage + Math.floor(buttonsOnPage / 2);
      }
    }
  
    for (let i = startPageIdx; i <= endPageIdx; i++) {
      buttons.push(
        <button
          className={`page-num btn btn-warning btn-rounded ${i === currentPage ? 'active' : ''}`}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

    return (
        <div className="forum-page">
            <div className="sidebar">
            <Link to="/post"><button className="btn btn-warning btn-rounded post-button">Post</button></Link>
                <div className="category-sel">
                    <p className="all-dis" onClick={() => handleCategorySelect('All')}><strong>All discussion</strong></p>
                    <ul className="cate-list">
                        <li onClick={() => handleCategorySelect('Announcement')}>Announcement</li>
                        <li onClick={() => handleCategorySelect('General')}>General</li>
                        <li onClick={() => handleCategorySelect('Q&A')}>Q&A</li>
                        <li onClick={() => handleCategorySelect('Trade')}>Trade</li>
                    </ul>
                    {user !== undefined && user.type === 'admin' && (
                    <p className="veri" onClick={() => handleCategorySelect('Verification')}><img className="Check" src={Check} /><strong>Verification</strong></p>
                    )}
                </div>
            </div>
            <div className="right-side">
            {user !== undefined && user.isVerified === "false" && (selectedCategory === null || selectedCategory === 'Trade') && (
              <div className="not-verified">
                <p>You are not verified.</p>
                <p>You have to get verification from admin to access trading posts.</p>
                <button className="pending-button btn btn-success" onClick={handlePending}>Request verification</button>
              </div>
            )}
            {user !== undefined && user.isVerified === "pending" && (selectedCategory === null || selectedCategory === 'Trade') && (
            <div className="check-pending">
              <p>Verification request is pending.</p>
              <p>Please wait for admin approval.</p>
            </div>
             )}
            {doVerify ? (
              <div className="pending-container">
              <h2 className='pending-list-text'>Pending list</h2>
                <div className="pending-list">
                  {pendingUsers.map((user) => (
                    <li key={user._id}>
                      <p>{user.userName} ({user.email})</p>
                      <div className="pending-buttons-conatiner">
                        <button className='btn btn-success' onClick={() => handleAccept(user._id)}>Accept</button>
                        <button className='btn btn-danger' onClick={() => handleDecline(user._id)}>Decline</button>
                      </div>
                    </li>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="top-menu">
                  <div className="dropdown-menu">
                    <select className="btn btn-secondary dropdown-toggle" value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
                      <option value="latest">Latest</option>
                      <option value="comments">Comments</option>
                    </select>
                  </div>
                  <button className="refresh-button btn btn-primary" onClick={handleRefresh}>
                    <img className="ArrowClockwise" src={ArrowClockwise} />
                  </button>
                </div>
                <div className="display-posts">
                    {currentPosts.map((post) => (
                        <div key={post._id} className="posts-container">
                            <div className="post-content">
                              <div className="title-comments">
                                <Link to={`/${post._id}`} state={{post}} className="post-title-link">
                                  <h3 className="post-title">{post.title}</h3>
                                </Link>
                                <p className='post-comments text-decoration-underline'>[{post.comments.length}]</p>
                              </div>
                              <p className="post-author">
                                Written by {' '}
                                <i className={post.userName === 'admin' ? 'admin-style' : ''}>
                                  {post.user.userName}
                                </i>
                              </p>
                            </div>
                            <div className="post-details">
                              <div className="delete-button-container">
                                <p className='category-detail'>{post.category}</p>
                                {user !== undefined && user.type === 'admin' && (
                                  <button className="btn btn-danger btn-rounded delete-button" onClick={() => handleDeletePost(post._id)}>Delete</button>
                                )}
                              </div>
                              <p className='timestamp-detail'>{new Date(post.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                    <div className="pagination-container">
                        {renderPaginationButtons()}
                    </div>
                </div>
              </>
            )}
            </div>
        </div>
    )
}

export default ForumHome;