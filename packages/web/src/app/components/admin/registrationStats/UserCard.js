import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const UserCard = ({ user }) => {
  const start = new Date(user.createdAt);
  const end = new Date();
  const range = moment.range(start, end);
  const monthDiff = range.diff('months');
  const dayDiff = range.diff('days');
  const hourDiff = range.diff('hours');

  return (
    <Card>
      <Card.Body>
        <div className="d-md-flex justify-content-between align-items-center d-sm-block">
          <div className="d-flex">
            <div className="user-picture-div">
              <img
                className="user-picture"
                alt={user.name}
                src={
                  user.picture
                    ? user.picture
                    : 'https://parkyourselfbucket154227-dev.s3.amazonaws.com/public/default/default.jpg'
                }
              />
            </div>
            <div>
              <b>{user.name}</b>
              <br />
              <span>Bookings - {user.bookings}</span> <br />
              <span>Spaces - {user.listings}</span> <br />
            </div>
          </div>
          <div className="d-flex justify-content-center justify-content-justify-content-md-end">
            {monthDiff <= 0 ? (dayDiff <= 0 ? hourDiff : dayDiff) : monthDiff}
            {monthDiff <= 0 ? (dayDiff <= 0 ? ' hours ago' : ' day ago') : ' month ago'}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default connect()(UserCard);
