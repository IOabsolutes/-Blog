import React, { useState } from "react";
import styles from "./AddComment.module.scss";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios";
export const Index = () => {
  const [massege, setMassege] = useState("");
  const { id: postId } = useParams();
  const comment = {
    massege,
    postId,
  };
  const postComment = () => {
    axios.post("/comments", comment).then(({ data }) => console.log(data));
    setMassege("");
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://mui.com/static/images/avatar/5.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Write a comment"
            variant="outlined"
            value={massege}
            onChange={(e) => setMassege(e.target.value)}
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={postComment} variant="contained">
            post
          </Button>
        </div>
      </div>
    </>
  );
};
