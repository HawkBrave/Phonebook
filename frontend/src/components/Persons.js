import React from 'react';
import Person from './Person';

const Persons = ({ persons, search, handleClick }) => {
  const display = () => {
    if (search !== "") {
      return persons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        .map(p => <Person 
          key={p.id} 
          person={p}
          handleClick={() => handleClick(p.id)}
        />);
    } else {
      return persons.map(p => <Person 
        key={p.id} 
        person={p}
        handleClick={() => handleClick(p.id)}
      />);
    }
  }
  return (
    <ul>
      {display()}
    </ul>
  );
}

export default Persons;