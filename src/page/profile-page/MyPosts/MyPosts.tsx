import React, { ChangeEvent, useState } from "react";
import classes from "./MyPosts.module.css";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Post from "./Posts";
import {
  addPostSuccess,
  profileSelector,
} from "../../../redux/reducers/profileReducer/profile-reducer";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

export const MyPosts: React.FC = () => {
  const { posts } = useAppSelector(profileSelector);
  const [newPostText, setNewPostText] = useState("");

  const dispatch = useAppDispatch();

  const addPost = () => {
    dispatch(addPostSuccess(newPostText));
    setNewPostText("");
  };

  const newPostTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewPostText(e.target.value);
  };

  return (
    <Grid md={12} item>
      <div className={classes.addPostBlock}>
        <h2>My posts</h2>
        <textarea
          className={classes.newPostTextArea}
          value={newPostText}
          onChange={newPostTextHandler}
        />
        <Button
          onClick={addPost}
          variant="contained"
          size="medium"
          color="primary"
        >
          Add post
        </Button>
      </div>
      {posts.map((p) => (
        <Post key={p.id} likesCount={p.likesCount} text={p.text} />
      ))}
    </Grid>
  );
};
