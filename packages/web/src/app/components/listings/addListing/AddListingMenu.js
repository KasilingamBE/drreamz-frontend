import React from 'react';
import { ChevronsRight } from 'react-feather';

const AddListingMenu = ({ activeIndex, setActiveIndex, spaceDetails }) => {
  const {
    qtyOfSpaces,
    sameSizeSpaces,
    motorcycle,
    compact,
    midsized,
    large,
    oversized,
    motorcycleSpaces,
    compactSpaces,
    midsizedSpaces,
    largeSpaces,
    oversizedSpaces
  } = spaceDetails;

  const spacesSum =
    parseInt(motorcycleSpaces) +
    parseInt(compactSpaces) +
    parseInt(midsizedSpaces) +
    parseInt(largeSpaces) +
    parseInt(oversizedSpaces);

  const spaceLabelActive =
    qtyOfSpaces > 0 &&
    (sameSizeSpaces ||
      (spacesSum == qtyOfSpaces &&
        (!motorcycle || (motorcycle && motorcycleSpaces > 0)) &&
        (!compact || (compact && compactSpaces > 0)) &&
        (!midsized || (midsized && midsizedSpaces > 0)) &&
        (!large || (large && largeSpaces > 0)) &&
        (!oversized || (oversized && oversizedSpaces > 0))));

  return (
    <div className="add-listing-menu">
      <ol>
        <li
          className={activeIndex === 1 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(1)}>
          Listing Type <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 2 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(2)}>
          Address
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 3 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(3)}>
          Property Type
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 4 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(4)}>
          Photos
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 5 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(5)}>
          Features
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 6 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(6)}>
          Parking Space Type
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 7 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(7)}
          style={{
            opacity: qtyOfSpaces > 0 ? 1 : 0.4,
            pointerEvents: qtyOfSpaces > 0 ? 'auto' : 'none'
          }}>
          Vehicle Size
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 8 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(8)}
          style={{
            opacity: spaceLabelActive ? 1 : 0.4,
            pointerEvents: spaceLabelActive ? 'auto' : 'none'
          }}>
          Spaces Labels
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 9 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(9)}>
          Space Details
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 10 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(10)}>
          Space Instruction
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 11 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(11)}>
          Timings
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 12 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(12)}>
          Notice Time
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 13 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(13)}>
          Advance booking time
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 14 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(14)}>
          Max Min Stay Time
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 15 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(15)}>
          Booking process
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 16 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(16)}>
          Charge Type
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 17 ? 'active-menu-item' : ' '}
          onClick={() => setActiveIndex(17)}>
          Pricing
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
      </ol>
    </div>
  );
};
export default AddListingMenu;
