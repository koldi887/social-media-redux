import React from "react";
import classes from "./myPosts.module.css";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Post from "./Posts";
import { IPosts } from "../../../redux/reducers/profileReducer/profile-reducer";

interface IProps {
  newPost: string;
  setNewPost: React.Dispatch<React.SetStateAction<string>>;
  addPost: () => void;
  posts: Array<IPosts>;
}

const MyPosts: React.FC<IProps> = ({ newPost, setNewPost, addPost, posts }) => {
  return (
    <Grid md={12} item>
      <div className={classes.addPostBlock}>
        <h2>Minu postitused</h2>
        <textarea
          className={classes.newPostTextArea}
          value={newPost}
          onChange={(event) => setNewPost(event.target.value)}
        />
        <Button
          onClick={addPost}
          variant="contained"
          size="medium"
          color="primary"
        >
          Lisa postitus
        </Button>
      </div>
      {posts.map((p) => (
        <Post key={p.id} likesCount={p.likesCount} text={p.text} />
      ))}
    </Grid>
  );
};

export default MyPosts;
