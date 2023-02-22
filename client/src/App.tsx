import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { CreateQuiz } from './pages/CreateQuiz';


function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element={< Main /> }> 
    
    </Route> */}
    <Route path='/create-quiz' element={<CreateQuiz />}></Route>
      </Routes>
    </div>
  );
}

export default App;
