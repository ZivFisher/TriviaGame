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
import { Loading } from './pages/loading/Loading';
import { StartGamePage } from './pages/start-game-page/StartGamePage';
import { AuthProvider, PrivateRoute } from '@hilma/auth';
import { MyQuizzesProvider } from './contexts/MyQuizzesContext';
import './App.scss';


function App() {
  return (
    <div className="App">
      <AuthProvider accessTokenCookie={process.env.REACT_APP_AT_COOKIE}>
        <PlayQuizProvider>
          <Routes>
            <Route path='/' element={< Main />}>
              <Route
                path='/create-quiz'
                element=
                {<PrivateRoute
                  componentName="User"
                  component={
                    <QuizDetailsProvider>
                      <CreateQuiz />
                    </QuizDetailsProvider>}
                  redirectPath="/login" />}
              />
              {/* <Route path='home-page' element={<HomePage />} /> */}
              <Route path="/home-page" element={<PrivateRoute componentName="User" component={<HomePage />} redirectPath="/login" />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='quiz-nickname' element={<QuizNickname />} />
              <Route path='quiz-results' element={<QuizResults />} />
              <Route path='play-quiz' element={<PlayQuizPage />} />
              <Route path='start-game' element={<StartGamePage />} />
              <Route path='score-board' element={
                <ScoreBoardProvider>
                  <ScorePage />
                </ScoreBoardProvider>} />
              <Route path='my-quizzes' element={<PrivateRoute componentName="User" component={<MyQuizzesProvider><MyQuizzes /></MyQuizzesProvider>} redirectPath="/login" />} />
              <Route path='loading' element={<Loading />} />
              <Route path='/*' element={<NotFoundContent />} />
            </Route>
          </Routes>
        </PlayQuizProvider>
      </AuthProvider>
    </div >
  );
}

export default App;
