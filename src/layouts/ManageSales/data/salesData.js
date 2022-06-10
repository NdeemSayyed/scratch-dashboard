/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import API from "../../../backend";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dataa() {
  const [data, setData] = useState([]);

  const MyCell = ({ value }) => {
    return (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={value}
          color={
            value === "private"
              ? "success"
              : value === "seed"
              ? "primary"
              : "warning"
          }
          variant="gradient"
          size="sm"
        />
      </MDBox>
    );
  };

  useEffect(() => {
    axios(`${API}/sale/get-all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const Date = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
    </MDBox>
  );
  const Percent = ({ title }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {title}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      {
        Header: "Sale Period",
        accessor: (d) => d.saleType,
        align: "center",
        Cell: (d) => MyCell(d),
      },
      {
        Header: "Cliff Open Date",
        accessor: (d) => {
          return (
            <Date
              title={
                new window.Date(d.cliffOpenDate).toDateString() +
                new window.Date(d.cliffOpenDate).toTimeString()
              }
            />
          );
        },
        align: "center",
      },
      {
        Header: "Percent",
        accessor: (d) => {
          return <Percent title={d.percentage + "%"} />;
        },
        align: "left",
      },
    ],

    rows: data,
  };
}
