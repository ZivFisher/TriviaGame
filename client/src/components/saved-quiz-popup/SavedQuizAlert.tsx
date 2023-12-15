import { FC } from 'react';
import { copyToClipboard, useIsBigScreen } from '../../consts/consts';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import './SavedQuizAlert.scss'


export const SavedQuizAlert: FC = () => {
    const isBigScreen: boolean = useIsBigScreen();
    const navigate = useNavigate();

    const [searchedParams] = useSearchParams();
    const id = searchedParams.get('id');

    const handleShare = () => {
        copyToClipboard(`http://localhost:3000/start-game?id=${id}`)
    };

    const navigateToHome = () => {
        navigate('/home-page');
    };

    return (
        <>
            <Dialog
                className='saved-quiz-dialog'
                open={!isBigScreen}
            >
                <img className='dancing-monkey' src="./svg/monkey-holds-banana.svg" alt="monkey holds a banana" />
                <DialogTitle>נשמר בהצלחה!</DialogTitle>
                <DialogContent>
                    תוכלו לראות את החידונים במאגר החידונים שלכם ולשתף אותו לחברים
                </DialogContent>
                <DialogActions>

                    <Button
                        className='share-btn'
                        variant="contained"
                        onClick={handleShare}
                    >
                        <img
                            className='share-logo'
                            src="./svg/Icon-awesome-share.svg"
                            alt="share button"
                        />
                        שתף תוצאה
                    </Button>

                    <Button
                        className='home-btn'
                        variant="contained"
                        onClick={navigateToHome}
                    >
                        <img
                            className='share-logo'
                            src="./svg/home.svg"
                            alt=""
                        />
                        עמוד הבית
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
