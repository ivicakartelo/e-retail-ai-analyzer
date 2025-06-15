import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, fetchComments } from './commentsSlice';
import './CommentsList.css';

const CommentExcerpt = ({ comment }) => (
  <div className="comment">
    <strong>{comment.username || 'Anonymous'}</strong>
    <p>{comment.comment_text}</p>
  </div>
);

const CommentForm = ({ articleId }) => {
  const dispatch = useDispatch();
  const { token, user = {} } = useSelector(state => state.login || {});
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setError('Please login to post a review');
    if (!text.trim()) return setError('Comment text cannot be empty');
    try {
      await dispatch(addComment({
        articleId,
        text: text.trim(),
        userId: user.user_id,
        name: user.name || 'Anonymous'
      })).unwrap();
      setText('');
    } catch (err) {
      setError('Failed to post comment');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>Leave a Review</h3>
      <p>{user ? user.name : "Guest"}</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={token ? "Share your thoughts..." : "Please login to give a review..."}
        disabled={!token}
        rows={4}
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={!token || !text.trim()}>Post Review</button>
    </form>
  );
};

const CommentsList = ({ articleId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(state => state.comments.items || []);
  const status = useSelector(state => state.comments.status);

  useEffect(() => {
    dispatch(fetchComments(articleId));
  }, [dispatch, articleId]);

  return (
    <div className="comments-list-container">
      <h2>Customer Reviews</h2>
      <CommentForm articleId={articleId} />
      <div className="comments-list">
        {status === 'loading' ? (
          <p>Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <CommentExcerpt key={comment.comment_id} comment={comment} />
          ))
        ) : (
          <p>No reviews yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
};





export default CommentsList;