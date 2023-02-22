import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CreateQuiz } from './pages/CreateQuiz';
import './App.scss';
import { HomePage } from './pages/home-page/HomePage';


function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path='/' element={< Main /> }> 
    
        <Route path='/create-quiz' element={<CreateQuiz />}></Route>
    </Route> */}
      </Routes>
    </div>
  );
}

export default App;
