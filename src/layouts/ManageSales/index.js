// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SaleTable from "examples/Tables/DataTable/SaleTable.js";

// Data
import salesData from "layouts/ManageSales/data/salesData";
import MDButton from "components/MDButton";

function Tables() {
	const { columns, rows } = salesData();

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox pt={6} pb={3}>
				<Grid container spacing={6}>
					<Grid item xs={12}>
						<Card>
							<MDBox
								mx={2}
								mt={-3}
								py={3}
								px={2}
								variant="gradient"
								bgColor="info"
								borderRadius="lg"
								coloredShadow="info"
								sx={{ display: "flex", justifyContent: "space-between" }}>
								<MDTypography variant="h6" color="white">
									Manage Sales
								</MDTypography>
								<MDButton href="/admin/add-sale">Add New Sale</MDButton>
							</MDBox>
							<MDBox pt={3}>
								<SaleTable
									table={{ columns, rows }}
									isSorted={false}
									entriesPerPage={false}
									showTotalEntries={false}
									noEndBorder
								/>
							</MDBox>
						</Card>
					</Grid>
				</Grid>
			</MDBox>
		</DashboardLayout>
	);
}

export default Tables;
