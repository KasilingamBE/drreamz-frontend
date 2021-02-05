import React from 'react';
import Main from './Main';
import WaitlistForm from './WaitlistForm';
import Services from '../Services';
import Nav from '../other/Nav';

export default function Page() {
  return (
    <div>
      <div className="position-absolute home-nav-div">
        <Nav />
      </div>
      <Main />
      <div className="row" id="waitlist-form">
        <div className="col"></div>
        <div className="col">
          <WaitlistForm />
        </div>
      </div>
      <Services />
    </div>
  );
}
