export type Beat = {
  start: number;
  end: number;
};

export type Segment = {
  start: number;
  end: number;
  pitches: number[];
  timbre: number[];
};

export type AudioAnalysis = {
  beats: Beat[];
  segments: Segment[];
};