import { Stack, Button, Typography } from "@mui/material";
import { FaSpotify } from 'react-icons/fa';


export default function Welcome() {
  return (
    <Stack
      alignItems='center'
      m={10}
    >
      <Typography variant='h1' mb={10}>
        Welcome to MusicVerse!
      </Typography>
      <Button
        variant="contained"
        endIcon={<FaSpotify />}
        onClick={() => window.location.href = '/api/spotify/authorize'}
        sx={{
          backgroundColor: '#1DB954',
          ':hover': {
            backgroundColor: '#1DB954',
          }
        }}
      >
        Login with Spotify
      </Button>
    </Stack>
  );
}