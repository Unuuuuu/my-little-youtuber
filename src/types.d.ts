interface ScoreData {
  userId: string;
  score: number;
}

interface VideoData {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    blurDataURL: string;
  };
  viewCount: number;
}

interface ChannelData {
  id: string;
  scores: ScoreData[];
  subscriberCount: number;
  thumbnail: {
    blurDataURL: string;
    url: string;
  };
  title: string;
  updateTime: string;
  videos: VideoData[];
}
