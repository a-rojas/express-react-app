import { Link } from 'react-router-dom';
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import './ListItem.css';

export default function ListItem({item, refreshItems}) {
  const deleteAnimal = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3030/animals/${item.id}`, {
      method: 'DELETE'
    }).then(() => {
      refreshItems()
    });
  };

  return (
    <li className="list-item">
      <div className="name-age">
        <span className='name'>{item.name}</span>
        <span className='age'>{item.age}</span>
      </div>

      <div className="species">
        <span>{item.species}</span>
        <Link to={`/animal/${item.id}`} className='icon'>
          <FaPencilAlt /> Edit
        </Link>

        <a to={`/animal/${item.id}`} onClick={deleteAnimal} className='icon delete' href='#'>
          <FaTrash /> Delete
        </a>
      </div>
    </li>
  )
}
