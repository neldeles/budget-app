/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

import "./DatePicker";
import DatePicker from "./DatePicker";

const Header = () => {
  return (
    <div tw="bg-gray-100 px-4 py-5 sm:px-6">
      <div tw="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
        <div tw="ml-4 mt-4">
          {/* <h3 tw="text-lg leading-6 font-medium text-gray-900">Job Postings</h3> */}
          <DatePicker />
        </div>
        <div tw="ml-4 mt-4 flex-shrink-0">
          <button
            type="button"
            tw="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create new job
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
