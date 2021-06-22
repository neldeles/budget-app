/** @jsxImportSource @emotion/react */
import { Fragment, useRef } from "react";
import { useField } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import tw from "twin.macro";

// Reducers
import { addBudgetCategory } from "../reducers/budgetReducer";

// Selectors
import { selectDashboardDate } from "../reducers/dashboardReducer";

const ModalForm = ({
  open,
  setOpen,
  title,
  description,
  categoryGroupId,
  confirmButtonValue,
  isPositive,
}) => {
  const categoryInput = useField("categoryName", "text");
  const { clearState, ...categoryFieldProps } = categoryInput;

  const inputFieldRef = useRef(null);

  const dispatch = useDispatch();

  const currDate = useSelector(selectDashboardDate);

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: categoryInput.value,
        date: currDate,
        category_group_id: categoryGroupId,
      };
      dispatch(addBudgetCategory(payload));
      clearState();
      setOpen(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCancel = () => {
    clearState();
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={inputFieldRef}
        static
        tw="fixed z-10 inset-0 overflow-y-auto"
        open={open}
        onClose={setOpen}
      >
        <div tw="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay tw="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            tw="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div tw="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div tw="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  tw="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  <span tw="sr-only">Close</span>
                  <XIcon tw="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div tw="sm:flex md:flex-col sm:items-start">
                <div tw="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    tw="text-lg leading-6 font-medium text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div tw="mt-2">
                    <p tw="text-sm text-gray-500">{description}</p>
                  </div>
                </div>
                <div tw="mt-1 sm:ml-4 sm:w-3/4">
                  <input
                    ref={inputFieldRef}
                    {...categoryFieldProps}
                    tw="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="example category"
                    required
                  />
                </div>
              </div>
              <div tw="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  css={[
                    tw`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 sm:ml-3 sm:w-auto sm:text-sm`,
                    tw`text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2`,
                    isPositive &&
                      tw`bg-green-600 text-white hover:bg-green-700 focus:ring-green-500`,
                    !isPositive &&
                      tw`bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`,
                  ]}
                  onClick={handleConfirm}
                >
                  {confirmButtonValue}
                </button>
                <button
                  type="button"
                  tw="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalForm;
