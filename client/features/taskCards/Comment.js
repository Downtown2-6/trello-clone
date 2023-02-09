import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { deleteComment } from "../singleBoard/singleBoardSlice";

const Comment = (props) => {
  const { taskCard } = props;
  const dispatch = useDispatch();

  console.log(taskCard);

  const deleteComment = (commentId) => {
    console.log("This is the id of the comment", commentId)
    // dispatch(deleteComment(commentId))
  }

  return (
    <Box className="comments-container">
      {taskCard.comments && taskCard.comments.length
        ? taskCard.comments.map((comment) => (
            <Box
              className="single-comment-container"
              key={`comment#${comment.id}`}
              sx={{ padding: "0.5em" }}
            >
              <Box>
                <Typography variant="subtitle2" id="single-comment-user-label">
                  <Box className="single-comment-user">
                    {comment.user.firstName} {comment.user.lastName}{" "}
                    <IconButton
                      aria-label="close"
                      onClick={() => deleteComment(comment.id)}
                    >
                      <CloseIcon
                        sx={{
                          fontSize: 12,
                          // position: "relative",
                          // left: "90%",
                          // top: "50%",
                          color: (theme) => theme.palette.grey[500],
                        }}
                      />
                    </IconButton>
                  </Box>
                </Typography>
              </Box>

              <Box className="single-comment-content">{comment.content}</Box>
            </Box>
          ))
        : null}
    </Box>
  );
};

export default Comment;
