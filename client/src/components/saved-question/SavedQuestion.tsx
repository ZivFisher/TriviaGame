import { Question } from '../../interfaces/quizDetailInterface';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { BootstrapTooltip } from '../tool-tip/Tooltip';
import { useQuizDetails } from '../../contexts/quizDetailsContext';
import './SavedQuestion.scss'
import { Checkbox } from '@mui/material';


interface SavedQuestionProps {
    question: Question;
    questionIndex: number;
}

export const SavedQuestion: React.FC<SavedQuestionProps> = ({ question, questionIndex }) => {

    const { setActiveQuestion, setQuestions } = useQuizDetails();

    const editQuestion = (questionIndex: number) => {
        setQuestions(prev => prev.map((question) => {
            const title = question.title || "שאלה ללא כותרת";
            return {
                ...question,
                title,
                answers: question.answers.map((answer) => {
                    const content = answer.content || "תשובה ללא תוכן";
                    return { ...answer, content };
                }),
            };
        }));
        setActiveQuestion(questionIndex);
    };
    return (
        <div
            className='saved-question-container'
            onClick={() => editQuestion(questionIndex)}>
            <BootstrapTooltip title="החלף סדר שאלות">
                <img src="/images/drag-and-drop.png" alt="drag and drop" className='drag-and-drop' />
            </BootstrapTooltip>
            <div className='saved-question-div'>
                <h1 className='saved-question-name'>{question.title}</h1>
                {question.image &&
                    <img src={question.image} alt="" />
                }
            </div>
            {question.answers.map((answer) => {
                return <div className='saved-question-answers' key={answer.id || answer.tempId}>
                    <Checkbox
                        checked={answer.isCorrect}
                        icon={<RadioButtonUncheckedIcon />}
                        checkedIcon={<CheckCircleOutlineIcon style={{ color: '#4C6677' }}
                        />}
                    />
                    <p>{answer.content}</p>
                    {
                        answer.image &&
                        <img src={answer.image} alt="" />
                    }
                </div >
            })}

        </div >
    );
};