import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import ChoiceItem from '../../components/ChoiceItem';
import styles from './PollDetail.module.css';


class PollDetailView extends Component {
  state = {
    poll: this.props.location && this.props.location.state
      ? this.props.location.state.poll
      : null,
    pollList: this.props.location && this.props.location.state
      ? this.props.location.state.pollList
      : null,
    isSelected: false,
  };

  componentDidMount() {
    if (!this.state.poll) {
      this.fetchPoll(this.props.match.params)
    }
  }

  fetchPoll({ id }) {
    const url = `https://polls.apiblueprint.org/questions/${id}`;

    fetch(url)
      .then(resp => {
        resp.json()
          .then(data => {
            this.setState({ poll: data });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  // handleSelect() {
  //   this.setState(prevState => isSelected)
  // }

  // handleVote() {
  //   const url = '';

  //   fetch(url)
  //     .then(resp => {
  //       resp.json()
  //         .then(data => {
  //           this.setState({ poll: data });
  //         })
  //         .catch(err => console.error(err));
  //     })
  //     .catch(err => console.error(err));
  // }

  render() {
    const { poll, pollList, isSelected } = this.state;
    const rootVotes = poll
      ? poll.choices.reduce((sum, val) => sum + val.votes, 0)
      : null;

    return (
      <Fragment>
        <Link to={{ pathame: '/', state: { pollList } }}
          className={styles.link}>
          Main Page
        </Link>
        {poll
          ? (
            <div>
              <h2>Question: {poll.question}</h2>
              <ul>
                {poll.choices.map((choice, index) => (
                  <li key={`choice-${index}`} onClick={() => this.handleSelect()}>
                    <ChoiceItem
                      choice={choice}
                      rootVotes={rootVotes}
                      isLast={poll.choices.length - 1 === index} />
                  </li>
                ))}
              </ul>
              <button
                onClick={() => this.handleVote()}
                disabled={!isSelected}>
                Save Vote
              </button>
            </div>
          )
          : <p>Nothing found :(</p>
        }
      </Fragment>
    );
  };
};

export default PollDetailView;
