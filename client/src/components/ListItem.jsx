import { useState } from 'react';
import { FaTrash, FaPencilAlt, FaCheck, FaWindowClose } from 'react-icons/fa';
import './ListItem.css';

export default function ListItem({item, refreshItems}) {
  const [name, setName] = useState(item.name);
  const [age, setAge] = useState(item.age);
  const [species, setSpecies] = useState(item.species);
  const [editMode, setEditMode] = useState(false);

  const deleteAnimal = () => {
    fetch('http://localhost:3030/animal', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id })
    }).then(() => {
      refreshItems()
    });
  };

  const saveItem = () => {
    fetch('http://localhost:3030/animal', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: item.id,
        name,
        age,
        species
      })
    }).then(() =>{
      setEditMode(false);
      refreshItems();
    });
  };

  const closeEdit = () => {
    setEditMode(false);
    setName(item.name);
    setAge(item.age);
    setSpecies(item.species);
  }

  return (
    <li className="list-item">
      <div className="name-age">
        {editMode ?
          <>
            <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}></input>
            <input type="number" value={age} onChange={(e) => {setAge(e.target.value)}}></input>
          </>
        :
          <>
            <span className='name'>{item.name}</span>
            <span className='age'>{item.age}</span>
          </>
        }
      </div>

      <div className="species">
        {editMode ? 
          <input type="text" value={species} onChange={(e) => {setSpecies(e.target.value)}}></input>
        :
          <span>{item.species}</span>
        }

        {editMode ? 
          <>
            <button className="icon" onClick={saveItem} title="Save">
              <FaCheck />
            </button>
            <button className="icon" onClick={closeEdit} title="Cancel">
              <FaWindowClose />
            </button>
          </>
        :
          <button className="icon" onClick={() => {setEditMode(current => !current)}} title="Edit">
              <FaPencilAlt />
          </button>
        }

        <button className="icon" onClick={deleteAnimal}>
            <FaTrash />
        </button>
      </div>
    </li>
  )
}
