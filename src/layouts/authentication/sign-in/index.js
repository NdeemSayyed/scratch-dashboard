import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import API from "../../../backend";
// @mui material components
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import Dashboard from "layouts/dashboard";
import axios from "axios";

function Basic() {
	useEffect(() => {
		localStorage.clear();
	}, []);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(false);
	const [errMsg, setErrMsg] = useState("");
	const logindetails = { email, password };

	const navigate = useNavigate();
	function handleChange(event) {
		setEmail(event.target.value);
	}
	function handleChangeone(event) {
		setPassword(event.target.value);
	}
	async function onSubmit(event) {
		event.preventDefault();
		console.log(email, password);

		try {
			const response = await axios.post(
				`${API}/admin/login`,
				JSON.stringify({ email, password }),
				{
					headers: { "Content-Type": "application/json" },
					// withCredentials: true,
				}
			);
			if (!success) {
				navigate("/admin/dashboard");
			}
			console.log(JSON.stringify(response?.data));

			const accessToken = response?.data?.accessToken;
			localStorage.setItem("token", response?.data?.accessToken);
			localStorage.setItem("email", email);
			console.log("email is", email);
			setEmail("");
			setPassword("");
			setSuccess(true);
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 400) {
				setErrMsg("Invalid Credentialials");
				setSuccess(false);
			} else {
				setErrMsg("Login failed");
			}
			console.log(err);
		}
		console.log(success);
	}

	return (
		<>
			{success ? (
				<Dashboard />
			) : (
				<BasicLayout image={bgImage}>
					<Card>
						<MDBox
							variant="gradient"
							bgColor="success"
							borderRadius="lg"
							coloredShadow="success"
							mx={2}
							mt={-3}
							p={2}
							mb={1}
							textAlign="center">
							<MDTypography
								variant="h4"
								fontWeight="medium"
								color="white"
								mt={1}>
								Admin login
							</MDTypography>
							<MDTypography
								className={errMsg ? "errMsg" : "text-danger"}
								color="warning"
								warning="true"
								aria-live="assertive">
								{errMsg}
							</MDTypography>
						</MDBox>
						<MDBox pt={4} pb={3} px={3}>
							<MDBox component="form" role="form">
								<MDBox mb={2}>
									<MDInput
										onChange={(event) => handleChange(event)}
										value={email}
										type="email"
										name="email"
										label="Email"
										required
										fullWidth
									/>
								</MDBox>
								<MDBox mb={2}>
									<MDInput
										onChange={(event) => handleChangeone(event)}
										value={password}
										type="password"
										label="Password"
										name="password"
										required
										fullWidth
									/>
								</MDBox>

								<MDBox mt={4} mb={1}>
									<MDButton
										onClick={(event) => onSubmit(event)}
										href="/admin/dashboard"
										variant="gradient"
										color="success"
										fullWidth>
										sign in
									</MDButton>
								</MDBox>
								<MDBox mt={3} mb={1} textAlign="center">
									<MDTypography variant="button" color="text">
										Forgot password?{" "}
										<MDTypography
											component={Link}
											to="/admin/editProfile"
											variant="button"
											color="success"
											fontWeight="medium"
											textGradient>
											Reset password
										</MDTypography>
									</MDTypography>
								</MDBox>
							</MDBox>
						</MDBox>
					</Card>
				</BasicLayout>
			)}
		</>
	);
}

export default Basic;
