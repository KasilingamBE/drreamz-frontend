import React from "react";
import { ChevronsRight } from "react-feather";

const AddListingMenu = ({ activeIndex, setActiveIndex }) => {
  return (
    <div className="add-listing-menu">
      <ol>
        <li
          className={activeIndex === 1 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(1)}
        >
          Listing Type <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 2 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(2)}
        >
          Address
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 3 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(3)}
        >
          Property Type
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 4 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(4)}
        >
          Photos
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 5 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(5)}
        >
          Features
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 6 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(6)}
        >
          Parking Space Type
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 7 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(7)}
        >
          Parking Space Size
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 8 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(8)}
        >
          Vehicle Size
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 9 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(9)}
        >
          Spaces Labeled?
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 10 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(10)}
        >
          Instruction
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 11 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(11)}
        >
          Instruction
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 12 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(12)}
        >
          Timings
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 13 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(13)}
        >
          Notice Time
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 14 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(14)}
        >
          Advance booking time
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 15 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(15)}
        >
          Max Stay Time
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 16 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(16)}
        >
          Booking process
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 17 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(17)}
        >
          Charge Type
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
        <li
          className={activeIndex === 18 ? "active-menu-item" : " "}
          onClick={() => setActiveIndex(18)}
        >
          Pricing
          <ChevronsRight className="add-listing-arrow" size={24} />
        </li>
      </ol>
    </div>
  );
};
export default AddListingMenu;
