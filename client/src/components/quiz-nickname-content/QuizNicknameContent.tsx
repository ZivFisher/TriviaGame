import { useNavigate, useSearchParams } from 'react-router-dom';
import { MobileHeader } from '../mobile-header/MobileHeader';
import { usePlayQuiz } from '../../contexts/PlayQuizContext';
import { Preview } from '../preview/Preview';
import { useIsBigScreen } from '../../consts/consts';
import { Button } from '@mui/material';

export function QuizNicknameContent() {
    const isBigScreen = useIsBigScreen();
    const { nickname, setNickname, quiz, isPreview } = usePlayQuiz();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = e.target.value;
        setNickname(value);
    };

    return (
        <div className='quiz-nickname-container'>
            {isBigScreen && isPreview &&
                <Preview />
            }
            {isBigScreen
                ? <h1 className='quiz-nickname-header'>{quiz?.title}</h1>
                : <MobileHeader title={quiz?.title} showLogo={false} />
            }
            <div className='quiz-nickname-content'>
                <label className='nickname-label'>איך קוראים לכם?</label>
                <input
                    className='nickname-input'
                    placeholder='נא להזין שם'
                    name='nickname'
                    onChange={onChange}
                    value={nickname}
                />
                <Button
                    className='quiz-nickname-button'
                    onClick={() => navigate('/play-quiz?id=' + id)}
                    variant='contained'>
                    <span>יאללה בואו נתחיל!</span>
                    <img src='svg/IconAwesome-play.svg' alt='Play button' />
                </Button>
            </div>
            {!isBigScreen && <img className='photo-bottom-left' src='svg/bottom-left-leaf.svg' alt='A batch of leaves' />}
        </div>
    );
}

