/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const Table = ({ data, tableName }) => {
  const cols = ["category", "budgeted", "activity", "available"];
  return (
    <div tw="flex flex-col mb-12">
      <div tw="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div tw="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <h3 tw="text-lg leading-6 font-medium text-gray-900 mb-6">
            {tableName}
          </h3>
          <div tw="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table tw="min-w-full divide-y divide-gray-200">
              <thead tw="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    tw="px-6 py-3 text-left items-center inline-flex text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <span tw="py-1">category</span>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        tw="ml-2 h-5 w-5 hover:text-green-400"
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
                  </th>
                  <th
                    scope="col"
                    tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    budgeted
                  </th>
                  <th
                    scope="col"
                    tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    activity
                  </th>
                  <th
                    scope="col"
                    tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    available
                  </th>
                  <th scope="col" tw="relative px-6 py-3">
                    <span tw="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, itemIdx) => {
                  return (
                    <tr
                      key={item.id}
                      css={[itemIdx % 2 === 0 ? tw`bg-white` : tw`bg-gray-50`]}
                    >
                      {cols.map((col) => {
                        return (
                          <td
                            key={col}
                            tw="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          >
                            {item[col]}
                          </td>
                        );
                      })}

                      <td tw="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" tw="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
