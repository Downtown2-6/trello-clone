import React from 'react';
import { Box } from "@mui/material";

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
          <Box className='single-comment-user'>
            {comment.user.firstName} {comment.user.lastName}
          </Box>
          <Box className='single-comment-content'>
            {comment.content}
          </Box>
        </Box>

      )) : null}
    </Box>
  )
}

export default Comment;