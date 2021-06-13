/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

const Table = ({ cols, data }) => {
  return (
    <div tw="flex flex-col">
      <div tw="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div tw="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div tw="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table tw="min-w-full divide-y divide-gray-200">
              <thead tw="bg-gray-50">
                <tr>
                  {cols.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      tw="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                  <th scope="col" tw="relative px-6 py-3">
                    <span tw="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, itemIdx) => (
                  <tr
                    key={item.id}
                    css={[itemIdx % 2 === 0 ? tw`bg-white` : tw`bg-gray-50`]}
                  >
                    {cols.map((col) => (
                      <td
                        key={item[col]}
                        tw="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        {item[col]}
                      </td>
                    ))}

                    <td tw="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" tw="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
