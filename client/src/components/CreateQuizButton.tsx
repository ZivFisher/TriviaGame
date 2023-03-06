import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '1vh 4vh',
    borderRadius: '8px',
    lineHeight: 1.5,
    backgroundColor: '#378381',
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
        backgroundColor: '#378381',
    },
});

export default function CreateQuizButton() {
    return (
        <CustomButton variant="contained">
            יצירת חידון
        </CustomButton>
    );
}

