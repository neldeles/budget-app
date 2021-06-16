/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import { useSelector } from "react-redux";

import BudgetTable from "./BudgetTable";

const BudgetTableContainer = () => {
  const { budget, categoryGroup } = useSelector((state) => state);

  const uniqueCategoryGroups = categoryGroup.map((cat) => cat.name);

  return (
    <div>
      {uniqueCategoryGroups.map((catGrp) => {
        const filteredData = budget.filter(
          (entry) => entry["categoryGroupName"] === catGrp
        );
        return (
          <BudgetTable key={catGrp} data={filteredData} tableName={catGrp} />
        );
      })}
    </div>
  );
};

export default BudgetTableContainer;
