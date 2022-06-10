import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
import API from "../../../backend";
// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";

// @mui icons
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
	// const [rememberMe, setRememberMe] = useState(false);
	useEffect(() => {
		localStorage.clear();
	}, []);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const logindetails = { email, password };
	const navigate = useNavigate();
	function handleChange(event) {
		// logind = event.target.value;
		setEmail(event.target.value);
	}
	function handleChangeone(event) {
		setPassword(event.target.value);
	}
	function onSubmit(event) {
		event.preventDefault();
		console.log(email, password);
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(logindetails),
		};

		fetch(`${API}/admin/login`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				localStorage.setItem("token", result?.accessToken);
				navigate("/admin/dashboard");
				console.log(result);
			})
			.catch((error) => console.log("error", error));
	}

	return (
		<BasicLayout image={bgImage}>
			<Card>
				<MDBox
					variant="gradient"
					bgColor="info"
					borderRadius="lg"
					coloredShadow="info"
					mx={2}
					mt={-3}
					p={2}
					mb={1}
					textAlign="center">
					<MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
						Admin login
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
								fullWidth
							/>
						</MDBox>
						{/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
						<MDBox mt={4} mb={1}>
							<MDButton
								onClick={(event) => onSubmit(event)}
								href="/admin/dashboard"
								variant="gradient"
								color="info"
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
									color="info"
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
	);
}

export default Basic;
