// @mui material components
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { useState } from "react";

function Cover() {
	const [values, setValues] = useState({
		email: "",
		password: "",
	});
	const { email, password } = values;
	const handleChange = (event) => {
		setValues({
			...{ email, password },
			[event.target.name]: event.target.value,
		});
	};

	// eslint-disable-next-line no-unused-vars
	const onSubmit = (e) => {
		e.preventDefault();
		// console.log(values);
		console.log(email);
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(email, password),
		};

		fetch(
			"https://danerob-api.herokuapp.com/admin/update-password",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
			})
			.catch((error) => console.log("error", error));
	};
	return (
		<CoverLayout coverHeight="50vh" image={bgImage}>
			<Card>
				<MDBox
					variant="gradient"
					bgColor="info"
					borderRadius="lg"
					coloredShadow="success"
					mx={2}
					mt={-3}
					py={2}
					mb={1}
					textAlign="center">
					<MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
						Reset Password
					</MDTypography>
				</MDBox>
				<MDBox pt={4} pb={3} px={3}>
					<MDBox component="form" role="form">
						<MDBox mb={4}>
							<MDInput
								onChange={(e) => handleChange(e)}
								value={email}
								type="email"
								name="email"
								label="Email"
								variant="standard"
								fullWidth
							/>
						</MDBox>
						<MDBox mb={4}>
							<MDInput
								onChange={(e) => handleChange(e)}
								value={password}
								type="password"
								name="password"
								label="Change Password"
								variant="standard"
								fullWidth
							/>
						</MDBox>
						<MDBox mt={6} mb={1}>
							<MDButton
								onClick={(e) => onSubmit(e)}
								variant="gradient"
								color="info"
								fullWidth>
								reset
							</MDButton>
						</MDBox>
					</MDBox>
				</MDBox>
			</Card>
		</CoverLayout>
	);
}

export default Cover;
