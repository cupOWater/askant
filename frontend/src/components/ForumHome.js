import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/ForumHome.css";
import ArrowClockwise from "../assets/images/arrow-clockwise.svg"

function ForumHome({ user }) {
  const comments = [  // delete dummy data later
    {
      user_id: "david4231", 
      content: "I agree with it", 
      timestamp: "2023-11-20T03:55:39.106+00:00"}, 
    {
      user_id: "khoi4231", 
      content: "nice opinion!", 
      timestamp: "2023-11-20T04:50:13.106+00:00"
    },     {
      user_id: "asdf1234", 
      content: "I agree with it", 
      timestamp: "2023-11-20T07:20:12.106+00:00"},
      {
        user_id: "test3466", 
        content: "I agree with it", 
        timestamp: "2023-11-20T04:33:39.106+00:00"}, 
        {
          user_id: "admin", 
          content: "I agree with it", 
          timestamp: "2023-11-20T05:11:11.106+00:00"}, 
  ];

  const dummyData = [ // delete dummy data later
      {
        id: 1,
        title: 'save ants',
        user_id: 'admin',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Announcement',
        comments: comments
      },
      {
        id: 2,
        title: 'how to feed ants',
        user_id: 'david4231',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Discussion',
        comments: comments,
      },
      {
        id: 3,
        title: 'any recommend tools for ant?',
        user_id: 'khoi3344',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Q&A',
        comments: comments,
      },      {
        id: 4,
        title: 'some advices to beginner',
        user_id: 'long6412',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Free',
        comments: comments,
      },      {
        id: 5,
        title: 'COME AND SEE MY ANTS',
        user_id: 'long6412',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Free',
        comments: comments,
      },      {
        id: 6,
        title: 'I lost my ants...',
        user_id: 'khoi3344',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Free',
        comments: comments,
      },      {
        id: 7,
        title: ":)))",
        user_id: 'admin',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Announcement',
        comments: comments,
      },      {
        id: 8,
        title: 'recommend some music',
        user_id: 'david4231',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:52:38.106+00:00',
        category: 'Trade',
        comments: comments,
      },      {
        id: 9,
        title: 'my ants are dead.',
        user_id: 'tony1234',
        content: 'ants are unique!',
        timestamp: '2023-11-20T01:51:38.106+00:00',
        category: 'Trade',
        comments: comments,
      },      {
        id: 10,
        title: 'books for ants',
        user_id: 'khoi3344',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Q&A',
        comments: comments,
      },
      {
        id: 11,
        title: "DON'T DO THIS BEHAIVOR",
        user_id: 'david4231',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Discussion',
        comments: comments,
      },
      {
        id: 12,
        title: "hi im newbieeee :D",
        user_id: 'long6412',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Q&A',
        comments: comments,
      },
      {
        id: 13,
        title: 'rules to feed ants',
        user_id: 'long6412',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Free',
        comments: comments,
      },
      {
        id: 14,
        title: 'hello',
        user_id: 'tony1234',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Discussion',
        comments: comments,
      },
      {
        id: 15,
        title: 'any tv show recommendation?',
        user_id: 'david4231',
        content: 'ants are unique!',
        timestamp: '2023-11-20T03:54:38.106+00:00',
        category: 'Free',
        comments: comments,
      },
    ];

  const [posts, setPosts] = useState(dummyData); // change [](blank list) to later
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchPosts = async () => {
    // bring post data from db
    // setPosts(real data);
  };

  useEffect(() => { // must load the posts from server & refresh when the sorting way is changed
    fetchPosts();
    const sortedPosts = sortPosts();
    setPosts(sortedPosts);
  }, [sortBy]);

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
  };

  const handleRefresh = () => {
    fetchPosts();
  };

  const sortPosts = () => { // sorting method
    if (sortBy === 'latest') {
      return posts.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
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
                        <li onClick={() => handleCategorySelect('Q&A')}>Q&A</li>
                        <li onClick={() => handleCategorySelect('Free')}>Free</li>
                        <li onClick={() => handleCategorySelect('Trade')}>Trade</li>
                    </ul>
                </div>
            </div>
            <div className="right-side">
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
                    <div key={post.id} className="posts-container">
                        <div className="post-content">
                          <div className="title-comments">
                            <Link to={'/${post.id}'} state={{post}} className="post-title-link">
                              <h3 className="post-title">{post.title}</h3>
                            </Link>
                            <p className='post-comments text-decoration-underline'>[{post.comments.length}]</p>
                          </div>
                          <p className="post-author">
                            Written by {' '}
                            <i className={post.user_id === 'admin' ? 'admin-style' : ''}>
                              {post.user_id}
                            </i>
                          </p>
                        </div>
                        <div className="post-details">
                            <p className='category-detail'>{post.category}</p>
                            <p className='timestamp-detail'>{new Date(post.timestamp).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
                <div className="pagination-container">
                    {renderPaginationButtons()}
                </div>
            </div>
            </div>
        </div>
    )
}

export default ForumHome;