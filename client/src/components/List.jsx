import { useState, useEffect } from 'react';

import ListItem from './ListItem';

import './List.css';

export default function List({items, refreshItems}) {

  const [listItems, setListItems] = useState(items || []);

  useEffect(() => {
    setListItems(items);
  }, [items]);

  const filterItems = (e) => {
    const value = e.target.value;

    const filteredItems = items.filter((item) => {
      const name = item.name.toLowerCase().includes(value.toLowerCase());
      const species = item.species.toLowerCase().includes(value.toLowerCase())

      return name || species;
    });

    setListItems(filteredItems);
  };

  if (items.length > 0) {
    return (
      <>
      <div className="filter-container">
        <label>Filter:</label>
        <input type="text" onChange={filterItems}></input>
      </div>

        <ul className="list">
          <li className="heading">
            <span>
              Name/Age
            </span>
            <span>
              Species
            </span>
          </li>
          {listItems.map((item) => {
            return <ListItem key={item.id} item={item} refreshItems={refreshItems}/>
          })}
        </ul>
      </>
    )
  }

  return (
    <>
      <p>No Animals found</p>
    </>
  )
}
