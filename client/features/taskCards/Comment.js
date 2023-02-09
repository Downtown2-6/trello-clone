import React from 'react';
import { Box, Typography } from "@mui/material";

const Comment = (props) => {
  const { taskCard } = props;

  console.log(taskCard)
  
  return (
    <Box className='comments-container'>
      {taskCard.comments && taskCard.comments.length ? 
      taskCard.comments.map((comment) => (

        <Box 
          className='single-comment-container' 
          key={`comment#${comment.id}`} 
          sx={{ padding: '0.5em' }}
        >
          <Typography variant="subtitle2" id="single-comment-user-label">
          <Box className='single-comment-user'>
            {comment.user.firstName} {comment.user.lastName}
          </Box>
          </Typography>
          <Box className='single-comment-content'>
            {comment.content}
          </Box>
        </Box>

      )) : null}
    </Box>
  )
}

export default Comment;
