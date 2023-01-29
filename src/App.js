import { useState, useEffect } from 'react';
import axios from "axios";

import './app.css';
import Item from './components/Item'

function App() {

  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState("");

  useEffect(() => {
    axios.get("https://todo-app-backend-black.vercel.app/get-todo")
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
  })

  const addUpdateTodo = () => {

    if (isUpdating === "") {
      axios.post("https://todo-app-backend-black.vercel.app/save-todo", { text })
        .then((res) => {
          console.log(res.data);
          setText("");
        })
        .catch((err) => console.log(err));
    }else{
      axios.post("https://todo-app-backend-black.vercel.app/update-todo", { _id: isUpdating, text })
        .then((res) => {
          console.log(res.data);
          setText("");
          setUpdating("");
        })
        .catch((err) => console.log(err));
    }
  }

  const deleteTodo = (_id) => {
    axios.post("https://todo-app-backend-black.vercel.app/delete-todo", { _id })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  const updateTodo = (_id, text) => {
    setUpdating(_id);
    setText(text);
  }

  return (
    <><advertisement><center>Submitted and coded by Jagadeesh Kumar . S, you may send mail to my email address which is jagadeesh_2k17@proton.me, you may contribute some money to my Indian Unified Payment Interface (UPI) which is jagadeesh-kumar@ybl .</center></advertisement><div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder='Write Something...'
            value={text}
            onChange={(e) => setText(e.target.value)} />
          <div className="add"
            onClick={addUpdateTodo}>{isUpdating ? "Update" : "Add"}</div>
        </div>

        <div className="list">
          {todo.map(item => <Item
            key={item._id}
            text={item.text}
            remove={() => deleteTodo(item._id)}
            update={() => updateTodo(item._id, item.text)} />)}
        </div>

      </div>
    </div><advertisement><center>Submitted and coded by Jagadeesh Kumar . S, you may send mail to my email address which is jagadeesh_2k17@proton.me, you may contribute some money to my Indian Unified Payment Interface (UPI) which is jagadeesh-kumar@ybl .</center></advertisement></>
    
  );
}

export default App;
