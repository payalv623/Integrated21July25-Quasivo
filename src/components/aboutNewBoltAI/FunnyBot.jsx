import React from "react";
import "./FunnyBot.css"; // Assuming you move styles to a separate CSS file (optional)

const FunnyBot = ({ openModal }) => {
  return (
    <div className="funny-bot" onClick={openModal}>
      <div className="bot-face">
        <div className="bot-antenna"></div>
        <div className="bot-eyes">
          <div className="bot-eye"></div>
          <div className="bot-eye"></div>
        </div>
        <div className="bot-mouth"></div>
      </div>
      <div className="bot-arms">
        <div className="bot-arm left"></div>
        <div className="bot-arm right"></div>
      </div>
    </div>
  );
};

export default FunnyBot;
