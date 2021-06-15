/** @jsxImportSource @emotion/react */
import { useState } from "react";
import tw from "twin.macro";

// components
import DatePicker from "./DatePicker";
import ModalForm from "./ModalForm";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const setModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <div tw="bg-gray-100 max-w-7xl mx-auto px-4 py-5 sm:px-6">
        <div tw="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div tw="ml-4 mt-4">
            {/* <h3 tw="text-lg leading-6 font-medium text-gray-900">Job Postings</h3> */}
            <DatePicker />
          </div>
          <div tw="ml-4 mt-4 flex-shrink-0">
            <button
              type="button"
              tw="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
        </div>
      </div>
      <ModalForm
        header="Create Category Group"
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default Header;
