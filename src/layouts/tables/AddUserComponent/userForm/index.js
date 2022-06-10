/* eslint-disable import/named */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import API from "../../../../backend";
import Select from "@mui/material/Select";
// @mui material components
// import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
import { Card } from "@mui/material";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import axios from "axios";
import { toast } from "react-toastify";
// import CoverLayout from "layouts/authentication/components/CoverLayout";
// import { signin, authenticate } from "../../../authentication/index";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const { useEffect } = React;
function PlatformSettings() {
	const [allSales, setAllSales] = useState([]);
	const [sales, setSales] = useState([]);

	const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
		"ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
	);

	const tokenMintAdd = new PublicKey(
		"GmTLj7gpzXU1b7PfxKrF33ntcVmM21Pkw3vg453qTbgw"
	);

	const findAssociatedTokenAddress = async (
		walletAddress,
		tokenMintAddress
	) => {
		walletAddress = new PublicKey(walletAddress);
		const data = await PublicKey.findProgramAddress(
			[
				walletAddress.toBuffer(),
				TOKEN_PROGRAM_ID.toBuffer(),
				tokenMintAddress.toBuffer(),
			],
			SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
		);

		return data;
	};

	useEffect(() => {
		axios
			.get(`${API}/sale/get-all`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					setAllSales([...res.data]);
				}
			})
			.catch((err) => {});
	}, []);

	const [values, setValues] = useState({
		userAddress: "",
		userTokenAddress: "",
		Sale: "",
	});

	const [Amount, setAmount] = useState();

	// const onChange = (e) => {
	//   const re = /^[0-9\b]+$/;

	//   if (e.target.Amount === "" || re.test(e.target.Amount)) {
	//     setAmount({ [e.target.name]: e.target.Amount });
	//   }
	// };

	const { userAddress, userTokenAddress, Sale } = values;
	const handleChange = (event) => {
		setValues({
			...{ userAddress, userTokenAddress, Sale },
			[event.target.name]: event.target.value,
		});

		if (event.target.name == "Sale") {
			const salesType = event.target.value;
			const sc = allSales.filter((item) => item.saleType == salesType);
			setSales(sc);
		}
	};

	// eslint-disable-next-line no-unused-vars
	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(values, Amount);

		const salesType = values.Sale;
		const sc = allSales.filter((item) => item.saleType == salesType);

		let tokenAddress = await findAssociatedTokenAddress(
			values.userAddress,
			tokenMintAdd
		);

		if (tokenAddress[0]) {
			tokenAddress = tokenAddress[0].toString();
		} else {
			alert("Token Address not Found");
			return;
		}

		let scDates = sc.map((item) => {
			return {
				dates: Math.round(new Date(item.cliffOpenDate).getTime() / 1000),
				amount: item.percentage,
				cliffOpenDate: item.cliffOpenDate,
			};
		});

		scDates.forEach((item) => {
			const payload = {
				userAddress: values.userAddress,
				userTokenAddress: tokenAddress,
				saleType: values.Sale,
				amount: (Number(item.amount) / 100) * Number(Amount),
				totalAmount: Number(Amount),
				seed: null,
				claimDate: new Date(item.cliffOpenDate),
				transaction: null,
			};
			const payloadForVesting = {
				destinationToken: tokenAddress,
				destinationOwner: values.userAddress,
				amount: parseInt(Amount),
				schedules: [item],
			};

			axios
				.post(`${API}/createVesting`, payloadForVesting, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
				.then((res) => {
					payload.seed = res.data.seed;
					payload.transaction = res.data.tx;
					axios
						.post(`${API}/user/create-user`, payload, {
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						})
						.then((res) => {
							if (res.status === 201) {
								toast.success("User added successfully");
							}
							console.log(res.data);
						})
						.catch((err) => {});
				})
				.catch((err) => {});
		});
	};
	// const [followsMe, setFollowsMe] = useState(true);
	// const [answersPost, setAnswersPost] = useState(false);
	// const [mentionsMe, setMentionsMe] = useState(true);
	// const [newLaunches, setNewLaunches] = useState(false);
	// const [productUpdate, setProductUpdate] = useState(true);
	// const [newsletter, setNewsletter] = useState(false);
	return (
		<Card>
			<MDBox pt={4} pb={3} px={8}>
				<MDBox>
					<MDBox mb={2}>
						<MDInput
							onChange={(e) => handleChange(e)}
							value={userAddress}
							type="text"
							label="User Address"
							variant="standard"
							name="userAddress"
							fullWidth
						/>
					</MDBox>
					{/*     <MDBox mb={2}>
            <MDInput
              onChange={(e) => handleChange(e)}
              value={userTokenAddress}
              type="text"
              label="User Token Address"
              variant="standard"
              name="userTokenAddress"
              fullWidth
            />
          </MDBox> */}
					<MDBox mb={2}>
						<FormControl type="text" variant="standard" fullWidth>
							<InputLabel
								id="demo-simple-select-standard-label"
								type="text"
								label="Amount"
								variant="standard">
								Sale
							</InputLabel>
							<Select
								labelId="demo-simple-select-standard-label"
								id="demo-simple-select-standard"
								label="Sale"
								onChange={(e) => handleChange(e)}
								value={Sale}
								name="Sale"
								fullWidth
								sx={{ textAlign: "left", fontSize: "13px", paddingTop: "5px" }}>
								<MenuItem value="Select Sale Type">Select Sale Type</MenuItem>
								<MenuItem value="seed">Seed</MenuItem>
								<MenuItem value="private">Private</MenuItem>
								<MenuItem value="public">Public</MenuItem>

								{/* <MenuItem value="private">Private</MenuItem>
                <MenuItem value="public">Public</MenuItem> */}
							</Select>
						</FormControl>
					</MDBox>
					<MDBox mb={2}>
						<MDInput
							onChange={(e) => setAmount(e.target.value)}
							value={Amount}
							label="Amount"
							variant="standard"
							name="Amount"
							fullWidth
						/>
					</MDBox>
					{sales.length ? (
						<Table size="small" aria-label="a dense table">
							<TableBody>
								<TableRow>
									<TableCell>Cliff Date</TableCell>
									<TableCell align="right">Amount %</TableCell>
								</TableRow>
								{sales.map((row) => (
									<TableRow key={row.percentage}>
										<TableCell component="th" scope="row">
											{new window.Date(row.cliffOpenDate).toDateString()}
										</TableCell>
										<TableCell component="th" scope="row">
											{row.percentage}%
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						""
					)}
					<MDBox mt={4} mb={1}>
						<MDButton
							href="/admin/tables"
							variant="gradient"
							color="info"
							onClick={(e) => onSubmit(e)}
							large>
							Submit
						</MDButton>
					</MDBox>
				</MDBox>
			</MDBox>
		</Card>
	);
}

export default PlatformSettings;
