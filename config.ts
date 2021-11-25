const getEnvVar = (name: string): string => {
  if (!process.env[name]) {
    throw new Error(`Missing environment variable ${name}. Either add a ".env" file or set it on deployment`);
  }

  return process.env[name] as string;
}

const config = {
  spotify: {
    client_id: getEnvVar('spotify_client_id'),
    client_secret: getEnvVar('spotify_client_secret'),
    redirect_uri: getEnvVar('spotify_redirect_uri'),
  },
  session: {
    secret: getEnvVar('session_secret'),
  },
};

export default config;