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
    choiceId: null,
    votedChoice: null,
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

  handleSelect(e) {
    const { poll } = this.state;
    const { id } = e.currentTarget.dataset;
    const newChoices = poll.choices.map((choice, index) => (
      { ...choice, isSelected: index === parseInt(id, 10) ? true : false }
    ));
    poll.choices = newChoices;
    this.setState({ poll, choiceId: parseInt(id, 10) });
  }

  handleVote() {
    const questionId = this.props.match.params.id;
    const { choiceId } = this.state;
    const url = `https://polls.apiblueprint.org/questions/${questionId}/choices/${choiceId}`;

    fetch(url)
      .then(resp => {
        resp.json()
          .then(data => {
            this.setState({ votedChoice: data.choice })
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  render() {
    const { poll, pollList, choiceId, votedChoice } = this.state;
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
                  <li
                    key={`choice-${index}`}
                    data-id={index}
                    onClick={e => this.handleSelect(e)}>
                    <ChoiceItem
                      choice={choice}
                      rootVotes={rootVotes}
                      isSelected={choice.isSelected}
                      isLast={poll.choices.length - 1 === index} />
                  </li>
                ))}
              </ul>
              <button
                onClick={() => this.handleVote()}
                disabled={!(choiceId >= 0)}>
                Save Vote
              </button>
              {votedChoice && <p>You've voted for {votedChoice}!</p>}
            </div>
          )
          : <p>Nothing found :(</p>
        }
      </Fragment>
    );
  };
};

export default PollDetailView;
