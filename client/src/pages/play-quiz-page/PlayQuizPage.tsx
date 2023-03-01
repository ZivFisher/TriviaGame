import { useMediaQuery } from "@mui/material";
import { PlayAnswerContainer } from "../../components/play-quiz/PlayAnswerContainer";
import { QuestionIndicator } from "../../components/play-quiz/QuestionIndicator";
import { QuestionTitle } from "../../components/play-quiz/QuestionTitle";
import './PlayQuizPage.scss';

export function PlayQuizPage() {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
            <div className='play-quiz-container'>
                <div className='quiz-play-board'>
                    <QuestionTitle/>
                    <PlayAnswerContainer/>
                </div>
                <QuestionIndicator/> 
                {isMobile && <img className='leaves-bottom-left' src='svg/leaves-bottom-left.svg' />}
            </div>
    );
}

