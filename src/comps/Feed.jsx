import { Container, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Posts from './Posts/Posts';
import UploadPost from './Posts/UploadPost';
import db from '../firebase/firebase';
import { Button, Modal } from '@material-ui/core';
import useStyles from './appStyles';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            style={{ margin: 30 }}
            variant="contained"
            color="primary"
            onClick={handleOpenModal}
          >
            Create Post
          </Button>
        </div>
        <Modal
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'lightgrey',
            opacity: '90%',
          }}
          open={openModal}
          onClose={handleCloseModal}
        >
          <UploadPost setOpenModal={setOpenModal} />
        </Modal>
        <Posts posts={posts} />
      </Container>
    </>
  );
};

export default Feed;
