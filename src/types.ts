export interface VideoData {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    blurDataURL: string;
  };
  viewCount: number;
}

export interface ScoreData {
  userId: string;
  score: number;
}

export interface ChannelData {
  id: string;
  subscriberCount: number;
  title: string;
  thumbnail: {
    url: string;
    blurDataURL: string;
  };
  updateTime: string;
  videos: VideoData[];
  scores: ScoreData[];
}

export interface ChannelDataWithoutVideos extends Omit<ChannelData, "videos"> {}

export type HigherLowerGameMode = "GENERAL" | "RANK";

export interface Nicknames {
  [channelId: string]: string | undefined;
}
