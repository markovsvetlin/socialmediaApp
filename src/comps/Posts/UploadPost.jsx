import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { storage } from '../../firebase/firebase';
import db from '../../firebase/firebase';
import firebase from 'firebase';
import { useStateValue } from '../../stateProvider/StateProvider';

const UploadPost = () => {
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [{ user }, dispatch] = useStateValue();
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const upload = storage.ref(`images/${image.name}`).put(image);
    upload.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
        setImage(null);
      }
    );
  };
  return (
    <div>
      <input
        type="text"
        placeholder="What do you think ?"
        onChange={(event) => setText(event.target.value)}
        value={text}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Post</Button>
      <progress value={progress} max="100" />
    </div>
  );
};

export default UploadPost;
