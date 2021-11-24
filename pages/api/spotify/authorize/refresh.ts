import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { withSession } from 'infrastructure/session';
import { refreshToken } from 'infrastructure/audio';

export default withSession(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.session.spotify?.refreshToken) {
    return res.status(401).end();
  }

  const tokenResponse = await refreshToken(req.session.spotify.refreshToken);

  req.session.spotify.accessToken = tokenResponse.access_token;
  req.session.save();
  
  res.setHeader('Set-Cookie', serialize('spotify', tokenResponse.access_token, {
      path: '/',
      sameSite: true,
      secure: true,
      maxAge: tokenResponse.expires_in,
  }));

  res.redirect('/');
});