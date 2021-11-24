import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { serialize } from 'cookie';
import config from 'config.json';
import { withSession } from 'infrastructure/session';

const { client_id, client_secret, redirect_uri } = config.spotify;

type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export default withSession(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state } = req.query;
  
  if (state !== req.session.state) {
    return res.status(403).end();
  }
  // todo: Move it to infrastructure
  const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  const body = new URLSearchParams();
  body.set('code', code as string);
  body.set('redirect_uri', redirect_uri);
  body.set('grant_type', 'authorization_code');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body,
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  if (response.status !== 200) {
    await response.body?.pipe(res);
    return res.end();
  }

  const tokenResponse = (await response.json()) as TokenResponse;

  req.session.spotify = {
    accessToken: tokenResponse.access_token,
    refreshToken: tokenResponse.refresh_token,
  };
  
  res.setHeader('Set-Cookie', [
    serialize('spotify', tokenResponse.access_token, {
      path: '/',
      sameSite: true,
      secure: true,
      maxAge: tokenResponse.expires_in,
    }),
    serialize('spotify.refresh', 'true', {
      path: '/',
      sameSite: true,
      secure: true,
    }),
  ]);

  // Session save should always be after custom cookies
  await req.session.save();
  

  res.redirect('/');
});