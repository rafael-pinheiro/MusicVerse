import type { NextApiRequest, NextApiResponse } from 'next';
import { analysis } from 'infrastructure/audio';
import { withSession } from 'infrastructure/session';


export default withSession(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessToken = req.session.spotify?.accessToken;
  
  if (!accessToken) {
    return res.status(401).end();
  }

  if (typeof req.query.id !== 'string') {
    return res.status(400).end();
  }

  try {
    res.send(await analysis(accessToken, req.query.id));
  } catch(error) {
    console.error(`Failed to fetch audio analysis: ${error}`);
    return res.status(500).end();
  }
});