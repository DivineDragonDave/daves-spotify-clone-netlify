import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import SideNav from '../sideNav/SideNav';
import { getAccessTokenFromStorage } from '../../utils/getAccessTokenFromStorage';
import { useEffect, useState } from 'react';
import Playlist from '../../pages/Playlist';
import Player from '../player/Player';
import MobileNav from '../mobilNav/MobileNav';
import Library from '../../pages/Library';

const Dashbord = ({ spotifyApi }) => {
	const token = useState(getAccessTokenFromStorage());

	useEffect(() => {
		const onMount = async () => {
			await spotifyApi.setAccessToken(token);
		};

		if (token) {
			onMount();
		}
	}, []);
	return (
		<Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
			<Box sx={{ flex: 1, overflow: 'auto', display: 'flex' }}>
				<SideNav spotifyApi={spotifyApi} token={token} />
				<Routes>
					<Route path="playlist/:id" element={<Playlist spotifyApi={spotifyApi} token={token} />} />
					<Route path="library" element={<div>{<Library spotifyApi={spotifyApi} token={token} />} </div>} />
					<Route path="/" element={<Home />} />
				</Routes>
			</Box>
			{token && <Player spotifyApi={spotifyApi} token={token} />}
			<MobileNav />
		</Box>
	);
};

export default Dashbord;
