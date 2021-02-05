import React from 'react';

export default function Main() {
  return (
    <div
      className="home-main-div"
      style={{ backgroundImage: 'url(' + `${require('./../../assets/images/header.jpeg')}` + ')' }}>
      <div className="home-shape-div">
        <div className="col home-shape-div">
          <div className="text-center">
            <h2>Smart Coach</h2>
            <p>Streamline your coaching pratice</p>
            <a href="#waitlist-form">
              <button>Join Waitlist</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
