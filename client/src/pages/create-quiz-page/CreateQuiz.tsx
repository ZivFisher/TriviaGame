import { QuizDetails } from "../../components/create-quiz/QuizDetails";
import { QuestionDetails } from "../../components/questions/QuestionDetails";
import useMediaQuery from '@mui/material/useMediaQuery';
import './CreateQuiz.scss';



export const CreateQuiz: React.FC = () => {
  const isBigScreen: boolean = useMediaQuery('(min-width:600px)');
  return (
    <div className="create-quiz-div">
      <QuizDetails />
      <QuestionDetails />
    </div>
  );
}

