require("dotenv").config();

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Grid,
	Typography,
} from "@mui/material";
import WestRoundedIcon from "@mui/icons-material/WestRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";

const videoConstraints = {
	width: 256,
	height: 256,
	facingMode: "environment",
};

export default function Identify() {
	const [src, setSrc] = useState(null);

	return (
		<>
			<Box sx={{ borderRadius: "20px", mt: 3 }}>
				<Webcam
					style={{ borderRadius: "20px" }}
					audio={false}
					width="100%"
					videoConstraints={videoConstraints}
					screenshotFormat="image/jpeg"
				>
					{({ getScreenshot }) => {
						setInterval(() => {
							const imageSrc = getScreenshot();
							fetch(`${process.env.BASE_URL}/predict64`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({ imgbase64: imageSrc }),
							})
								.then((response) => response.blob())
								.then((blob) => {
									setSrc(URL.createObjectURL(blob));
								})
								.catch((error) => {
									console.error("Error:", error);
								});
							return () => clearInterval(requestData);
						}, 10000);
					}}
				</Webcam>
			</Box>
			<Typography variant="body1" fontSize={20} mt={3}>
				Instance yang terdeteksi:
			</Typography>
			<Grid container sx={{ borderRadius: "20px", justifyContent: "center" }}>
				<Grid item xs={10}>
					<img style={{ borderRadius: "20px" }} src={src} width="100%"></img>
				</Grid>
			</Grid>

			<Typography variant="body1" fontSize={20} mt={3} mb={1}>
				Daftar:
			</Typography>

			<Accordion sx={{ "&.MuiPaper-root": { borderRadius: "30px" } }}>
				<AccordionSummary
					sx={{ borderRadius: "30px", background: "#83BD75", color: "black" }}
					expandIcon={<ExpandMoreIcon sx={{ color: "black" }} />}
				>
					<Typography>Accordion 1</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Button
				variant="contained"
				startIcon={<WestRoundedIcon />}
				sx={{
					background: "#83BD75",
					borderRadius: "30px",
					mt: 5,
					mb: 5,
					textTransform: "none",
					color: "black",
				}}
				fullWidth
				size="large"
			>
				<Grid height={60} container justifyContent="center" alignItems="center">
					<Grid item xs={12}>
						<Typography variant="body1" fontSize={18}>
							Sudah selesai? Kembali
						</Typography>
					</Grid>
				</Grid>
			</Button>
		</>
	);
}
