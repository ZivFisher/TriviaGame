import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './ComputerHeader.scss';

export const ComputerHeader: React.FC = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <Button
          variant="contained"
          sx={{
            width: 130,
            height: 35,
            fontWeight: "bold"
          }}
        >
          יצירת חידון
        </Button>
        <span className="header-divider">|</span>
        <Link to="/myquiz" className="header-link">החידונים שלי</Link>
        <span className="header-divider">|</span>
        <Link to="/about" className="header-link">אודות</Link>
      </nav>
      <Link to='/'>
        <div className="header-logo">
          <h3 className="header-title">BANANAS.Games</h3>
          <img src="./svg/Layer32.svg" alt="BANANAS.Games" />
        </div>
      </Link>
    </header>
  );
};


