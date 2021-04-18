import React from 'react';
import Post from './Post';
const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
