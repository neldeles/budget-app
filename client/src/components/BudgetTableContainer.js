/** @jsxImportSource @emotion/react */
import tw from "twin.macro";

import Table from "./BudgetTable";

const TableContainer = ({ data }) => {
  const categoryGroups = data.map((item) => item["category_group_name"]);
  const uniqueCategoryGroups = [...new Set(categoryGroups)];

  return (
    <div>
      {uniqueCategoryGroups.map((catGrp) => {
        const filteredData = data.filter(
          (entry) => entry["category_group_name"] === catGrp
        );
        return <Table key={catGrp} data={filteredData} tableName={catGrp} />;
      })}
    </div>
  );
};

export default TableContainer;
