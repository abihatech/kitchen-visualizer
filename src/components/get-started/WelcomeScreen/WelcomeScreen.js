import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  return (
    <div className="welcome-container">
      <div className="overlay">
        <h2>WELCOME TO</h2>
        <img src="https://paramountdesignstudio.com/wp-content/uploads/2025/01/Canva-Edited-Paramount-Logo-e1736290776127.png" alt="The Paramount Studio Logo" className="logo" />
        <h1>ROOM VISUALIZER</h1>
        <p className="description">Here is what you can do here:</p>
        <ul>
          <li>View different cabinet layouts for various rooms</li>
          <li>Change the color of the cabinets, counters, backsplash and more</li>
          <li>Save your design and share it with a friend</li>
        </ul>
        <p className="call-to-action">
          Come see all of the different options we can offer you!
        </p>
        <button className="get-started">GET STARTED</button>
      </div>
    </div>
  );
};

export default WelcomeScreen;