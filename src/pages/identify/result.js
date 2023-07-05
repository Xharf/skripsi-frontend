import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Typography,
} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { IdentifyContext } from "../../../context/IdentifyContext"
import { useRouter } from "next/router"
import Link from "next/link"
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"

export default function Result() {
	const router = useRouter()
	const { identify } = useContext(IdentifyContext)
	const [mode, setMode] = useState(1)
	const handleChange = (event) => {
		setMode(event.target.value)
	}

	useEffect(() => {
		if (identify == null) {
			router.push({
				pathname: "/identify",
			})
		}
	}, [])

	if (identify == null) {
		return null
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
			<Box sx={{ borderRadius: 15 }} mt={2}>
				<img src={mode === 1 ? identify.imgSrc : identify.originalImage}></img>
			</Box>
			<Grid container my={2} alignItems="center">
				<Grid item xs={5}>
					<Typography fontWeight="bold">Mode display</Typography>
				</Grid>
				<Grid item xs={7}>
					<FormControl fullWidth size="small">
						<InputLabel>Mode</InputLabel>
						<Select label="Mode" value={mode} onChange={handleChange}>
							<MenuItem value={1}>
								<Typography variant="body2">Gambar Tersegmentasi</Typography>
							</MenuItem>
							<MenuItem value={2}>Gambar Asli</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<Typography variant="h1" fontSize={24} fontWeight="bold">
				Hasil Segmentasi
			</Typography>
			<Box py={2}>
				{identify.diseases.map((disease) => {
					return (
						<Accordion key={disease.name}>
							<AccordionSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>{disease.name}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{disease.score.map((score, idx) => {
									return (
										<Grid
											container
											key={disease.name + idx}
											justifyContent="space-between"
										>
											<Grid item xs={6}>
												<Typography>Segmentasi ke {idx + 1}</Typography>
											</Grid>
											<Grid item xs={6} textAlign="end">
												<Typography>{score.toPrecision(5)}</Typography>
											</Grid>
										</Grid>
									)
								})}
							</AccordionDetails>
						</Accordion>
					)
				})}
			</Box>
		</>
	)
}
