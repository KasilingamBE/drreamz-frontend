import React from 'react';
import { timeTo12HrFormat } from '@parkyourself-frontend/shared/utils/time';
import { ArrowRight, Clock } from 'react-feather';

export default function StartEndTimePicker({
  day = '',
  startHour = 9,
  startMinute = 30,
  endHour = 9,
  endMinute = 30,
  showTimeModal
}) {
  return (
    <div className="d-flex justify-content-around align-items-lg-center mb-4 mt-1">
      <div className="text-center">
        Start Time <br />
        <span
          className="cursor-pointer font-weight-bold"
          onClick={() => showTimeModal(day, true, startHour, startMinute)}>
          <Clock size={20} className="mt-n1 mr-1" />
          {timeTo12HrFormat(startHour, startMinute)}
        </span>
      </div>
      <ArrowRight size={20} />
      <div className="text-center">
        End Time <br />
        <span
          className="cursor-pointer font-weight-bold"
          onClick={() => showTimeModal(day, false, endHour, endMinute)}>
          <Clock size={20} className="mt-n1 mr-1" />
          {timeTo12HrFormat(endHour, endMinute)}
        </span>
      </div>
    </div>
  );
}
