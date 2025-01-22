
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TodoList from "./component/TodoList"

function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<TodoList/>}/>
        </Routes>
    </Router>
  );
}

export default App;