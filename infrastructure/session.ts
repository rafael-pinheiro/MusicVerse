import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";
import config from 'config';

const sessionOptions = {
  password: config.session.secret as string,
  cookieName: "musicverse",
};

export function withSession(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

declare module "iron-session" {
  interface IronSessionData {
    state?: string;
    spotify?: {
      accessToken: string,
      refreshToken: string,
    }
  }
}