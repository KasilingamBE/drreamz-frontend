import React, { useState } from 'react';
import { Button, ProgressBar, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  useAddOneListing,
  CREATE_LISTING,
  UPDATE_LISTING
} from '@parkyourself-frontend/shared/hooks/listings';
import { deleteTempListing } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import {
  addListingLocal,
  updateListingLocal
} from '@parkyourself-frontend/shared/redux/actions/user';
import { useRouter } from 'next/router';

const AddListingHeader = ({
  saveAndExitHandler,
  onBackButtonPress,
  onNextButtonPress,
  activeIndex,
  tempListing,
  userData
}) => {
  const router = useRouter();
  const { handleSubmit } = useAddOneListing();
  const [disabled, setDisabled] = useState(false);

  const onSubmitHandler = async () => {
    try {
      setDisabled(true);
      await handleSubmit();
      setDisabled(false);
      router.push('/listings/my');
    } catch (error) {
      // console.log('error', error);
      setDisabled(false);
      alert('Something Went wrong!', error.message);
    }
  };

  return (
    <div className="add-listing-header">
      <div className="progress-bar-row">
        <ProgressBar now={activeIndex * 5.5} />
      </div>
      <div className="btn-row">
        <h4>{activeIndex}/18</h4>
        <div>
          <Button
            className="mr-2"
            variant="primary"
            onClick={onBackButtonPress}
            style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
            Back
          </Button>
          {activeIndex < 18 && (
            <Button
              className="mr-2"
              variant="success"
              onClick={onNextButtonPress}
              style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
              Next
            </Button>
          )}
          <Button
            variant="dark"
            onClick={onSubmitHandler}
            style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
            {disabled ? (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              'Save & Exit'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ tempListing, auth }) => ({
  tempListing,
  userData: auth.authenticated ? auth.data.attributes : null
});
export default connect(mapStateToProps, {
  deleteTempListing,
  addListingLocal,
  updateListingLocal
})(AddListingHeader);
