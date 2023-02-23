import React from 'react'
import { Link } from 'react-router-dom'
import CreateQuizButton from '../CreateQuizButton'
import './Header.scss'

export
  const Header: React.FC = () => {
    return (
      <header className="pc-header">
        <nav className="header-nav">
          <Link className='create-quiz-btn' to='/createquiz'><CreateQuizButton /></Link>
          <span className="header-divider">|</span>
          <Link to="/myquiz" className="header-link">החידונים שלי</Link>
          <span className="header-divider">|</span>
          <Link to="/about" className="header-link">אודות</Link>
        </nav>
        <Link to='/'>
          <div className="header-logo">
            <h3 className="header-title">BANANAS.Games</h3>
            <img src="./svg/Banana.svg" alt="BANANAS.Games" />
          </div>
        </Link>
      </header>
    );
  };


