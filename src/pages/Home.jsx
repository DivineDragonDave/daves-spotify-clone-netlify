import { Box, Button } from '@mui/material';

const Home = () => {
	return (
		<Box
			sx={{
				height: '100vh',
				flex: 1,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				gap: 5,
				marginTop: -14
			}}
		>
			<img src="/DR.ico" alt="DR" style={{ maxWidth: '30%', maxHeight: '30%' }} />
			<img src="/IMG_5412.jpg" alt="David Ribbfors" style={{ maxWidth: '50%', maxHeight: '50%' }} />
			<Button size="large" variant="contained" href="tel:0704450115">
				Ring mig
			</Button>
		</Box>
	);
};

export default Home;
