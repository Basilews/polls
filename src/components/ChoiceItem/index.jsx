import React from 'react';
import classNames from 'classnames';

import calculatePercentage from '../../utils/calculatePercentage';
import styles from './ChoiceItem.module.css';


function ChoiceItem({ choice, rootVotes, isLast }) {
  return (
    <div className={classNames(styles.choice, { isLast })}>
      <span className={styles.choiceName}>
        {choice.choice}
      </span>
      <span className={styles.choiceVotes}>
        {choice.votes}
      </span>
      <span>
        {calculatePercentage(rootVotes, choice.votes)}%
      </span>
    </div>
  );
};

export default ChoiceItem;
