import { Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { BootstrapTooltip } from '../tool-tip/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import './AnswerDetails.scss';
import { useQuizDetails } from '../../contexts/quizDetailsContext';
import { FileInput, useFiles } from '@hilma/fileshandler-client';
import { UploadImage } from '../upload-image/UploadImage';

interface AnswerProps {
  answerNum: number;
  onCorrect: (event: React.ChangeEvent<HTMLInputElement>, answerId: number, questionIndex: number) => void;
  onAnswer: (event: React.ChangeEvent<HTMLInputElement>, answerId: number, questionIndex: number) => void;
  onDeleteAnswer: (answerId: number, questionIndex: number) => void;
  answerContent: string;
  answerId: number;
  isCorrect: boolean;
  questionIndex: number;
  questionId: number;
  answerIndex: number;
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
  questionId,
  answerIndex
}) => {
  const { setQuestions } = useQuizDetails()
  const isBigScreen = useMediaQuery('(min-width:600px)');
  const { questions } = useQuizDetails();
  const filesUploader = useFiles();

  const handleImageChange = (value: { link: string }): void => {
    setQuestions(prev => {
      prev[questionIndex].answers[answerIndex].image = value.link;
      return [...prev];
    }
    );
  };

  const deleteImg = () => {
    setQuestions(prev => {
      delete prev[questionIndex].answers[answerIndex].image;
      return [...prev];
    }
    );
  }

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
            {questions[questionIndex].answers[answerIndex].image
              ? <UploadImage imageSrc={questions[questionIndex].answers[answerIndex].image} deleteImg={deleteImg} questionId={questionId} />
              : <BootstrapTooltip title="הוספת תמונה לתשובה">
                <label>
                  <FileInput type="image" filesUploader={filesUploader} onChange={handleImageChange} className='upload-image-input' />
                  <img
                    src="/svg/image.svg"
                    alt="upload image"
                    className="image-photo" />
                </label>
              </BootstrapTooltip>
            }
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
            <div className='mobile-answer-content' >
              <input
                type="text"
                value={answerContent}
                className="mobile-answer-input"
                placeholder={`תשובה ${answerNum}`}
                onChange={(event) => onAnswer(event, answerId, questionIndex)}
              />
              <label className={questions[questionIndex].answers[answerIndex].image ? 'disabled' : ''}>
                <FileInput type="image" filesUploader={filesUploader} onChange={handleImageChange} className='upload-image-input' />
                <img
                  src="/svg/image.svg"
                  alt="upload image"
                  className="image-photo" />
              </label>
            </div>
            {questions[questionIndex].answers[answerIndex].image &&
              <UploadImage
                imageSrc={questions[questionIndex].answers[answerIndex].image}
                deleteImg={deleteImg}
                questionId={questionId} />
            }
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
