import React, { Component } from 'react';
import './App.css';
import { Profile } from './components/profile';
import { Button } from './components/button';

export default class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      profiles: []
    };
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ profiles: res.data }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/profiles');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };

  render() {

    let {profiles} = this.state;

    console.log('bang');
    console.log(profiles);
  
    return (
      <div className="App">
        <header className="App-header">
          <p>
            View Profiles
          </p>
        </header>
        
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>

        <div className="actions-container">
          <Button onClick={() => console.log('bang')} text="Get People" />
        </div>

        <div className="profiles-container">

        {profiles ? 
          profiles.map(profile => (
            <Profile profile={profile} key={profile.id}/>
          )) :
          <div>There are no profiles available</div>
        }

        </div>

      </div>
    );
  }
}
