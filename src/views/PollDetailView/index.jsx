import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';


class PollDetailView extends Component {
  state = {
    poll: this.props.location && this.props.location.state
      ? this.props.location.state.poll
      : this.fetchPoll(this.props.match.params)
  };

  fetchPoll({ id }) {
    const url = `https://polls.apiblueprint.org/questions/${id}`;

    fetch(url)
      .then(resp => {
        resp.json()
          .then(data => {
            console.log(data);
            this.setState({ poll: data });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  render() {
    console.log(this.props);
    const { poll } = this.state;

    return (
      <Fragment>
        <Link to="/">Main Page</Link>
        {poll
          ? (
            <div>
              <h2>Question: {poll.question}</h2>
              <ul>
                {poll.choices.map((choice, index) => (
                  <li key={`choice-${index}`}>
                    {choice.choice} {choice.votes}
                  </li>
                ))}
              </ul>
            </div>
          )
          : <p>Nothing found :(</p>
        }
      </Fragment>
    );
  };
};

export default PollDetailView;
