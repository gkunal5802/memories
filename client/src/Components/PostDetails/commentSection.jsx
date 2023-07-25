import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { commentPost } from "../../actions/posts";
import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const commentsRef = useRef();
  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography variant="subtitle1" gutterBottom key={i}>
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="subtitle1">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              multiline
              variant="outlined"
              label="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              stye={{ marginTop: "10px" }}
              variant="contained"
              fullWidth
              color="primary"
              disabled={!comment}
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
