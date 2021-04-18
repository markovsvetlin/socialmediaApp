import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Button, IconButton } from '@material-ui/core';
import db from '../../firebase/firebase';
import { useStateValue } from '../../stateProvider/StateProvider';
import firebase from 'firebase';

const Post = ({ post, id }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [{ user }] = useStateValue();
  const [likes, setLikes] = useState(0);

  const postComment = (event) => {
    event.preventDefault();
    db.collection('posts').doc(id).collection('comments').add({
      text: comment,
      username: user.displayName,
      profilePic: user.photoURL,
    });
    setComment('');
  };
  useEffect(() => {
    let likes;
    if (id) {
      likes = db
        .collection('posts')
        .doc(id)
        .collection('likes')
        .onSnapshot((snap) => {
          setLikes(snap.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
        });
    }
    //setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    return () => {
      likes();
    };
  }, [id]);

  useEffect(() => {
    let unsubscribe;
    if (id) {
      unsubscribe = db
        .collection('posts')
        .doc(id)
        .collection('comments')
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [id]);
  console.log(likes);
  return (
    <Card style={{ marginBottom: 50, paddingBottom: 50 }}>
      <CardContent>
        <div
          style={{
            display: 'flex',
            padding: '10px 10px 0px 10px',
            marginBottom: 0,
            alignItems: 'center',
          }}
        >
          <Avatar src={post.data.profilePic} />
          <Typography
            style={{ paddingLeft: 10, paddingRight: 20 }}
            variant="h6"
          >
            {post.data.username}
          </Typography>
        </div>
        <Typography variant="subtitle2" style={{ paddingLeft: 60 }}>
          {new Date(post.data.timestamp?.toDate()).toUTCString()}
        </Typography>
        <Typography variant="body1">{post.data.caption}</Typography>
      </CardContent>
      <CardMedia
        style={{
          padding: 10,
          height: 300,
          display: 'flex',
          justifyContent: 'center',
        }}
        image={post.data.imageURL}
      />
      <CardContent>
        <div>
          {comments.map((comment) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar src={comment.profilePic} />
              <div style={{ margin: '0px 10px 0px 10px' }}>
                <b>{comment.username}</b>

                <span style={{ marginLeft: 10 }}> {comment.text} </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <div style={{ display: 'flex', height: 50, alignItems: 'center' }}>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" style={{ padding: 0 }}>
            <FavoriteIcon />
          </IconButton>
        </CardActions>

        <Typography
          variant="subtitle1"
          style={{ paddingRight: 20 }}
        ></Typography>

        <form
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <input
            type="text"
            placeholder="add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ width: '100%', border: 'none', height: 30 }}
          ></input>
          <Button
            variant="outlined"
            color="primary"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </Button>
        </form>
      </div>
    </Card>
  );
};

export default Post;
