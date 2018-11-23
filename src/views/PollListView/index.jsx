import React, { Component } from 'react';

import PollListItem from '../../components/PollListItem';

class PollListView extends Component {
  state = {
    pollList: null,
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
            console.log(data);
            this.setState({ pollList: data });
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  render() {
    const { pollList } = this.state;

    return pollList
      ? (
        <ul>
          {pollList.map((poll, index) => (
            <li key={`poll-${index++}`}>
              <PollListItem poll={poll} index={index} />
            </li>
          ))}
        </ul>
      )
      : (
        <h1>Loading...</h1>
      );
  }
}

export default PollListView;
