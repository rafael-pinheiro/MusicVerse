import { duration } from '@mui/material';
import config from 'config';
import { AudioAnalysis } from './types';

const { client_id, client_secret } = config.spotify;

const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const get = async (accessToken: string, url: string) => {
  console.log(accessToken);
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  
  return response.json();
};

const post = async <ResponseType>(data: Record<string, string>): Promise<ResponseType> => {
  const auth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  const body = new URLSearchParams();
  Object.keys(data).forEach((key: string) => {
    body.set(key, data[key]);
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body,
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return response.json();
}

type AnalysisResponse = {
  id: number;
  start: number;
  duration: number;
  pitches: number[];
  timbre: number[];
}

type Beat = {
  start: number;
  duration: number;
}

export const analysis = async (accessToken: string, id: string): Promise<AudioAnalysis> => {
  const analysis = await get(accessToken, `https://api.spotify.com/v1/audio-analysis/${id}`);
  
  return {
    beats: analysis.beats.map(({ start, duration }: Beat) => ({
      start,
      end: start + duration,
    })),
    segments: analysis.segments.map(({ start, duration, pitches, timbre}: AnalysisResponse) => ({
      start,
      end: start + duration,
      pitches,
      timbre,
    }))
  };
};

type RefreshTokenResponse = {
  access_token: string;
  expires_in: number;
};

export const refreshToken = async(refreshToken: string) => {
  return post<RefreshTokenResponse>({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
};