import { Box, List, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PlaylistIteam from '../components/playListItem/PlaylistItem';

const Library = ({ token, spotifyApi }) => {
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

	const renderPlaylistItem = () => {
		if (loading) {
			return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => <PlaylistIteam loading={loading} key={i} />);
		}
		return playlists.map((playlists, i) => <PlaylistIteam key={i} loading={loading} {...playlists} />);
	};

	return (
		<Box
			id="Library"
			px={3}
			sx={{
				display: { xs: 'flex', md: 'none' },

				flex: 1,
				flexDirection: 'column',
				overflowY: 'auto'
			}}
		>
			<Typography px={2} py={2} sx={{ color: 'text.primary', fontSize: 30 }}>
				Library
			</Typography>
			<List>{renderPlaylistItem()}</List>
		</Box>
	);
};

export default Library;
