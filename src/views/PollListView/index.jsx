import React, { Component, Fragment } from 'react';

import PollListItem from '../../components/PollListItem';
import styles from './PollList.module.css';

class PollListView extends Component {
  state = {
    pollList: this.props.location && this.props.location.state
      ? this.props.location.state.pollList
      : null,
  }

  componentDidMount() {
    this.fetchPolls();
  }

  fetchPolls() {
    const url = 'https://polls.apiblueprint.org/questions?page=1';

    fetch(url)
      .then(resp => {
        resp.json()
          .then(data => {
            this.setState({ pollList: data.reverse() });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  render() {
    const { pollList } = this.state;

    return (
      <Fragment>
        <h1 className={styles.title}>Questions</h1>
        {pollList
          ? (
            <ul className={styles.pollList}>
              {pollList.map((poll, index) => (
                <li className={styles.pollListItem} key={`poll-${index++}`}>
                  <PollListItem poll={poll} index={index} pollList={pollList} />
                </li>
              ))}
            </ul>
          )
          : <h1>Loading...</h1>}
      </Fragment>
    )
  }
}

export default PollListView;
