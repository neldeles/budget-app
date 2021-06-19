/** @jsxImportSource @emotion/react */
import { useState } from "react";
import tw from "twin.macro";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import { useDispatch, useSelector } from "react-redux";

// Reducers
import { updateDashboardDate } from "../reducers/dashboardReducer";

// Selectors
import { selectDashboardDate } from "../reducers/dashboardReducer";

const moment = require("moment");

const DatePicker = () => {
  const currDate = useSelector(selectDashboardDate);

  const dispatch = useDispatch();

  const handleChange = (obj) => {
    dispatch(updateDashboardDate);
  };

  const renderInput = (props, openCalendar) => {
    const navigatePrevMonth = () => {
      const currMonth = props.value;
      const prevMonth = moment(currMonth, "MMM YYYY").subtract(1, "months");

      dispatch(updateDashboardDate(prevMonth));
    };

    const navigateNextMonth = () => {
      const currMonth = props.value;
      const nextMonth = moment(currMonth, "MMM YYYY").add(1, "months");

      dispatch(updateDashboardDate(nextMonth));
    };

    return (
      <div tw="inline-flex">
        <button
          href="#"
          tw="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={navigatePrevMonth}
        >
          <span tw="sr-only">Previous</span>
          <svg
            tw="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          type="button"
          tw="relative inline-flex justify-center w-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={openCalendar}
        >
          {props.value}
          <svg
            tw="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          href="#"
          tw="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={navigateNextMonth}
        >
          <span tw="sr-only">Next</span>
          <svg
            tw="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  };
  return (
    <div>
      <Datetime
        dateFormat="MMM YYYY"
        timeFormat={false}
        value={currDate}
        renderInput={renderInput}
        onChange={handleChange}
        closeOnSelect={true}
      />
    </div>
  );
};

export default DatePicker;
