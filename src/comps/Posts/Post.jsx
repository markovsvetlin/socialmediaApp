import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CommentsLikes from './CommentsLikes';
import { Button } from '@material-ui/core';
import db from '../../firebase/firebase';
import { useStateValue } from '../../stateProvider/StateProvider';
import useStyles from '../appStyles';

const Post = ({ post, id }) => {
  const [{ user }] = useStateValue();
  const classes = useStyles();

  const removePost = () => {
    db.collection('posts')
      .doc(post.id)
      .delete()
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  return post ? (
    <Card className={classes.postContainer}>
      <CardContent>
        <div className={classes.cardHead}>
          <div style={{ display: 'flex' }}>
            <Avatar src={post.data.profilePic} />
            <div style={{ paddingLeft: 10 }}>
              <Typography variant="h6">{post.data.username}</Typography>
              <div style={{ fontSize: 10 }}>
                {new Date(post.data.timestamp?.toDate()).toUTCString()}
              </div>
            </div>
          </div>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() =>
              post.data.username == user.displayName
                ? removePost()
                : alert('Only the post owner can delete the post!')
            }
          >
            remove
          </Button>
        </div>
        <Typography variant="body1">{post.data.caption}</Typography>
      </CardContent>
      <CardMedia className={classes.postImg} image={post.data.imageURL} />
      <CardActions>
        <CommentsLikes id={id} post={post} />
      </CardActions>
    </Card>
  ) : (
    'loading'
  );
};

export default Post;
