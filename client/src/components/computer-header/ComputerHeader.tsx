import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./ComputerHeader.scss";

export const ComputerHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <nav className="header-nav">
        <Button
          variant="contained"
          className="create-quiz-btn"
          onClick={() => navigate("/create-quiz")}
        >
          יצירת חידון
        </Button>
        <span className="header-divider">|</span>
        <Link to="/my-quizzes" className="header-link">
          החידונים שלי
        </Link>
      </nav>
      <Link to="/home-page">
        <div className="header-logo">
          <h3 className="header-title">BANANAS.Games</h3>
          <img src="./svg/Layer32.svg" alt="BANANAS.Games" />
        </div>
      </Link>
    </header>
  );
};
