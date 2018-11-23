import React from 'react';

function PollDetailView(props) {
  const poll = props.location && props.location.state
    ? props.location.state.poll
    : null;

  return poll
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

export default PollDetailView;
