import React, { Component } from 'react';
import './App.css';
import { Profile } from './components/profile';
import { Button } from './components/button';
import { Icon } from './components/icon';

export default class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      profiles: [],
      totalPage: 0,
      arrTotalPages: [],
      activePage: 1
    };
  }

  componentDidMount() {
    this.getPage();
  }

  getProfiles () {
    this.getPage();
  }

  callApi = async () => {
    const response = await fetch('/api/profiles/' + this.state.activePage);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  getPage = page => {
    this.callApi()
    .then(res => this.setState({
      profiles: res.data,
      totalPages: res.total_pages,
      arrTotalPages: this.getArray(res.total_pages)
    }))
    .catch(err => console.log(err));
  }

  setPage = page => {
    this.setState({ activePage: page }, this.getPage);
  }

  getArray = pages => {
    let result = [];
    for (var i = 1; i <= pages; i++) {
      result.push(i);
    }
    return result;
  }

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

    let { 
      profiles, 
      totalPages, 
      arrTotalPages, 
      activePage 
    } = this.state;

    console.log('bang');
    console.log(profiles);
  
    return (
      <div className="App">
        <header className="App-header">
          View Profiles
        </header>

        <div className="actions-container">
          <div className="row right">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="profile-search"
                placeholder="Search name"
                value={this.state.post}
                onChange={e => this.setState({ post: e.target.value })}
              />
              <Button styleName="wide input" onClick={() => console.log('bang')} text="Submit" />
            </form>
          </div>
          <div className="row right">
            <button className={"btn" + (activePage === 1 ? " inactive" : "")}
              disabled={(activePage === 1)}>
              <Icon name="angleLeft" />
            </button>
            <Button styleName="wide" onClick={() => this.getProfiles()} text="Get People" />
            { arrTotalPages && arrTotalPages.map(page => (
                <button key={page} 
                  className={"btn" + (activePage === page ? " active" : "")} 
                  onClick={() => this.setPage(page)}>{page}</button>
              )) 
            }
            <button className={"btn" + (activePage === totalPages ? " inactive" : "")}
              disabled={(activePage === totalPages)}>
              <Icon name="angleRight" />
            </button>
          </div>
        </div>

        <div className="profiles-container">

        {profiles ? profiles.map(profile => (
            <Profile profile={profile} key={profile.id}/>
          )) :
          <div>There are no profiles available</div>
        }

        </div>

      </div>
    );
  }
}
