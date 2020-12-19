import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ListingCardItem from './ListingCardItem';
import { ImLocation2, ImList2 } from 'react-icons/im';
import { GrClose } from 'react-icons/gr';

const ParkingsListView = ({ setListView,parkings }) => {

  return (
    <div className='find-parking-list'>
      <div className='control-btns'>
        <Button
          variant='outline-danger'
          onClick={() => {
            setListView(false);
          }}
        >
          <GrClose />
        </Button>
      </div>
      <div className='find-parking-list-wrapper'>
        {
          parkings.map((item) => <ListingCardItem {...item} />)
    }
      </div>
    </div>
  );
};

export default ParkingsListView;
