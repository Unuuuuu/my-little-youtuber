export interface VideoData {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    blurDataURL: string;
  };
  viewCount: number;
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
}

export interface ChannelDataWithoutVideos extends Omit<ChannelData, "videos"> {}
