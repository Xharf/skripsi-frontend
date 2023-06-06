import Hero from "@/components/Hero";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import Carousel from "react-material-ui-carousel";
const inter = Inter({ subsets: ["latin"] });
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
export default function Home() {
	let item = [
		{
			url: "./images/hero/hero1.jpg",
			alt: "Daun hero1",
		},
		{
			url: "./images/hero/hero2.jpg",
			alt: "Daun hero2",
		},
		{
			url: "./images/hero/hero3.jpg",
			alt: "Daun hero3",
		},
	];
	return (
		<>
			<Box mt={2} mb={3}>
				<Carousel>
					{item.map((item, i) => (
						<Hero key={i} item={item} />
					))}
				</Carousel>
			</Box>
			<Typography variant="body1" fontSize={20}>
				Scan daun tanaman yang berbeda-beda untuk menguji kemampuan model ML
				yang digunakan
			</Typography>

			<Button
				variant="contained"
				endIcon={<EastRoundedIcon />}
				sx={{
					background: "#83BD75",
					borderRadius: "30px",
					mt: 5,
					mb: 5,
					textTransform: "none",
					color: "black",
				}}
				fullWidth
			>
				<Grid container py={1} spacing={2}>
					<Grid item xs={4}>
						<Grid
							container
							alignContent="center"
							height={60}
							sx={{ background: "white" }}
							justifyContent="center"
							borderRadius="20px"
						>
							<Grid item>
								<CameraAltRoundedIcon
									sx={{ color: "#979797", fontSize: 40 }}
								></CameraAltRoundedIcon>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Grid
							container
							justifyContent="space-around"
							height={60}
							alignContent="center"
						>
							<Grid item>
								<Typography variant="body1" fontSize={18}>
									Izinkan akses kamera{" "}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Button>
		</>
	);
}
