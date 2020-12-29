import Link from 'next/link';
import React, { useState } from 'react';
import { Card, Button, Spinner } from 'react-bootstrap';
import { Star } from 'react-feather';
import { connect } from 'react-redux';

const UserCard = ({ user, handleToggle }) => {
  const [disabled, setDisabled] = useState(false);
  const handleToggle2 = async (username, status) => {
    setDisabled(true);
    await handleToggle(username, status);
    setDisabled(false);
  };
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
              <Link href={`/admin/users/${user.username}`}>
                <a className="text">
                  <b>{user.name}</b>
                </a>
              </Link>
              <br />
              <span>Bookings - {user.bookings}</span> <br />
              <span>Spaces - {user.listings}</span> <br />
            </div>
          </div>
          <div className="d-flex justify-content-center justify-content-justify-content-md-end">
            <div className="text-right">
              <p className="m-0 mb-1">
                <Star size={18} className="mt-n1 mr-1 text-warning" />
                4.7 (17)
              </p>
              {user.active ? (
                <Button
                  size="sm"
                  variant="dark"
                  onClick={() => handleToggle2(user.username, false)}>
                  {disabled ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    'Block'
                  )}
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleToggle2(user.username, true)}>
                  {disabled ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    'Unblock'
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default connect()(UserCard);
