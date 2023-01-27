import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import './AddForm.css';

export default function AddForm() {
  const navigate = useNavigate();

  const {id} = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [species, setSpecies] = useState('');

  const disableButton = name === '' || age === '' || species === '';

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3030/animals/${id}`)
        .then(res => res.json())
        .then(result => {
          setName(result.name);
          setAge(result.age);
          setSpecies(result.species);
        })
    }

  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3030/animals/${id || 'add'}`, {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        age,
        species
      })
    });

    navigate('/');
  };

  return (
    <div className="form-container">
      <Link to='/'>Back</Link>
      <form  onSubmit={onSubmit}>
        <div className="form-control">
          <p>Name:</p>
          <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}></input>
        </div>

        <div className="form-control">
          <p>Age:</p>
          <input type="number" value={age} onChange={(e) => {setAge(e.target.value)}}></input>
        </div>

        <div className="form-control">
          <p>Species:</p>
          <input type="text" value={species} onChange={(e) => {setSpecies(e.target.value)}}></input>
        </div>

        <button type="submit" disabled={disableButton}>Submit</button>
      </form>
    </div>
  )
}

