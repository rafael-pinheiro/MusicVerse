import type { NextApiRequest, NextApiResponse } from 'next';
import config from 'config';
import { withSession } from 'infrastructure/session';

const generateRandomString = () => Math.random().toString(36).substring(2, 15);
const { client_id, redirect_uri } = config.spotify;

export default withSession(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const state = generateRandomString();
  req.session.state = state;
  await req.session.save();
  
  const scope = 'streaming user-read-email user-read-private';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});
