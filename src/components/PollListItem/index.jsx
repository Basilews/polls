import React from 'react';
import { Link } from 'react-router-dom';

import formatDate from '../../utils/formatDate';

function PollListItem({ poll, index }) {
  return (
    <Link to={{
      pathname: `/question/${index}`,
      state: { poll },
    }}>
      <div>
        <p>{poll.question}</p>
        <p>{formatDate(poll.published_at)}</p>
        <p>choices: {poll.choices.length}</p>
      </div>
    </Link>
  )
};

export default PollListItem;
