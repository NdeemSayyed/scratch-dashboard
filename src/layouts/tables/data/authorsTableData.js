/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import axios from "axios";
// import { DataTable } from "../../../examples/Tables/DataTable/index.js";
import React from "react";
import { Link } from "react-router-dom";
import API from "../../../backend";
import Datatable from "../../../examples/Tables/DataTable/index";

const { useEffect, useState } = React;
export default function AuthorTadle() {
	const { onSearchChange } = Datatable;
	// const [searchRecord, setSearchRecord]= useState([]);

	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get(`${API}/user/get-all`)
			.then((res) => {
				if (res.status === 200) {
					const sampleTest = [];
					for (let i = 0; i < res.data.length; i += 1) {
						sampleTest.push({
							useraddress: <Author address={res.data[i].userAddress} />,
							// amount: <Job title={res.data[i].amount} />,
							tx: (
								<MDTypography
									component="a"
									href="#"
									variant="caption"
									color="text"
									fontWeight="medium">
									<a
										href={`https://rinkeby.etherscan.io/tx/${res.data[i].transactionHash}`}
										target="_blank"
										rel="noreferrer">
										{res.data[i].transactionHash
											? res.data[i].transactionHash.substring(0, 10)
											: ""}
										...
									</a>
								</MDTypography>
							),
							transactionTime: (
								<MDBox ml={-1}>
									<MDBadge
										badgeContent={res.data[i].transactionTime}
										color={
											res.data[i].saleType === "private"
												? "success"
												: res.data[i].saleType === "seed"
												? "primary"
												: "warning"
										}
										variant="gradient"
										size="sm"
									/>
								</MDBox>
							),
							// action: (
							// 	<MDTypography
							// 		component="a"
							// 		href="#"
							// 		variant="caption"
							// 		color="text"
							// 		fontWeight="medium">
							// 		Edit
							// 	</MDTypography>
							// ),
						});
					}
					setData(sampleTest);
				}
				if (!res.data) {
					res.data = onSearchChange;
				}
				let bat = onSearchChange;

				console.log(res.data);
				console.log(bat);
			})
			.catch((err) => console.log(err));
	}, []);
	const Author = ({ address }) => (
		<MDBox display="flex" alignItems="center" lineHeight={1}>
			{/* <MDAvatar src={image} name={address} size="sm" /> */}
			<MDBox ml={2} lineHeight={1}>
				<MDTypography display="block" variant="button" fontWeight="medium">
					{address}
				</MDTypography>
			</MDBox>
		</MDBox>
	);

	const Job = ({ title }) => (
		<MDBox lineHeight={1} textAlign="left">
			<MDTypography
				display="block"
				variant="caption"
				color="text"
				fontWeight="medium">
				{title}
			</MDTypography>
		</MDBox>
	);

	return {
		columns: [
			{
				Header: "User address",
				accessor: "useraddress",
				width: "40%",
				align: "left",
				// Filter: DataTable,
			},
			// { Header: "amount", accessor: "amount", align: "left" },
			// { Header: "sale period", accessor: "sale", align: "center" },
			{ Header: "Transaction Time", accessor: "transactionTime", align: "center" },
			// { Header: "remaining claim", accessor: "remaining", align: "center" },
			{ Header: "transaction", accessor: "tx", align: "center" },
			// { Header: "action", accessor: "action", align: "center" },
		],

		rows: data,
	};
}