import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import NavItem from '../Naviteam/NavItem';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import NavPlaylist from '../NavPlaylist/NavPlaylist';

const SideNav = ({ spotifyApi, token }) => {
	const [playlists, setplaylists] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getPlaylists() {
			if (!spotifyApi) return;

			const data = await spotifyApi.getUserPlaylists();
			setplaylists(data.body.items);
			setLoading(false);
		}
		getPlaylists();
	}, [spotifyApi, token]);

	const renderPlaylists = () => {
		if (loading) {
			return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => <NavPlaylist key={i} loading={loading} />);
		}

		return playlists.map((playlist, i) => (
			<NavPlaylist name={playlist.name} id={playlist.id} loading={loading} key={i} />
		));
	};

	return (
		<Box
			sx={{
				bgcolor: 'background.default',
				width: 230,
				height: '100%',
				display: { xs: 'none', md: 'flex' },
				flexDirection: 'column'
			}}
		>
			<Box p={3}>
				<img src="/Spotify_Logo.png" width={'75%'} alt="Spotify" />
			</Box>
			<NavItem name="About" Icon={InfoIcon} target="/" />
			<Box px={3} py={1}>
				<Divider sx={{ backgroundColor: '#ffffff40' }} />
			</Box>
			<Box sx={{ overflowY: 'auto', flex: 1 }}>{renderPlaylists()}</Box>
		</Box>
	);
};

export default SideNav;
