import React, { useState, useEffect, useCallback } from 'react';
import { 
  collection, query, orderBy, onSnapshot, 
  addDoc, serverTimestamp, doc, updateDoc,
  arrayUnion, arrayRemove, where, getDocs
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firestore } from '../../firebase-config';
import './style.scss';

const SocialNetwork = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('feed');
  const [users, setUsers] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Загрузка постов
  const fetchPosts = useCallback(() => {
    setLoading(true);
    try {
      const q = query(
        collection(firestore, 'posts'),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));
        setPosts(postsData);
        setLoading(false);
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error loading posts:", error);
      setLoading(false);
    }
  }, []);

  // Загрузка пользователей
  const fetchUsers = useCallback(async () => {
    try {
      const q = query(collection(firestore, 'users'));
      const snapshot = await getDocs(q);
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = fetchPosts();
    fetchUsers();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [fetchPosts, fetchUsers]);

  // Создание поста
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await addDoc(collection(firestore, 'posts'), {
        content: newPost,
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorPhoto: currentUser.photoURL,
        likes: [],
        comments: [],
        createdAt: serverTimestamp()
      });
      setNewPost('');
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Лайк поста
  const handleLike = async (postId, likes) => {
    try {
      const postRef = doc(firestore, 'posts', postId);
      await updateDoc(postRef, {
        likes: likes.includes(currentUser.uid) 
          ? arrayRemove(currentUser.uid) 
          : arrayUnion(currentUser.uid)
      });
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  // Добавление комментария
  const handleAddComment = async (postId, commentText) => {
    if (!commentText.trim()) return;

    try {
      const comment = {
        text: commentText,
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        createdAt: serverTimestamp()
      };

      const postRef = doc(firestore, 'posts', postId);
      await updateDoc(postRef, {
        comments: arrayUnion(comment)
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Подписка на пользователя
  const handleFollow = async (userId) => {
    try {
      const userRef = doc(firestore, 'users', currentUser.uid);
      await updateDoc(userRef, {
        following: arrayUnion(userId)
      });
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <div className="social-app">
      <header className="app-header">
        <h1>Социальная сеть</h1>
        <div className="tabs">
          <button 
            className={activeTab === 'feed' ? 'active' : ''}
            onClick={() => setActiveTab('feed')}
          >
            Лента
          </button>
          <button 
            className={activeTab === 'explore' ? 'active' : ''}
            onClick={() => setActiveTab('explore')}
          >
            Люди
          </button>
        </div>
      </header>

      <main className="app-content">
        {activeTab === 'feed' && (
          <>
            <form onSubmit={handleCreatePost} className="post-form">
              <div className="form-header">
                <img 
                  src={currentUser.photoURL || '/default-avatar.png'} 
                  alt="Ваш аватар" 
                  className="user-avatar"
                />
                <textarea
                  placeholder="Что у вас нового?"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
              </div>
              <button type="submit" disabled={!newPost.trim()}>
                Опубликовать
              </button>
            </form>

            {loading ? (
              <div className="loader">Загрузка...</div>
            ) : posts.length === 0 ? (
              <div className="empty-feed">Нет постов</div>
            ) : (
              <div className="posts-feed">
                {posts.map(post => (
                  <article key={post.id} className="post-card">
                    <div className="post-header">
                      <img 
                        src={post.authorPhoto || '/default-avatar.png'} 
                        alt={post.authorName} 
                        className="author-avatar"
                      />
                      <div className="author-info">
                        <h3>{post.authorName}</h3>
                        <time>{post.createdAt?.toLocaleString()}</time>
                      </div>
                    </div>

                    <div className="post-content">
                      <p>{post.content}</p>
                    </div>

                    <div className="post-actions">
                      <button 
                        onClick={() => handleLike(post.id, post.likes || [])}
                        className={`like-btn ${post.likes?.includes(currentUser.uid) ? 'liked' : ''}`}
                      >
                        ❤️ {post.likes?.length || 0}
                      </button>
                      <button 
                        onClick={() => setExpandedComments(prev => ({
                          ...prev,
                          [post.id]: !prev[post.id]
                        }))}
                        className="comment-btn"
                      >
                        💬 {post.comments?.length || 0}
                      </button>
                    </div>

                    {expandedComments[post.id] && (
                      <div className="comments-section">
                        {post.comments?.map((comment, index) => (
                          <div key={index} className="comment">
                            <img 
                              src={users.find(u => u.id === comment.authorId)?.photoURL || '/default-avatar.png'} 
                              alt={comment.authorName} 
                              className="comment-avatar"
                            />
                            <div className="comment-content">
                              <strong>{comment.authorName}</strong>
                              <p>{comment.text}</p>
                            </div>
                          </div>
                        ))}
                        <form 
                          onSubmit={(e) => {
                            e.preventDefault();
                            const commentText = e.target.comment.value;
                            if (commentText.trim()) {
                              handleAddComment(post.id, commentText);
                              e.target.comment.value = '';
                            }
                          }}
                          className="add-comment"
                        >
                          <input
                            name="comment"
                            placeholder="Написать комментарий..."
                            required
                          />
                          <button type="submit">Отправить</button>
                        </form>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'explore' && (
          <div className="users-grid">
            {users.filter(u => u.id !== currentUser.uid).map(user => (
              <div key={user.id} className="user-card">
                <img 
                  src={user.photoURL || '/default-avatar.png'} 
                  alt={user.displayName} 
                  className="user-avatar"
                />
                <div className="user-details">
                  <h3>{user.displayName}</h3>
                  <p>{user.bio || 'Пользователь социальной сети'}</p>
                  <button 
                    onClick={() => handleFollow(user.id)}
                    className="follow-btn"
                  >
                    Подписаться
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SocialNetwork;