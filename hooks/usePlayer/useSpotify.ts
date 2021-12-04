import EventEmitter from 'events';
import { AudioAnalysis } from 'infrastructure/audio/types';
import { useEffect, useState } from 'react';
import Player from './Player';

const useScript = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);
};

type PlaybackState = {
  track: string;
  paused: boolean;
  position: number;
  duration: number;
  updateTime: number;
}

class SpotifyPlayer extends EventEmitter implements Player  {
  private accessToken: string;
  private player?: Spotify.Player;
  private previousTrackId = '';

  constructor(accessToken: string) {
    super();
    this.accessToken = accessToken;
    this.setupSpotify();
  }

  private setupSpotify() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new Spotify.Player({
        name: 'MusicVerse',
        getOAuthToken: cb => cb(this.accessToken),
        volume: 1,
      });

      this.bindEvents();
      this.player.connect();
    };
  }

  private bindEvents() {
    if (!this.player) {
      throw new Error('Spotify player not initialized');
    }
    const on = this.player.addListener.bind(this.player);
    const errorEmitter = ({ message }: { message: string }) => console.error(message);

    on('ready', () => this.emit('ready'));
    on('player_state_changed', this.updateState.bind(this))
    
    // Errors
    on('not_ready', errorEmitter.bind(this, {message: 'Device has gone offline'}));
    on('initialization_error', errorEmitter.bind(this));
    on('authentication_error', errorEmitter.bind(this));
    on('account_error', errorEmitter.bind(this));
  }

  private updateState(state: Spotify.PlaybackState) {
    if (state === null) {
      return;
    }
    const trackId = state.track_window.current_track.id;
    
    if (trackId && trackId !== this.previousTrackId) {
      this.previousTrackId = trackId;
      this.fetchAnalysis(trackId);
    }

    this.emit('update', {
      track: trackId || '',
      paused: state.paused,
      position: state.position / 1000, // ms to second
    });
  }

  async fetchAnalysis(trackId: string) {
    const analysis: AudioAnalysis = await (await fetch(`/api/spotify/analysis/${trackId}`)).json();
    this.emit('analysis', analysis);
  }

  disconnect() {
    this.player?.disconnect();
  }

  activate() {
    this.player?.activateElement();
  }

}

export default function useSpotify(accessToken: string) {
  const [player, setPlayer] = useState<Player>();
  useEffect(() => {
    const newPlayer = new SpotifyPlayer(accessToken);
    setPlayer(newPlayer);

    return () => newPlayer.disconnect();
  }, [accessToken]);
  useScript();

  return player;
}
