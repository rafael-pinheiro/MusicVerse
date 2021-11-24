import { CircularProgress, Stack, Typography } from '@mui/material';

export default function Loader() {
  return (
    <Stack
      alignItems='center'
      m={10}
    >
      <CircularProgress size={100} />
      <Typography mt={10} variant='h4'>Just a second as we set things up!</Typography>
    </Stack>
  )
}