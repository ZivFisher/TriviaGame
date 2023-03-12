import { useNavigate } from 'react-router-dom';
import { Button, useMediaQuery } from '@mui/material';
import { MobileHeader } from '../mobile-header/MobileHeader';
import { usePlayQuiz } from '../../contexts/PlayQuizContext';
import { Preview } from '../preview/Preview';

export function QuizNicknameContent() {
    const phoneMedia: boolean = useMediaQuery('(max-width:600px)');
    const { nickname, setNickname, quiz, isPreview } = usePlayQuiz();
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = e.target.value;
        setNickname(value);
    };

    return (
        <div className='quiz-nickname-container'>
            {!phoneMedia && isPreview &&
                <Preview />
            }
            {!phoneMedia
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
                    onClick={() => navigate('/play-quiz')}
                    variant='contained'>
                    <span>יאללה בואו נתחיל!</span>
                    <img src='svg/IconAwesome-play.svg' alt='Play button' />
                </Button>
            </div>
            {phoneMedia && <img className='photo-bottom-left' src='svg/Group565bottom-left.svg' alt='A batch of leaves' />}
        </div>
    );
}

