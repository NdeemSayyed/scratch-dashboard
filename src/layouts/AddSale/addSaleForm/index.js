// export default Overview;
// @mui material components
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import API from "../../../backend";
import axios from "axios";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { Card } from "@mui/material";
// import Icon from "@mui/material/Icon";
import AddIcon from "@mui/icons-material/Add";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { toast } from "react-toastify";
// Overview page components
import Header from "layouts/AddSale/components/Header";

function Overview() {
	const [formValues, setFormValues] = useState([{ openDate: "", percent: "" }]);

	let handleFormChange = (i, e) => {
		let newFormValues = [...formValues];
		newFormValues[i][e.target.name] = e.target.value;
		setFormValues(newFormValues);
	};

	let addFormFields = () => {
		setFormValues([...formValues, { openDate: "", percent: "" }]);
	};

	let removeFormFields = (i) => {
		let newFormValues = [...formValues];
		newFormValues.splice(i, 1);
		setFormValues(newFormValues);
	};

	const [isLoading, setIsLoading] = useState(false);
	const [values, setValues] = useState({
		salePeriod: "Select Sale Type",
		// openDate: "",
		// percent: "",
	});
	const { salePeriod } = values;
	const handleChange = (event) => {
		setValues({
			...{ salePeriod },
			[event.target.name]: event.target.value,
		});
	};
	const onSubmit = (e) => {
		e.preventDefault();

		setIsLoading(true);
		for (let i = 0; i <= formValues.length; i++) {
			// let sale = formValues[i];
			// sale.salePeriod
			let payload = {
				saleType: values.salePeriod,
				cliffOpenDate: new Date(formValues[i].openDate).toISOString(),
				percentage: parseInt(formValues[i].percent),
			};

			axios
				.post(`${API}/sale/create-sale`, payload)
				.then((res) => {
					if (res.status == 201) {
						setIsLoading(false);
						toast.success("Sale created successfully");
					}
					console.log(res.data);
				})
				.catch((err) => {});
			// console.log(values, formValues);
			console.log(payload);
		}
	};

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox mb={2} />
			<Header>
				<MDBox mt={5} mb={3}>
					<Grid container spacing={1} sx={{ textAlign: "center" }}>
						<Grid item xs={12} md={12} xl={12}>
							<Card>
								<MDBox pt={4} pb={3} px={8}>
									<MDBox>
										<MDBox mb={2}>
											<FormControl type="text" variant="standard" fullWidth>
												<Select
													labelId="demo-simple-select-standard-label"
													id="demo-simple-select-standard"
													onChange={(e) => handleChange(e)}
													value={values.salePeriod}
													name="salePeriod"
													placeholder="Select Sale Type"
													fullWidth
													sx={{
														textAlign: "left",
														fontSize: "13px",
														paddingTmop: "5px",
													}}>
													<MenuItem value="Select Sale Type">
														Select Sale Type
													</MenuItem>
													<MenuItem value="seed">Seed</MenuItem>
													<MenuItem value="private">Private</MenuItem>
													<MenuItem value="public">Public</MenuItem>
												</Select>
											</FormControl>
										</MDBox>
										{formValues.map((e, index) => (
											<div key={index}>
												<MDBox mb={2}>
													<MDInput
														onChange={(e) => handleFormChange(index, e)}
														value={formValues.openDate}
														type="datetime-local"
														name="openDate"
														// label="Cliff Open Date"
														variant="standard"
														fullWidth
													/>
												</MDBox>
												<MDBox mb={2}>
													<MDInput
														onChange={(e) => handleFormChange(index, e)}
														value={formValues.percent}
														type="text"
														name="percent"
														label="Percent"
														variant="standard"
														fullWidth
													/>
												</MDBox>

												{index ? (
													<MDButton
														type="button"
														variant="gradient"
														size="small"
														color="info"
														className="button remove"
														onClick={() => removeFormFields(index)}>
														Remove
													</MDButton>
												) : null}
											</div>
										))}
										<MDBox mb={2} sx={{ textAlign: "right" }}>
											{/* <MDButton
												onClick={() => addFormFields()}
												// variant="gradient"
												size="large"
												color="info"> */}
											<IconButton
												onClick={() => addFormFields()}
												aria-label="add"
												color="info"
												size="large">
												<AddBoxIcon />
											</IconButton>
											{/* </MDButton> */}
										</MDBox>
										<MDBox mt={4} mb={1}>
											<MDButton
												onClick={(e) => onSubmit(e)}
												href="/admin/manage-sale"
												variant="gradient"
												color="info"
												large>
												Submit
											</MDButton>
										</MDBox>
									</MDBox>
								</MDBox>
							</Card>
						</Grid>
					</Grid>
				</MDBox>
			</Header>
			<Footer />
		</DashboardLayout>
	);
}

export default Overview;
