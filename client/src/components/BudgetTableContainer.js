/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import { useMemo, useRef } from "react";
import { useSelector } from "react-redux";

import { PlusIcon as PlusIconSolid } from "@heroicons/react/solid";
import { PlusIcon as PlusIconOutline } from "@heroicons/react/outline";

// Components
import BudgetTable from "./BudgetTable";
import ModalForm from "./ModalForm";

// Reducers
import { selectCategoryGroupName } from "../reducers/categoryGroupReducer";
import category from "../services/category";

const BudgetTableContainer = () => {
  const budget = useSelector((state) => state.budget);
  const uniqueCategoryGroups = useSelector(selectCategoryGroupName);

  const budgetTableRef = useRef();

  const budgetMemoized = useMemo(() => budget, [budget]);

  const handleModal = () => {
    budgetTableRef.current.toggleVisibility();
  };

  const columns = useMemo(
    () => [
      {
        Header: (props) => {
          console.log("header props", props);
          return (
            <div tw="inline-flex items-center">
              <span>category</span>
              <button
                css={[
                  tw`inline-flex items-center ml-2 padding[0.1rem]`,
                  tw`border border-transparent rounded-full shadow-sm text-white bg-gray-400`,
                  tw`hover:bg-green-400`,
                  tw`active:(outline-none ring-2 ring-offset-2 ring-green-500 bg-green-400)`,
                  tw`focus-visible:(outline-none ring-2 ring-offset-2 ring-green-500)`,
                  tw`focus:(outline-none)`,
                ]}
                onClick={handleModal}
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
      {/* <ModalForm
        open={open}
        setOpen={setOpen}
        title="Create Category"
        confirmButtonValue="Submit"
        isPositive
      /> */}
      {uniqueCategoryGroups.map((categoryGroup) => {
        const filteredData = budgetMemoized.filter(
          (entry) => entry["categoryGroupName"] === categoryGroup.name
        );
        return (
          <BudgetTable
            key={categoryGroup.id}
            categoryGroupId={categoryGroup.id}
            columns={columns}
            data={filteredData}
            tableName={categoryGroup.name}
            ref={budgetTableRef}
          />
        );
      })}
    </div>
  );
};

export default BudgetTableContainer;
