import { Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Posts from './Posts/Posts';
import UploadPost from './Posts/UploadPost';
import db from '../firebase/firebase';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  return (
    <Container maxWidth="sm">
      <UploadPost />
      <Posts posts={posts} />
    </Container>
  );
};

export default Feed;
