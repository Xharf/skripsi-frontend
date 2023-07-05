require("dotenv").config()

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Stack,
	Typography,
} from "@mui/material"
import WestRoundedIcon from "@mui/icons-material/WestRounded"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Webcam from "react-webcam"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import Link from "next/link"
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded"
import FlipCameraAndroidRoundedIcon from "@mui/icons-material/FlipCameraAndroidRounded"
import CameraRoundedIcon from "@mui/icons-material/CameraRounded"
import { useRouter } from "next/router"
import { IdentifyContext } from "../../../context/IdentifyContext"

// export async function getServerSideProps(context) {
// 	const data = JSON.parse(context.query.data)
// }

export default function Identify() {
	const { setIdentify } = useContext(IdentifyContext)
	const webcamRef = useRef(null)
	const capture = useCallback(() => {
		return webcamRef.current.getScreenshot()
	}, [webcamRef])
	const router = useRouter()
	const [facingMode, setFacingMode] = useState("environment")

	const videoConstraints = {
		height: 720,
		facingMode: facingMode,
	}

	function changeFacingMode() {
		if (facingMode == "environment") {
			setFacingMode("user")
		} else {
			setFacingMode("environment")
		}
	}

	const handleIdentify = () => {
		const imageSrc = capture()
		fetch(`${process.env.BASE_URL}/predict64`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ imgbase64: imageSrc }),
		})
			.then((response) => response.json())
			.then(({ data }) => {
				const diseasesOutput = data.class.reduce((result, item, index) => {
					const existingItem = result.find((obj) => obj.name === item)
					if (existingItem) {
						existingItem.score.push(data.score[index])
					} else {
						result.push({ name: item, score: [data.score[index]] })
					}
					return result
				}, [])

				setIdentify({
					imgSrc: `data:image/jpeg;base64,${data.image}`,
					diseases: diseasesOutput,
					originalImage: imageSrc,
				})

				router.push({
					pathname: "/identify/result",
					// query: JSON.stringify({
					// 	imgSrc: `data:image/jpeg;base64,${data.image}`,
					// 	diseases: diseasesOutput,
					// }),
				})
			})
			.catch((error) => {
				console.error("Error:", error)
			})
	}

	return (
		<>
			<Box mt={2}>
				<Link href="/">
					<Stack direction="row" alignItems="center" gap={1}>
						<ArrowBackRoundedIcon></ArrowBackRoundedIcon>
						<Typography variant="body1" fontSize={24} fontWeight="bold">
							Back to home
						</Typography>
					</Stack>
				</Link>
			</Box>
			<Box position="relative">
				<Box sx={{ borderRadius: "20px", mt: 3 }}>
					<Webcam
						style={{ borderRadius: "20px" }}
						ref={webcamRef}
						audio={false}
						width="100%"
						screenshotFormat="image/jpeg"
						videoConstraints={videoConstraints}
					>
						{/* {({ getScreenshot }) => {
						setInterval(() => {
							const imageSrc = getScreenshot({ width: 1080, height: 1080 });
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
					}} */}
					</Webcam>
				</Box>
				<Container
					sx={{
						position: { xs: "absolute", lg: "relative" },
						my: { xs: 3, lg: 1 },
						bottom: 0,
					}}
				>
					<Grid container justifyContent="center">
						<Grid
							item
							xs={4}
							container
							justifyContent="center"
							alignContent="center"
						>
							<Avatar sx={{ width: 60, height: 60 }}>
								<CollectionsRoundedIcon></CollectionsRoundedIcon>
							</Avatar>
						</Grid>
						<Grid item xs={4} container justifyContent="center">
							<Avatar
								sx={{ width: 80, height: 80, bgcolor: "#83BD75" }}
								onClick={() => handleIdentify()}
							>
								<CameraRoundedIcon sx={{ fontSize: 40 }}></CameraRoundedIcon>
							</Avatar>
						</Grid>
						<Grid
							item
							xs={4}
							container
							justifyContent="center"
							alignContent="center"
						>
							<Avatar
								sx={{ width: 60, height: 60 }}
								onClick={() => changeFacingMode()}
							>
								<FlipCameraAndroidRoundedIcon></FlipCameraAndroidRoundedIcon>
							</Avatar>
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	)
}
