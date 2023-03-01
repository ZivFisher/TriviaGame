import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './quiz-card.scss';

export function QuizCardMobileMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                <MenuItem className='menu-item' onClick={handleClose}><img className='menu-icon' src="/svg/link-share.svg" alt="link for the game" /> &nbsp;&nbsp;שליחת קישור למשחק</MenuItem>
                <MenuItem className='menu-item' onClick={handleClose}><img className='menu-icon' src="/svg/edit-link.svg" alt="edit game" /> &nbsp;&nbsp;עריכת משחק</MenuItem>
                <MenuItem className='menu-item no-border' onClick={handleClose}><img className='menu-icon' src="/svg/trash.svg" alt="delete game" /> &nbsp;&nbsp;מחיקת משחק</MenuItem>
            </Menu>
        </div>
    );
}