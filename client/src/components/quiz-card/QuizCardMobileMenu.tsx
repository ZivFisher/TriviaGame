import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './quiz-card.scss';
import { AlertDialog } from '../alert-dialog/AlertDialog';

export function QuizCardMobileMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const shareQuiz = (onClick: () => void) => {
        return <MenuItem
            className='menu-item'
            onClick={onClick}>
            <img className='menu-icon'
                src="/svg/link-share.svg"
                alt="link for the game" />
            &nbsp;&nbsp;שליחת קישור למשחק</MenuItem>
    }

    const deleteQuiz = (onClick: () => void) => {
        return <MenuItem
            className='menu-item no-border'
            onClick={onClick}>
            <img className='menu-icon'
                src="/svg/trash.svg"
                alt="delete game"
            /> &nbsp;&nbsp;מחיקת משחק</MenuItem>
    }

    return (
        <div>
            <Button
                id="basic-button"
                className="quiz-card-phoneMenu-btn"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <img
                    className="quiz-card-phoneMenu-btn-img"
                    src='/svg/3dotsmenu.png' alt="three dots menu" />
            </Button>
            <Menu className='quiz-card-phoneMenu'
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem className='menu-item' onClick={handleClose}><img className='menu-icon' src="/svg/score-link.svg" alt="score board" /> &nbsp;&nbsp;לוח תוצאות</MenuItem>
                <AlertDialog
                    question="הקישור הועתק"
                    description="מצויין! עכשיו אתה יכול לשתף את החידון שלך עם חברים"
                    onConfirm={() => {
                        //todo
                    }}
                    showCancelButton={false}
                    triggerButton={shareQuiz}
                />

                <MenuItem className='menu-item' onClick={handleClose}><img className='menu-icon' src="/svg/edit-link.svg" alt="edit game" /> &nbsp;&nbsp;עריכת משחק</MenuItem>
                <AlertDialog
                    question="האם אתה בטוח?"
                    description="אם תמחק את החידון לא יהיה ניתן לשחק בו והנתונים ששמרת ימחקו"
                    onConfirm={() => {
                        //todo
                    }}
                    showCancelButton={true}
                    triggerButton={deleteQuiz}
                />
            </Menu>
        </div>
    );
}