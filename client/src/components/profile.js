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
    <div className="profile-card" key={id}>
      <div>{"ID: " + id}</div>
      <img src={avatar}/>
      <div>
        <div>{last_name}</div>
        <div>{first_name}</div>
      </div>
    </div>
  )
};
