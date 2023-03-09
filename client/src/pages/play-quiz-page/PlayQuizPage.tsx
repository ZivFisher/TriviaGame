import { MobileHeader } from "../../components/mobile-header/MobileHeader";
import { PlayAnswerContainer } from "../../components/play-quiz/PlayAnswerContainer";
import { PlayProgressBar } from "../../components/play-quiz/PlayProgressBar";
import { QuestionIndicator } from "../../components/play-quiz/QuestionIndicator";
import { QuestionTitle } from "../../components/play-quiz/QuestionTitle";
import { Preview } from "../../components/preview/Preview";
import { useIsBigScreen } from "../../consts/consts";
import { usePlayQuiz } from "../../contexts/PlayQuizContext";
import './PlayQuizPage.scss';

export const PlayQuizPage = () => {
    const isBigScreen = useIsBigScreen();
    const { quiz, isPreview } = usePlayQuiz();

    return (
        <div className="play-quiz-page">
            {!isBigScreen ? <MobileHeader title={quiz.title} showLogo={false} /> : isPreview &&
                <Preview />
            }
            <PlayProgressBar />
            <div className='play-quiz-container'>
                <div className='quiz-play-board'>
                    <QuestionTitle />
                    <PlayAnswerContainer />
                </div>
                <QuestionIndicator />
                {!isBigScreen && <img className='leaves-bottom-left' src='svg/leaves-bottom-left.svg' alt='A batch of leaves' />}
            </div>
        </div>
    );
}

