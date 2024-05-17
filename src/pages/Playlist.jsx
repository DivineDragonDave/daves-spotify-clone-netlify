import React, { useEffect, useState, useCallback } from 'react';
import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import SongTable from '../components/songTable/SongTable';

const Playlist = ({ spotifyApi, token }) => {
	const [playlistInfo, setPlaylistInfo] = useState();
	const [songs, setSongs] = useState([]);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const { id } = useParams();
	const [status, setStatus] = useState({ isLoading: true, isError: null });

	const formatSongs = useCallback(
		(items) => {
			return items.map((item, i) => {
				const { track } = item;
				track.contextUri = `spotify:playlist:${id}`;
				track.position = i;
				return track;
			});
		},
		[id]
	);

	const handleWindowResize = useCallback(() => {
		setWindowWidth(window.innerWidth);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, [handleWindowResize]);

	useEffect(() => {
		const getData = async () => {
			setStatus({ isLoading: true, isError: null });
			try {
				const playlistDetails = await spotifyApi.getPlaylist(id);
				setPlaylistInfo({
					images: playlistDetails.body.images.map((image) => image.url),
					name: playlistDetails.body.name
				});
				const { items } = playlistDetails.body.tracks;
				// format songs
				const formattedSongs = formatSongs(items);
				setSongs(formattedSongs);
			} catch (e) {
				console.error(e);
				setStatus({ isLoading: false, isError: e });
			}
		};

		getData().finally(() => {
			setStatus({ isLoading: false, isError: null });
		});
	}, [id, formatSongs, spotifyApi, token]);

	const getImageSrc = () => {
		if (!playlistInfo?.images) return '';
		const images = playlistInfo.images;

		if (windowWidth > 1024) return images[1] || images[0];
		else if (windowWidth > 900) return images[1] || images[0];
		else return images[0];
	};

	return (
		<Box id="playlist__page" sx={{ backgroundColor: 'Background.paper', flex: 1, overflowY: 'auto' }}>
			<Box
				p={{ xs: 3, mb: 4 }}
				sx={{
					width: '100%',
					background: 'linear-gradient(0deg, #121212 0%, #1bd76060 100%)',
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: { xs: 'flex-start', md: 'flex-end', xl: 'center' },
					gap: 3,
					boxSizing: 'border-box',
					flexDirection: { xs: 'column', md: 'row' }
				}}
			>
				{status.isLoading ? (
					<Skeleton
						variant="square"
						sx={{ width: { xs: '100%', md: 235 }, height: { xs: '100%', md: 235 } }}
					/>
				) : (
					<Avatar
						src={getImageSrc()}
						variant="square"
						alt={playlistInfo?.name}
						sx={{ boxShadow: 15, width: { xs: '100%', md: 235 }, height: { xs: '100%', md: 235 } }}
					/>
				)}
				<Box>
					<Typography sx={{ fontSize: 12, fontWeight: 'bold', color: 'text.primary' }}>playlist</Typography>
					{status.isLoading ? (
						<Skeleton variant="text" sx={{ fontSize: { xs: 42, md: 72 }, width: 200 }} />
					) : (
						<Typography sx={{ fontSize: { xs: 42, md: 72 }, fontWeight: 'bold', color: 'text.primary' }}>
							{playlistInfo?.name}
						</Typography>
					)}
				</Box>
			</Box>

			<SongTable songs={songs} loading={status.isLoading} spotifyApi={spotifyApi} />
		</Box>
	);
};

export default Playlist;
