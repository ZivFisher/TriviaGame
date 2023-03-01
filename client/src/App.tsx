import { Route, Routes } from 'react-router-dom';
import { Loading } from './pages/loading/Loading';
import { NotFoundContent } from './pages/not-found/NotFound';
import { CreateQuiz } from './pages/create-quiz-page/CreateQuiz';
import { HomePage } from './pages/home-page/HomePage';
import { Main } from './pages/main/Main';
import { PlayQuizPage } from './pages/play-quiz-page/PlayQuizPage';
import { QuizNickname } from './pages/quiz-nickname/QuizNickname';
import { QuizDetailsProvider } from './contexts/quizDetailsContext';
import { Register } from './pages/login-register/register/Register';
import { ScorePage } from './pages/score-page/ScorePage';
import { Login } from './pages/login-register/login/Login';
import { PlayQuizProvider } from "./contexts/PlayQuizContext";
import './App.scss';







function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={< Main />}>
          <Route path='/loading' element={<Loading />}></Route>
          <Route path='/create-quiz' element={
            <QuizDetailsProvider>
              <CreateQuiz />
            </QuizDetailsProvider>}
          ></Route>
          <Route path='home-page' element={<HomePage />}></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='register' element={<Register />}></Route>
          <Route path='quiz-nickname' element={<QuizNickname />}></Route>
          <Route path='play-quiz' element={
            <PlayQuizProvider>
              <PlayQuizPage />
            </PlayQuizProvider>}
          ></Route>
          <Route path='/*' element={<NotFoundContent />}></Route>
          <Route path='score-board' element={<ScorePage />}></Route>
        </Route>
      </Routes>
    </div >
  );
}

export default App;
