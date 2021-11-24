const config = {
  "spotify": {
    "client_id": process.env.spotify_client_id,
    "client_secret": process.env.spotify_client_secret,
    "redirect_uri": process.env.spotify_redirect_uri
  },
  session: {
    secret: process.env.session_secret
  }
};

export default config;