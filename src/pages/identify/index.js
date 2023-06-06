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

const videoConstraints = {
	width: 256,
	height: 256,
	facingMode: "user",
};

export default function Identify() {
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
							const imageSrc = getScreenshot({ width: 256, height: 256 });
							console.log(imageSrc);
						}, 1000);
					}}
				</Webcam>
			</Box>
			<Typography variant="body1" fontSize={20} mt={3} mb={1}>
				Instance yang terdeteksi:
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
