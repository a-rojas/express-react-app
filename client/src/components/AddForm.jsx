import { useState } from "react"

import './AddForm.css';

export default function AddForm( {refreshItems} ) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [species, setSpecies] = useState('');

  const disableButton = name === '' || age === '' || species === '';

  const onSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3030/animal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        age,
        species
      })
    }).then(() =>{
      refreshItems();
    });

    setName('');
    setAge('');
    setSpecies('');
  };

  return (
    <div className="form-container">
      <h2>Add new animal</h2>

      <form  onSubmit={onSubmit}>
        <div className="form-control">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}></input>
        </div>

        <div className="form-control">
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => {setAge(e.target.value)}}></input>
        </div>

        <div className="form-control">
          <label>Species:</label>
          <input type="text" value={species} onChange={(e) => {setSpecies(e.target.value)}}></input>
        </div>

        <button type="submit" disabled={disableButton}>Submit</button>
      </form>
    </div>
  )
}
