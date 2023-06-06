import "@/styles/globals.css";
import { Container } from "@mui/material";

export default function App({ Component, pageProps }) {
	return (
		<Container maxWidth="xs">
			<Component {...pageProps} />
		</Container>
	);
}
