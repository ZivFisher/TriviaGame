import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizCardProps } from './QuizCardProps';
import { AlertDialog } from '../alert-dialog/AlertDialog';
import { useMyQuizzesContext } from '../../contexts/MyQuizzesContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './quiz-card.scss';
import { IconButton } from '@mui/material';

export const QuizCardMobileMenu: React.FC<QuizCardProps> = ({ id, title }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { deleteQuizFromDB } = useMyQuizzesContext();
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const shareQuiz = (onClick: () => void) => {
        navigator.clipboard.writeText(`http://localhost:3000/start-game?id=${id}`);
        return <MenuItem
            className='menu-item'
            onClick={onClick}
        >
            <img className='menu-icon'
                src="/svg/link-share.svg"
                alt="link for the game" />
            &nbsp;&nbsp;שליחת קישור למשחק
        </MenuItem>;
    };

    const deleteQuizButton = (onClick: () => void) => {
        return <MenuItem
            className='menu-item no-border'
            onClick={onClick}
        >
            <img className='menu-icon'
                src="/svg/trash.svg"
                alt="delete game" />
            &nbsp;&nbsp;מחיקת משחק
        </MenuItem>;
    };

    return (
        <div>
            <IconButton
                id="basic-button"
                className="quiz-card-phoneMenu-btn"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img
                    className="quiz-card-phoneMenu-btn-img"
                    src='/svg/3dotsmenu.png'
                    alt="three dots menu"
                />
            </IconButton>
            <Menu
                className='quiz-card-phoneMenu'
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                keepMounted
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                // transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                anchorPosition={{
                    top: 0,
                    left: 700
                }}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    className='menu-item'
                    onClick={() => {
                        navigate(encodeURI(`/score-board?id=${id}&title=${title}`));
                        handleClose();
                    }}>
                    <img
                        className='menu-icon'
                        src="/svg/score-link.svg"
                        alt="score board" /> &nbsp;&nbsp;לוח תוצאות
                </MenuItem>
                <AlertDialog
                    question="הקישור הועתק"
                    description="מצויין! עכשיו אתה יכול לשתף את החידון שלך עם חברים"
                    onConfirm={() => { }}
                    showCancelButton={false}
                    triggerButton={shareQuiz}
                />
                <MenuItem
                    className='menu-item'
                    onClick={() => {
                        handleClose();
                        navigate(encodeURI(`/create-quiz?id=${id}`));
                    }}>
                    <img
                        className='menu-icon'
                        src="/svg/edit-link.svg"
                        alt="edit game" /> &nbsp;&nbsp;עריכת משחק
                </MenuItem>
                <AlertDialog
                    question="האם אתה בטוח?"
                    description="אם תמחק את החידון לא יהיה ניתן לשחק בו והנתונים ששמרת ימחקו"
                    onConfirm={() => deleteQuizFromDB(id)}
                    showCancelButton={true}
                    triggerButton={deleteQuizButton}
                />
            </Menu>
        </div>
    );
};