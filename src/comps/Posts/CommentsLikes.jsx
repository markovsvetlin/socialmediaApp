import React, { useState, useEffect } from 'react';
import db from '../../firebase/firebase';
import { useStateValue } from '../../stateProvider/StateProvider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Button, IconButton, Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase';
import useStyles from '../appStyles';

const CommentsLikes = ({ id, post }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [{ user }] = useStateValue();
  const [isLiked, setLiked] = useState(false);
  const classes = useStyles();

  //like function
  const addLike = () => {
    let likeRef = db.collection('posts').doc(id);
    likeRef.update({
      likes: firebase.firestore.FieldValue.increment(1),
    });
    setLiked(true);
  };

  //dislike function
  const dissLike = () => {
    let likeRef = db.collection('posts').doc(id);
    likeRef.update({
      likes: firebase.firestore.FieldValue.increment(-1),
      liked: false,
    });
    setLiked(false);
  };
  //comment post
  const postComment = (event) => {
    event.preventDefault();
    db.collection('posts').doc(id).collection('comments').add({
      text: comment,
      username: user.displayName,
      profilePic: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
  };
  //fetch comments
  useEffect(() => {
    let comment;
    if (id) {
      comment = db
        .collection('posts')
        .doc(id)
        .collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      comment();
    };
  }, [id]);

  return (
    <div>
      {comments.map((comment, index) => (
        <div className={classes.postComment} key={index}>
          <Avatar className={classes.commentAvatar} src={comment.profilePic} />
          <b style={{ marginRight: 8 }}>{comment.username}</b>
          <span> {comment.text} </span>
        </div>
      ))}
      <Divider fullWidth />
      <div className={classes.postFooter}>
        <IconButton
          onClick={isLiked ? dissLike : addLike}
          aria-label="add to favorites"
        >
          <FavoriteIcon style={{ color: isLiked ? 'red' : 'grey' }} />
          {post.data.likes > 0 ? post.data.likes : ''}
        </IconButton>

        <form>
          <input
            className={classes.commentInput}
            type="text"
            placeholder="add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <Button
            variant="outlined"
            color="primary"
            disabled={!comment}
            type="submit"
            onClick={postComment}
            style={{ marginLeft: 10 }}
          >
            Post
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CommentsLikes;
