import React from 'react';
import { Link } from 'react-router-dom';

const SingleTaskCard = (props) => {
  const taskCard = props.taskCard;

  return (
    // <Link>
      <p>{taskCard.title}</p>
    // </Link>
  )
}

export default SingleTaskCard;
