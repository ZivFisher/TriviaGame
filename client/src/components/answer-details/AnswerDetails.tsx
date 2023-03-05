import { Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { BootstrapTooltip } from '../tool-tip/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import './AnswerDetails.scss';
import { useQuizDetails } from '../../contexts/quizDetailsContext';

interface AnswerProps {
  answerNum: number;
  onCorrect: (event: React.ChangeEvent<HTMLInputElement>, answerId: number, questionIndex: number) => void;
  onAnswer: (event: React.ChangeEvent<HTMLInputElement>, answerId: number, questionIndex: number) => void;
  onDeleteAnswer: (answerId: number, questionIndex: number) => void;
  answerContent: string;
  answerId: number;
  isCorrect: boolean;
  questionIndex: number;
}

export const AnswerDetails: React.FC<AnswerProps> = ({
  answerNum,
  questionIndex,
  answerContent,
  answerId,
  isCorrect,
  onCorrect,
  onAnswer,
  onDeleteAnswer,
}) => {
  const isBigScreen = useMediaQuery('(min-width:600px)');
  const { questions } = useQuizDetails();


  return (
    <div className="answer-container">
      {isBigScreen
        ? <div className='answer-input-option'>
          <BootstrapTooltip title="סמן את התשובה הנכונה">
            <Checkbox
              checked={isCorrect}
              onChange={(event) => onCorrect(event, answerId, questionIndex)}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleOutlineIcon style={{ color: '#4C6677' }}
              />}
            />
          </BootstrapTooltip>
          <input
            type="text"
            value={answerContent}
            className="answer-input"
            placeholder={`תשובה ${answerNum}`}
            onChange={(event) => onAnswer(event, answerId, questionIndex)}
          />
          <div className="answer-option-div">
            <BootstrapTooltip title="הוספת תמונה לתשובה">
              <img
                src="/svg/image.svg"
                alt="upload image"
                className="image-photo" />
            </BootstrapTooltip>
            <img
              src="/svg/trash.svg"
              alt="delete answer"
              className={questions[questionIndex].answers.length === 2 ? "bin-answer-photo-opacity" : "bin-answer-photo"}
              onClick={() => onDeleteAnswer(answerId, questionIndex)}
            />
          </div>
        </div>
        : <div className='mobile-answer-container'>
          <div className=''>
            <Checkbox
              checked={isCorrect}
              onChange={(event) => onCorrect(event, answerId, questionIndex)}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleOutlineIcon style={{ color: '#4C6677' }} />}
            />
          </div>
          <div className='mobile-answer-div'>
            <input
              type="text"
              value={answerContent}
              className="mobile-answer-input"
              placeholder={`תשובה ${answerNum}`}
              onChange={(event) => onAnswer(event, answerId, questionIndex)}
            />
            <img
              src="/svg/image.svg"
              alt="upload image"
              className="mobile-image-photo upload-image" />
          </div>
          <img
            src="/svg/trash.svg"
            alt="delete answer"
            className={questions[questionIndex].answers.length === 2 ? "mobile-bin-answer-photo-opacity" : "mobile-bin-answer-photo"}
            onClick={() => onDeleteAnswer(answerId, questionIndex)}
          />
        </div>}
    </div>
  );
};
