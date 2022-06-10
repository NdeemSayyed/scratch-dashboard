import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const [value, setValue] = useState(globalFilter);
  return (
    <>
      <MDBox width="12rem" ml="auto">
        <MDInput
          placeholder="Search..."
          value={value || ""}
          size="small"
          fullWidth
          onChange={(e) => {
            setValue(e.target.value);
            setGlobalFilter(e.target.value);
          }}
        />
      </MDBox>
    </>
  );
};

export default GlobalFilter;
