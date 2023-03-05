import { MobileHeader } from "../../components/mobile-header/MobileHeader";
import { PlayAnswerContainer } from "../../components/play-quiz/PlayAnswerContainer";
import { PlayProgressBar } from "../../components/play-quiz/PlayProgressBar";
import { QuestionIndicator } from "../../components/play-quiz/QuestionIndicator";
import { QuestionTitle } from "../../components/play-quiz/QuestionTitle";
import { useIsBigScreen } from "../../consts/consts";
import { usePlayQuiz } from "../../contexts/PlayQuizContext";
import './PlayQuizPage.scss';

export function PlayQuizPage() {
    const isBigScreen = useIsBigScreen();
    const { quiz } = usePlayQuiz();

    return (
        <div className="play-quiz-page">
            {!isBigScreen ? <MobileHeader title={quiz.title} showLogo={false} /> : null}
            <PlayProgressBar />
            <div className='play-quiz-container'>
                <div className='quiz-play-board'>
                    <QuestionTitle />
                    <PlayAnswerContainer />
                </div>
                <QuestionIndicator />
                {!isBigScreen && <img className='leaves-bottom-left' src='svg/leaves-bottom-left.svg' />}
            </div>
        </div>
    );
}

