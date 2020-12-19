import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import AddListingMenu from "./AddListingMenu";
import AddListingForm from "./AddListingForm";

const AddListing = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="add-listing-div">
      <h1>Add Listing</h1>
      <Row>
        <Col sm={3}>
          <AddListingMenu
            setActiveIndex={setActiveIndex}
            activeIndex={activeIndex}
          />
        </Col>
        <Col sm={8}>
          {activeIndex > 0 && (
            <AddListingForm
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          )}
        </Col>
      </Row>
      {/* {activeIndex === 0 ? (
        <AddListingMenu setActiveIndex={setActiveIndex} />
      ) : (
        <AddListingForm
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )} */}
    </div>
  );
};
export default AddListing;
