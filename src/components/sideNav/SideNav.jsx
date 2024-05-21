import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import NavItem from '../NavItem/NavItem';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import NavPlaylist from '../NavPlaylist/NavPlaylist';

const SideNav = ({ spotifyApi, token }) => {
	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log('useEffect triggered');
		console.log('spotifyApi:', spotifyApi);
		console.log('token:', token);

		async function getPlaylists() {
			if (!spotifyApi || !token) {
				console.log('spotifyApi or token is not defined');
				return;
			}

			try {
				spotifyApi.setAccessToken(token[0]); // Sätt access token här
				console.log('Fetching playlists...');
				const data = await spotifyApi.getUserPlaylists();
				console.log('Playlists data:', data); // Lägg till logg här
				setPlaylists(data.body.items);
			} catch (error) {
				console.error('Error fetching playlists:', error);
			} finally {
				setLoading(false);
			}
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
			<NavItem name="Home" Icon={HomeIcon} target="/" />
			<Box px={3} py={1}>
				<Divider sx={{ backgroundColor: '#ffffff40' }} />
			</Box>
			<Box sx={{ overflowY: 'auto', flex: 1 }}>{renderPlaylists()}</Box>
		</Box>
	);
};

export default SideNav;
