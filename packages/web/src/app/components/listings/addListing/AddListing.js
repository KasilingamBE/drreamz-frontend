import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateTempListing } from '@parkyourself-frontend/shared/redux/actions/tempListing';
import { useGetAllFormOptions } from '@parkyourself-frontend/shared/hooks/listings';
import AddListingMenu from './AddListingMenu';
import AddListingForm from './AddListingForm';

const AddListing = ({ edit = false }) => {
  const { activeIndex, spaceDetails } = useSelector(({ tempListing }) => tempListing);
  const dispatch = useDispatch();
  const setActiveIndex = (index) => dispatch(updateTempListing({ activeIndex: index }));
  useGetAllFormOptions(JSON.stringify({ formName: 'addListing' }));
  return (
    <div className="add-listing-div">
      <h1>{edit ? 'Update' : 'Add'} Listing</h1>
      <Row>
        <Col sm={3}>
          <AddListingMenu
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
            spaceDetails={spaceDetails}
          />
        </Col>
        <Col sm={8}>{activeIndex > 0 && <AddListingForm />}</Col>
      </Row>
    </div>
  );
};
export default AddListing;
