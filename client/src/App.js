import { useEffect, useState } from "react";

import './App.css';
import List from './components/List';
import Form from './components/AddForm';

function App() {

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
    <div className="App">
      <Form refreshItems={fetchItems}/>
      <List items={items} refreshItems={fetchItems} />
    </div>
  );
}

export default App;
