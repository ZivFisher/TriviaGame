import { Route, Routes } from 'react-router-dom';
import { Loading } from './pages/loading/Loading';
import { NotFoundContent } from './pages/not-found/NotFound';
import { CreateQuiz } from './pages/CreateQuiz';
import { HomePage } from './pages/home-page/HomePage';
import { Main } from './pages/main/Main';
import { Login } from './components/login/Login';
import { QuizNickname } from './pages/quiz-nickname/QuizNickname';
import './App.scss';




function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={< Main />}>
          <Route path='/loading' element={<Loading />}></Route>
          <Route path='/create-quiz' element={<CreateQuiz />}></Route>
          <Route path='home-page' element={<HomePage />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='quiz-nickname' element={<QuizNickname />}></Route>
          <Route path='/*' element={<NotFoundContent />}></Route>
        </Route>
      </Routes>
    </div >
  );
}

export default App;
