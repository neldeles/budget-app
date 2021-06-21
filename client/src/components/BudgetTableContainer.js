/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

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

  const handleModal = (categoryGroupId) => {
    setActiveCategoryGroup(categoryGroupId);
    setOpen(true);
  };

  return (
    <div>
      {uniqueCategoryGroups.map((categoryGroup) => {
        const filteredData = budgetMemoized.filter(
          (entry) => entry["categoryGroupName"] === categoryGroup.name
        );
        return (
          <BudgetTable
            key={categoryGroup.id}
            categoryGroupId={categoryGroup.id}
            data={filteredData}
            tableName={categoryGroup.name}
            handleModal={handleModal}
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
