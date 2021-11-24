import type { NextApiRequest, NextApiResponse } from 'next';
import { analysis } from 'infrastructure/audio';
import { withSession } from 'infrastructure/session';


export default withSession(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const accessToken = req.session.spotify?.accessToken;
  console.log(req.session);
  if (!accessToken) {
    return res.status(401).end();
  }

  res.send(await analysis(accessToken, req.query.id as string));
});