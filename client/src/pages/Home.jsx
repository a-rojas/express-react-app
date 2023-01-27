import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import List from '../components/List';

export default function Home() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = () => {
    fetch('http://localhost:3030/animals')
      .then(res => res.json())
      .then(result => {
        setItems(result)
      })
  }

  return (
    <div>
      <h1>Animal List</h1>
      <Link to='/animal'>Add New Animal</Link>
      <List items={items} refreshItems={fetchItems} />
    </div>
  )
}
