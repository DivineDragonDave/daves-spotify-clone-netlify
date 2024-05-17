import { Slider, Stack, Typography, IconButton } from '@mui/material';
import { VolumeDown, VolumeUp, VolumeOff } from '@mui/icons-material';
import { useState } from 'react';

const PlayerVolume = ({ player }) => {
	const [volume, setVolume] = useState(50);
	const [isMuted, setIsMuted] = useState(false);
	const [previousVolume, setPreviousVolume] = useState(50);

	const handleVolumeChange = async (value) => {
		try {
			await player.setVolume(value / 100);
			setVolume(value);
			if (value > 0) {
				setIsMuted(false);
				setPreviousVolume(value);
			}
		} catch (e) {
			console.error(e);
		}
	};

	const toggleMute = async () => {
		if (isMuted || volume === 0) {
			await handleVolumeChange(previousVolume || 50);
		} else {
			setPreviousVolume(volume);
			await handleVolumeChange(0);
			setIsMuted(true);
		}
	};

	return (
		<Stack direction={'row'} spacing={2} alignItems={'center'} sx={{ width: 150, color: 'text.secondary' }}>
			<IconButton sx={{ color: 'text.primary' }} onClick={toggleMute} aria-label="mute">
				{volume === 0 || isMuted ? <VolumeOff /> : volume < 50 ? <VolumeDown /> : <VolumeUp />}
			</IconButton>
			<Slider
				sx={{
					'& .MuiSlider-track': {
						height: 5
					},
					'& .MuiSlider-rail': {
						height: 5
					},
					'& .MuiSlider-thumb': {
						width: 16,
						height: 16,
						'&:hover': {
							boxShadow: '0px 0px 0px 6px rgba(27, 215, 96, 0.16)'
						},
						'&.Mui-active': {
							boxShadow: '0px 0px 0px 9px rgba(27, 215, 96, 0.16)'
						}
					}
				}}
				min={0}
				max={100}
				step={1}
				value={isMuted ? 0 : volume}
				onChange={(e, v) => {
					if (isMuted) {
						setIsMuted(false);
					}
					setVolume(v);
				}}
				onChangeCommitted={async (e, v) => {
					if (!isMuted) {
						await handleVolumeChange(v);
					} else {
						await handleVolumeChange(previousVolume);
					}
				}}
			/>
			<Typography sx={{ fontSize: 12, textAlign: 'center' }}> {volume}% </Typography>
		</Stack>
	);
};

export default PlayerVolume;
