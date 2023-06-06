import { Grid, Paper, Typography } from "@mui/material";

export default function Hero({ item }) {
	return (
		<Paper
			elevation={3}
			sx={{
				"&:before": {
					content: "''",
					position: "absolute",
					zIndex: "1v",
					backgroundImage: `url(${item.url})`,
					filter: "brightness(60%)",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundPosition: "center",
					height: "60vh",
					width: "100%",
					borderRadius: "30px",
				},
				position: "relative",
				borderRadius: "30px",
			}}
		>
			<Grid
				container
				alignItems="center"
				height="60vh"
				sx={{ position: "relative", zIndex: "2" }}
			>
				<Grid item xs={12} md={6} ml={3}>
					<Typography
						variant="h3"
						component="h1"
						fontWeight="bold"
						color="white"
					>
						Periksa Kesehatan Tanamanmu!
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
}
