/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import { useMemo, useState } from "react";
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

  const [open, setOpen] = useState(false);
  const [activeCategoryGroup, setActiveCategoryGroup] = useState(null);

  const budgetMemoized = useMemo(() => budget, [budget]);

  const columns = useMemo(
    () => [
      {
        Header: (props) => {
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
                onClick={() => handleModal(props.initialState)}
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

  const handleModal = (categoryGroupId) => {
    setActiveCategoryGroup(categoryGroupId);
    setOpen(true);
  };

  return (
    <div>
      {uniqueCategoryGroups.map((categoryGroup) => {
        const filteredData = budgetMemoized.filter(
          (entry) => entry["categoryGroupId"] === categoryGroup.id
        );
        return (
          <BudgetTable
            key={categoryGroup.id}
            categoryGroupId={categoryGroup.id}
            columns={columns}
            data={filteredData}
            tableName={categoryGroup.name}
          />
        );
      })}
      <ModalForm
        open={open}
        setOpen={setOpen}
        categoryGroupId={activeCategoryGroup}
        title="Create Category"
        confirmButtonValue="Submit"
        isPositive
      />
    </div>
  );
};

export default BudgetTableContainer;
