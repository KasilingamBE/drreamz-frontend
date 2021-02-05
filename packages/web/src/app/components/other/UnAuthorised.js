import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { setRedirectPath } from '../../redux/actions/redirect';

const UnAuthorised = ({ dispatch, redirectPath }) => {
  const handleRedirect = () => {
    dispatch(setRedirectPath(redirectPath));
  };

  return (
    <div className="mt-3 py-5">
      <h2 className="text-center">Please Login to access this page!</h2>
      <div className="d-flex justify-content-center errorPageContentWrap">
        <Link onClick={handleRedirect} href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default connect()(UnAuthorised);
