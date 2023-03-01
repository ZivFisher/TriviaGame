import { Route, Routes } from 'react-router-dom';
import { NotFoundContent } from './pages/not-found/NotFound';
import { CreateQuiz } from './pages/create-quiz-page/CreateQuiz';
import { HomePage } from './pages/home-page/HomePage';
import { Main } from './pages/main/Main';
import { PlayQuizPage } from './pages/play-quiz-page/PlayQuizPage';
import { QuizNickname } from './pages/quiz-nickname/QuizNickname';
import { QuizResults } from './pages/quiz-results/QuizResults';
import { MyQuizzes } from './pages/my-quizzes/MyQuizzes';
import { QuizDetailsProvider } from './contexts/quizDetailsContext';
import { Register } from './pages/login-register/register/Register';
import { ScorePage } from './pages/score-page/ScorePage';
import { Login } from './pages/login-register/login/Login';
import { PlayQuizProvider } from "./contexts/PlayQuizContext";
import { ScoreBoardProvider } from './contexts/ScorePageContext';
import './App.scss';
import { Loading } from './pages/loading/Loading';


function App() {
  return (
    <div className="App">
      <PlayQuizProvider>
        <Routes>
          <Route path='/' element={< Main />}>
            <Route path='/create-quiz' element={
              <QuizDetailsProvider>
                <CreateQuiz />
              </QuizDetailsProvider>}
            ></Route>
            <Route path='home-page' element={<HomePage />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='quiz-nickname' element={<QuizNickname />} />
            <Route path='quiz-results' element={<QuizResults />} />
            <Route path='play-quiz' element={<PlayQuizPage />} />
            <Route path='score-board' element={
              <ScoreBoardProvider>
                <ScorePage />
              </ScoreBoardProvider>} />
            <Route path='my-quizzes' element={<MyQuizzes />}></Route>
            <Route path='loading' element={<Loading />} />
            <Route path='/*' element={<NotFoundContent />} />
          </Route>
        </Routes>
      </PlayQuizProvider>
    </div >
  );
}

export default App;
