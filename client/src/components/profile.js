import React from 'react';
import './style/profile.css';

export const Profile = ({ profile }) => {

  let {
    id,
    first_name,
    last_name,
    avatar 
  } = profile;

  return (
    <div className="profile-card" key={id} style={{backgroundImage: 'url(' + avatar + ')'}}>
      <div className="top">{"ID: " + id}</div>
      <div className="bottom">
        <div>{last_name}</div>
        <div>{first_name}</div>
      </div>
    </div>
  )
};
