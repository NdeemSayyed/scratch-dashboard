// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
// import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
// Overview page components
import Header from "layouts/profile/components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import API from "../../backend";
// import { useState } from "react";
// import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
// import profilesListData from "layouts/profile/data/profilesListData";

function Overview() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// const [confirmPassword, setConfirmPassword] = useState("");

	useEffect(() => {
		console.log("from use effect");
		axios.get(`${API}/admin/get-profile?email=admin%40mail.com`).then((res) => {
			console.log("hey");
			console.log(res.data.name, res.data.email);
			setName(res.data.name);
			setEmail(res.data.email);
		});
	}, []);
	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox mb={2} />
			<Header>
				<Grid item>
					<MDBox height="100%" mt={0.5} lineHeight={1}>
						<MDTypography variant="h5" fontWeight="medium">
							UPDATE YOUR PROFILE
						</MDTypography>
					</MDBox>
				</Grid>
				<MDBox mt={5} mb={3}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
							<Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
							<ProfileInfoCard
								title="profile information"
								info={{
									fullName: name,
									email: email,
								}}
								action={{ route: "", tooltip: "Edit Profile" }}
								shadow={false}
							/>
							<Divider orientation="vertical" sx={{ mx: 0 }} />
						</Grid>
						{/* <Grid item xs={12} xl={4}>
              <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
            </Grid> */}
					</Grid>
				</MDBox>
			</Header>
			<Footer />
		</DashboardLayout>
	);
}

export default Overview;
