// import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { toast } from "react-toastify";
import API from "../../../backend";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import React, { useState, useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { updateProfile } from "../../../actions/userActions";
// import Loading from "../../../components/Loading/Loading";
// import ErrorMessage from "../../../components/Loading/ErrorMessage";
import axios from "axios";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [oldPass, setOldPass] = useState();
	const { name, email, password } = values;
	useEffect(() => {
		setOldPass(values.password);
		axios.get(`${API}/admin/get-profile?email=admin%40mail.com`).then((res) => {
			setValues({
				name: res.data.name,
				email: res.data.email,
				password: "",
			});
		});
	}, []);
	const handleChange = (event) => {
		setValues({
			...{ name, email, password },
			[event.target.name]: event.target.value,
		});
	};
	// const [name, setName] = useState("");
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// const updateProfile = { email, password };
	// const navigate = useNavigate();

	// axios.get("https://danerob-api.herokuapp.com/admin/get-one?email=testadmin%40mail.com")

	function onSubmit(event) {
		event.preventDefault();
		let payload;
		console.log("old password", oldPass);
		console.log("new password", values.password);
		if (values.password !== oldPass) {
			console.log("password is changed", values.password);
			payload = {
				newName: values.name,
				newEmail: values.email,
				newPassword: values.password,
			};
		} else {
			console.log("password did not change");
			payload = {
				newName: values.name,
				newEmail: values.email,
			};
		}

		axios
			.patch(`${API}/admin/update-admin?email=admin%40mail.com`, payload)
			.then((res) => {
				if (res.status === 200) {
					toast.success("Details changed successfully");
				}
				console.log(res.data);
			})
			.catch((error) => console.log("error", error));
	}

	return (
		<CoverLayout image={bgImage}>
			<Card>
				<MDBox
					variant="gradient"
					bgColor="info"
					borderRadius="lg"
					coloredShadow="success"
					mx={2}
					mt={-3}
					p={3}
					mb={1}
					textAlign="center">
					<MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
						Edit Your Profile
					</MDTypography>
					<MDTypography display="block" variant="button" color="white" my={1}>
						Enter new datails
					</MDTypography>
				</MDBox>
				<MDBox pt={4} pb={3} px={3}>
					<MDBox component="form" role="form">
						{/* {loading && <Loading />}
						{success && (
							<ErrorMessage variant="success">
								Updated Successfully
							</ErrorMessage>
						)}
						{error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}

						<MDBox mb={2}>
							<MDInput
								type="text"
								name="name"
								onChange={(e) => handleChange(e)}
								value={name}
								label="Name"
								variant="standard"
								fullWidth
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								type="email"
								name="email"
								label="Email"
								onChange={(e) => handleChange(e)}
								value={email}
								variant="standard"
								fullWidth
							/>
						</MDBox>
						<MDBox mb={2}>
							<MDInput
								name="password"
								type="password"
								// disabled={true}
								label="Password"
								onChange={(e) => handleChange(e)}
								value={password}
								variant="standard"
								fullWidth
							/>
						</MDBox>
						{/* <MDBox mb={2}>
							<MDInput
								type="password"
								label="Confirm Password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								variant="standard"
								fullWidth
							/>
						</MDBox> */}
						<MDBox mt={4} mb={1}>
							<MDButton
								onClick={(event) => onSubmit(event)}
								variant="gradient"
								color="info"
								fullWidth>
								Set Changes
							</MDButton>
						</MDBox>
					</MDBox>
				</MDBox>
			</Card>
		</CoverLayout>
	);
}

export default Cover;
