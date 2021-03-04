import React, { useState } from 'react';

const Filter = ({ handleChange, search, setSearch}) => {
  let icon = (
    <span>
      
    </span>
  );
  return (
    <div className="input-div">
      <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input className="input" value={search} onChange={handleChange(setSearch)} placeholder="Search"/>
    </div>
  );
}

export default Filter