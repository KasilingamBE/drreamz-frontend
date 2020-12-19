import React, { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { connect } from "react-redux";
import { deleteTempListing } from "../../../redux/actions/tempListing";
import {
  addListingLocal,
  updateListingLocal,
} from "../../../redux/actions/user";
import ListingService from "../../../services/listing.service";

const AddListingHeader = ({
  saveAndExitHandler,
  onBackButtonPress,
  onNextButtonPress,
  activeIndex,
  tempListing,
  userData,
}) => {
  const [createListing] = useMutation(ListingService.CREATE_LISTING);
  const [updateListing] = useMutation(ListingService.UPDATE_LISTING);
  const [disabled, setDisabled] = useState(false);

  const onSubmitHandler = async () => {
    try {
      setDisabled(true);
      await ListingService.addListingService(
        tempListing,
        createListing,
        updateListing,
        userData,
        addListingLocal,
        updateListingLocal
      );
      deleteTempListing();
      setDisabled(false);
      // if (tempListing.edit) {
      //   navigation.navigate('MyListingsScreen');
      // } else {
      //   navigation.navigate('SpaceOwnerDashboard');
      // }
      // navigation.navigate("MyListingsScreen");
    } catch (error) {
      console.log(error);
      setDisabled(false);
      alert("Something Went wrong!", error.message);
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
          >
            Back
          </Button>
          {activeIndex < 18 && (
            <Button
              className="mr-2"
              variant="success"
              onClick={onNextButtonPress}
            >
              Next
            </Button>
          )}
          <Button variant="dark" onClick={saveAndExitHandler}>
            Save & Exit
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ tempListing, auth }) => ({
  tempListing,
  userData: auth.authenticated ? auth.data.attributes : null,
});
export default connect(mapStateToProps, {
  deleteTempListing,
  addListingLocal,
  updateListingLocal,
})(AddListingHeader);
