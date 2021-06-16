/** @jsxImportSource @emotion/react */
import "twin.macro";

import { useField } from "../hooks";

import categoryGroupService from "../services/categoryGroup";

const ModalForm = ({ header, showModal, setShowModal }) => {
  const categoryGroup = useField("categoryGroup", "text");

  const { clearState, ...categoryGroupFieldProps } = categoryGroup;

  const createCatGroup = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { token: localStorage.token },
      };

      const data = {
        name: categoryGroup.value,
      };

      const response = await categoryGroupService.create(data, config);

      console.log(response);

      clearState();
    } catch (err) {
      console.error("modalForm", err.message);
    }
  };

  return (
    <>
      {showModal ? (
        <div tw="bg-white max-w-7xl mx-auto shadow sm:rounded-lg">
          <div tw="px-4 py-5 sm:p-6">
            <h3 tw="text-lg leading-6 font-medium text-gray-900">{header}</h3>
            <form onSubmit={createCatGroup} tw="mt-5 sm:flex sm:items-center">
              <div tw="w-full sm:max-w-xs">
                <label htmlFor="email" tw="sr-only">
                  Category Group
                </label>
                <input
                  {...categoryGroupFieldProps}
                  tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder=""
                />
              </div>
              <button
                type="cancel"
                tw="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => setShowModal()}
              >
                Cancel
              </button>
              <button
                type="submit"
                tw="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ModalForm;
