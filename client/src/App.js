import React, { Component } from 'react';
import './App.css';
import { Profile } from './components/profile';
import { Button } from './components/button';
import { Icon } from './components/icon';
import { ValidationText } from './components/validation';

import { convertToArray } from './utils/index';

export default class App extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      profiles: [],
      activePage: 1,
      totalPage: 0,
      arrTotalPages: [],
      requestedPage: '',
      errorType: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      arrTotalPages: convertToArray(res.total_pages)
    }))
    .catch(err => console.log(err));
  }

  setPage = page => {
    this.setState({ activePage: page }, this.getPage);
  }

  navigate = direction => {
    switch (direction) {
      case "next":
        return this.setPage(this.state.activePage + 1);
      case "previous":
        return this.setPage(this.state.activePage - 1);
      default:
        return;
    }
  }

  handleChange (event) {
    this.setState({ 
      requestedPage: Number(event.target.value),
      errorType: null
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    
    let { requestedPage, totalPages } = this.state;

    if (requestedPage < 0 || requestedPage > totalPages) {
      this.triggerError("outOfRange");
    } else {
      this.setPage(this.state.requestedPage);
    }
  }

  triggerError = type => {
    this.setState({ errorType: type });
  }

  render() {

    let { 
      profiles, 
      totalPages, 
      arrTotalPages, 
      activePage 
    } = this.state;
  
    return (
      <div className="App">
      <div className="App-container">

        <header className="App-header">
          View Profiles
        </header>

        <div className="actions-container">
          <Button styleName="large" disabled={profiles.length} onClick={() => this.getPage()} text="Get People" />
        </div>

        <div className="actions-container">
          <div className="row right">
            <form onSubmit={this.handleSubmit}>
              <input
                type="number"
                className="profile-search"
                placeholder="Page Number"
                value={this.state.requestedPage}
                onChange={event => this.handleChange(event)}
              />
              <Button styleName="wide input" onClick={() => console.log('bang')} text="Get Page" />
            </form>
          </div>
          <div className="row right">
            <button 
              className={"btn" + (activePage === 1 ? " inactive" : "")}
              disabled={!profiles.length || (activePage === 1)}
              onClick={() => this.navigate("previous")}>
              <Icon name="angleLeft" />
            </button>
            { arrTotalPages && arrTotalPages.map(page => (
                <button key={page} 
                  className={"btn" + (activePage === page ? " active" : "")} 
                  onClick={() => this.setPage(page)}>{page}</button>
              )) 
            }
            <button
              className={"btn" + (activePage === totalPages ? " inactive" : "")}
              disabled={!profiles.length || (activePage === totalPages)}
              onClick={() => this.navigate("next")}>
              <Icon name="angleRight" />
            </button>
          </div>
        </div>

        <div className="profiles-container">
          {profiles ? profiles.map(profile => (
              <Profile profile={profile} key={profile.id}/>
            )) :
            <div>There are no profiles loaded</div>
          }
        </div>

      </div>
      </div>
    );
  }
}
