interface Nicknames {
  [channelId: string]: string | undefined;
}

interface ScoreData {
  userId: string;
  nickname: string;
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
  scoresSize: number;
  subscriberCount: number;
  tags: string[];
  thumbnail: {
    blurDataURL: string;
    url: string;
  };
  title: string;
  updateTime: string;
  videos: VideoData[];
}

type HomeTabsValue = "favorite" | "all" | "woowakgood";
type ChannelTabsValue = "ranking" | "setting";
