/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { PlusIcon as PlusIconSolid } from "@heroicons/react/solid";
import { PlusIcon as PlusIconOutline } from "@heroicons/react/outline";

import BudgetTable from "./BudgetTable";

import { selectCategoryGroupName } from "../reducers/categoryGroupReducer";

const BudgetTableContainer = () => {
  const budget = useSelector((state) => state.budget);

  const uniqueCategoryGroups = useSelector(selectCategoryGroupName);
  const budgetMemoized = useMemo(() => budget, [budget]);

  const columns = useMemo(
    () => [
      {
        Header: () => {
          return (
            <div tw="inline-flex items-center">
              <span>category</span>
              <button
                type="button"
                css={[
                  tw`inline-flex items-center ml-2 padding[0.1rem]`,
                  tw`border border-transparent rounded-full shadow-sm text-white bg-gray-400`,
                  tw`hover:bg-green-400`,
                  tw`focus:(outline-none ring-2 ring-offset-2 ring-green-500 bg-green-400)`,
                ]}
              >
                <PlusIconSolid tw="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          );
        },
        accessor: "category",
      },
      {
        Header: "budgeted",
        accessor: "budgeted",
      },
      {
        Header: "activity",
        accessor: "activity",
      },
      {
        Header: "available",
        accessor: "available",
      },
    ],
    []
  );

  return (
    <div>
      {uniqueCategoryGroups.map((catGrp) => {
        const filteredData = budgetMemoized.filter(
          (entry) => entry["categoryGroupName"] === catGrp
        );
        return (
          <BudgetTable
            key={catGrp}
            columns={columns}
            data={filteredData}
            tableName={catGrp}
          />
        );
      })}
    </div>
  );
};

export default BudgetTableContainer;
