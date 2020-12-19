import React, { useState } from "react";
import { Tabs, Tab, Modal, Button, Dropdown } from "react-bootstrap";
import { Menu, X } from "react-feather";
import BookingTab from "./BookingTab";
import { DateRange } from 'react-date-range';
import moment from 'moment'

const MyBookings = () => {

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  const [dateFilter, setDateFilter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [verify, setVerify] = useState(false);
  const filterStartDate = (state[0].startDate).toString()
  const filterEndDate = state[0].endDate ? (state[0].endDate).toString() : null

  return (
    <>
      <div className="dg__account my-bookings-container">
        <div className="d-flex justify-content-between">
          <h1 className="heading">Bookings</h1>
          <Dropdown drop="left">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              <Menu size={25} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                <span onClick={() => setShowModal(true)}>Date Range</span>
                {dateFilter && <span className="cursor-pointer" onClick={() => setDateFilter(false)}><X size={25} className="ml-2" /></span>}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {dateFilter && <p><span className="cursor-pointer" onClick={() => setShowModal(true)}><b>{moment(filterStartDate).format('LL')} - {moment(filterEndDate).format('LL')}</b></span> <span className="cursor-pointer" onClick={() => setDateFilter(false)}><X size={25} className="mt-n1" /></span></p>}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Select Date Range</Modal.Title>
          </Modal.Header>
          <Modal.Body><div className="d-flex justify-content-center">
            <DateRange
              editableDateInputs={true}
              onChange={item => setState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={state}
            />
          </div>
            {(verify && (!filterStartDate || !filterEndDate)) && <p className="text-center text-danger">Please select start and end Date range</p>}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
          </Button>
            <Button variant="primary" onClick={() => {
              if (!filterStartDate || !filterEndDate) {
                return setVerify(true)
              } else {
                setDateFilter(true)
                setShowModal(false)
              }
            }}>
              Save
          </Button>
          </Modal.Footer>
        </Modal>
        <Tabs defaultActiveKey="completed">
          <Tab eventKey="pending" title="Pending">
            <BookingTab filterStartDate={filterStartDate} filterEndDate={filterEndDate} dateFilter={dateFilter} status="pending" />
          </Tab>
          <Tab eventKey="current" title="Current">
            <BookingTab filterStartDate={filterStartDate} filterEndDate={filterEndDate} dateFilter={dateFilter} status="current" />
          </Tab>
          <Tab eventKey="upcoming" title="Upcoming">
            <BookingTab filterStartDate={filterStartDate} filterEndDate={filterEndDate} dateFilter={dateFilter} status="upcoming" />
          </Tab>
          <Tab eventKey="completed" title="Completed">
            <BookingTab filterStartDate={filterStartDate} filterEndDate={filterEndDate} dateFilter={dateFilter} status="completed" />
          </Tab>
          <Tab eventKey="cancelled" title="Cancelled">
            <BookingTab filterStartDate={filterStartDate} filterEndDate={filterEndDate} dateFilter={dateFilter} status="cancelled" />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default MyBookings;
