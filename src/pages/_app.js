import "@/styles/globals.css"
import { Container } from "@mui/material"
import { useState } from "react"
import { IdentifyContext } from "../../context/IdentifyContext"

export default function App({ Component, pageProps }) {
	const [identify, setIdentify] = useState(null)

	return (
		<Container maxWidth="xs">
			<IdentifyContext.Provider value={{ identify, setIdentify }}>
				<Component {...pageProps} />
			</IdentifyContext.Provider>
		</Container>
	)
}
