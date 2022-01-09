import React from "react";
import classes from "./posts.module.css";

interface IProps {
  text: string;
  likesCount: number;
}

const Post: React.FC<IProps> = ({ text, likesCount }) => {
  return (
    <div className={classes.postBlock}>
      {text}
      <div>
        <span className={classes.postLikes}>Likes</span> {likesCount}
      </div>
    </div>
  );
};

export default Post;
