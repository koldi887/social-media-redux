import React, { useState } from 'react';
import { addNewPost, profileSelector } from '../../../redux/reducers/profileReducer/profile-reducer';
import MyPosts from './MyPosts';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const MyPostsContainer = () => {
  const { posts } = useAppSelector(profileSelector);
  const [newPost, setNewPost] = useState('');

  const dispatch = useAppDispatch();

  const addPost = () => {
    dispatch(addNewPost(newPost));
    setNewPost('');
  };

  return <MyPosts posts={posts} addPost={addPost} setNewPost={setNewPost} newPost={newPost} />;
};

export default MyPostsContainer;
