import { useState } from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, List } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

const MobileNav = () => {
	const nav = useNavigate();
	const [value, setValue] = useState(0);
	return (
		<Box sx={{ display: { xs: 'block', md: 'none' } }}>
			<BottomNavigation
				sx={{ backgroundColor: 'Background.paper', color: 'text.secondary' }}
				showLabels
				value={value}
				onChange={(e, value) => setValue(value)}
			>
				<BottomNavigationAction label="About" icon={<InfoIcon />} onClick={() => nav('/')} />
				<BottomNavigationAction label="Library" icon={<List />} onClick={() => nav('/library')} />
			</BottomNavigation>
		</Box>
	);
};

export default MobileNav;
