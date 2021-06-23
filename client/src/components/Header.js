/** @jsxImportSource @emotion/react */
import { useState } from "react";
import tw from "twin.macro";
import { useSelector } from "react-redux";

// components
import DatePicker from "./DatePicker";
import PopupForm from "./PopupForm";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const runningBudget = useSelector((state) => state.dashboard.runningBudget);

  const setModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div tw="bg-gray-100 max-w-7xl mx-auto px-4 py-5 sm:px-6">
        <div tw="-ml-4 -mt-4 flex justify-center sm:justify-between items-center flex-wrap sm:flex-nowrap">
          <div tw="mt-4 flex md:mt-0 ml-4">
            {/* <h3 tw="text-lg leading-6 font-medium text-gray-900">Job Postings</h3> */}
            <DatePicker />
            <button
              type="button"
              tw="relative inline-flex items-center ml-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={setModal}
            >
              Category Group
              <svg
                xmlns="http://www.w3.org/2000/svg"
                tw="ml-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <div tw="flex justify-end flex-col mr-4 mt-6 sm:mt-2">
            <h2 tw="text-2xl font-bold leading-7 text-green-600 sm:text-3xl sm:truncate">
              Php {runningBudget}{" "}
            </h2>
            <p tw="text-sm font-medium text-gray-500 italic text-center">
              to be budgeted
            </p>
          </div>
        </div>
      </div>
      <PopupForm
        header="Create Category Group"
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default Header;
