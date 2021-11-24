import Image from 'next/image';
import { Button, Typography, Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog'
import Loader from 'components/Loader';
import Player from 'hooks/usePlayer/Player';
import { useState } from 'react';


type Props = {
  player?: Player
};

function Content({ activateAndClose }: { activateAndClose: () => void }) {
  return (
    <Stack
      alignItems='center'
      mx={8}
      my={4}
      maxWidth={350}
    >
      <Typography variant='h2' mb={5}>Almost there!</Typography>
      <Typography variant='body' mb={3} textAlign='center'>Make sure you select "MusicVerse" as the device you are connected to on your spotify app</Typography>
      <Image
        alt="Spotify device: MusicVerse"
        src="/spotify-device-connection.png"
        width={154}
        height={45}
      />
      <Typography variant='body' my={5}>And click on the button below:</Typography>
      <Button variant='outlined' onClick={activateAndClose}>Enjoying your music!</Button>
    </Stack>
  )
}

export default function Start({ player }: Props) {
  const [open, setOpen] = useState(true);
  const activateAndClose = () => {
    player?.activate();
    setOpen(false);
  }

  return (
    <Dialog onClose={activateAndClose} open={open}>
      {
        player
        ? <Content activateAndClose={activateAndClose} />
        : <Loader />
      }
    </Dialog>
  )
}