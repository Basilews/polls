import React from 'react';
import { Link } from 'react-router-dom';

import formatDate from '../../utils/formatDate';
import styles from './PollListItem.module.css';


function PollListItem({ poll, index, pollList }) {
  return (
    <Link to={{
      pathname: `/question/${index}`,
      state: { poll, pollList },
    }}>
      <div className={styles.listItem}>
        <p><b>{poll.question}</b></p>
        <p>{formatDate(poll.published_at)}</p>
        <p>choices: {poll.choices.length}</p>
      </div>
    </Link>
  )
};

export default PollListItem;
