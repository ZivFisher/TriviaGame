import { Checkbox } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { BootstrapTooltip } from '../tool-tip/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import './AnswerDetails.scss';

interface AnswerProps {
  answerNum: number;
  onCorrect: (event: React.ChangeEvent<HTMLInputElement>, answerId: number) => void;
  onAnswer: (event: React.ChangeEvent<HTMLInputElement>, answerId: number) => void;
  answerContent: string;
}

export const AnswerDetails: React.FC<AnswerProps> = ({ answerNum, onCorrect, onAnswer, answerContent }) => {
  const isBigScreen = useMediaQuery('(min-width:600px)');


  return (
    <div className="answer-container">
      {isBigScreen ? <div>
        <BootstrapTooltip title="סמן את התשובה הנכונה">
          <Checkbox
            onChange={(event) => onCorrect(event, answerNum)}
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleOutlineIcon style={{ color: '#4C6677' }} />}
          />
        </BootstrapTooltip>
        <input type="text" value={answerContent} className="answer-input" placeholder={`תשובה ${answerNum}`} onChange={(event) => onAnswer(event, answerNum)} />
        <div className="answer-option-div">
          <BootstrapTooltip title="הוספת תמונה לתשובה">
            <img src="/svg/image.svg" alt="upload image" className="image-photo upload-image" />
          </BootstrapTooltip>
          <img src="/svg/garbage.svg" alt="delete answer" className="bin-answer-photo" />
        </div>
      </div> :
        <div className='mobile-answer-container'>
          <div>
            <Checkbox
              onChange={(event) => onCorrect(event, answerNum)}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleOutlineIcon style={{ color: '#4C6677' }} />}
            />
          </div>
          <div className='mobile-answer-div'>
            <input type="text" value={answerContent} className="mobile-answer-input" placeholder={`תשובה ${answerNum}`} onChange={(event) => onAnswer(event, answerNum)} />
            <img src="/svg/image.svg" alt="upload image" className="mobile-image-photo upload-image" />
          </div>
          <img src="/svg/garbage.svg" alt="delete answer" className="mobile-bin-answer-photo" />
        </div>}
    </div>
  );
};
