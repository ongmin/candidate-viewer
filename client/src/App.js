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
      requestedPage: null,
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
    this.setState({ 
      activePage: page,
      errorType: null
    }, this.getPage);
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

    if (!requestedPage) {
      this.triggerError("missingInput");
    }
    else if ((requestedPage < 0) || (requestedPage > totalPages)) {
      this.triggerError("outOfRange");
    } 
    else {
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
      activePage,
      errorType,
      requestedPage
    } = this.state;
  
    return (
      <div className="App">
      <div className="App-container">

        <header className="App-header">
          {"View Profiles"}
        </header>

        <div className="actions-container">
          <Button 
            styleName="large" 
            disabled={profiles.length} 
            onClick={() => this.getPage()} 
            text="Get People" />
        </div>

        <div className="actions-container">
          <div className="row right block">
            <form onSubmit={this.handleSubmit}>
              <input
                type="number"
                className="profile-search"
                placeholder="Page"
                min={1}
                max={totalPages}
                value={requestedPage ? requestedPage : ""}
                disabled={!profiles.length}
                onChange={event => this.handleChange(event)}
              />
              <Button
                styleName="wide input"
                disabled={!profiles.length} 
                text="Get Page" />
            </form>
            { errorType &&
              <ValidationText type={errorType} text={this.state.errorType} maxSize={totalPages}/>
            }
          </div>
          <div className="row right">
            <Button
              styleName={(activePage === 1 ? " inactive" : "")}
              disabled={!profiles.length || (activePage === 1)}
              onClick={() => this.navigate("previous")} 
              text={<Icon name="angleLeft" />} />
      
            { arrTotalPages && arrTotalPages.map(page => (
                <Button
                  key={page}
                  styleName={"btn" + (activePage === page ? " active" : "")}
                  onClick={() => this.setPage(page)}
                  text={page} />
              )) 
            }
            <Button
              styleName={"btn" + (activePage === totalPages ? " inactive" : "")}
              disabled={!profiles.length || (activePage === totalPages)}
              onClick={() => this.navigate("next")}
              text={<Icon name="angleRight" />} />
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
