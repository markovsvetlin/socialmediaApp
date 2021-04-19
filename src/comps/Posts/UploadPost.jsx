import { Button } from '@material-ui/core';
import useStyles from '../appStyles';
import React, { useState } from 'react';
import { storage } from '../../firebase/firebase';
import db from '../../firebase/firebase';
import firebase from 'firebase';
import { useStateValue } from '../../stateProvider/StateProvider';
import Card from '@material-ui/core/Card';

const UploadPost = ({ setOpenModal }) => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState('');
  const [{ user }] = useStateValue();
  const classes = useStyles();

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  //upload post func
  const handleUpload = () => {
    const upload = storage.ref(`images/${image.name}`).put(image);
    upload.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 //progress bar
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: text,
              imageURL: url,
              username: user.displayName,
              profilePic: user.photoURL,
            });
          });
        setProgress(0);
        setText('');
        setImage('');
        setOpenModal(false);
      }
    );
  };

  return (
    <div>
      <Card className={classes.cardUpload}>
        <div>
          <input
            className={classes.postInput}
            type="text"
            placeholder="What do you think ?"
            onChange={(event) => setText(event.target.value)}
            value={text}
          />
          <Button
            fullWidth
            size="small"
            variant="contained"
            color="secondary"
            component="label"
          >
            {image ? 'Uploaded ' : 'Upload image'}
            <input type="file" hidden onChange={handleChange} />
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() =>
              !text || !image
                ? alert('Please enter text and image')
                : handleUpload()
            }
          >
            Post
          </Button>
          <progress
            className={classes.progressBar}
            value={progress}
            max="100"
          />
        </div>
      </Card>
    </div>
  );
};

export default UploadPost;
