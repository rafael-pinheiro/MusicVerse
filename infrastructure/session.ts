import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";

const sessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "myapp_cookiename",
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