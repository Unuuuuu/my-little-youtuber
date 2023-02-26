export interface Video {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    blurDataURL: string;
  };
  viewCount: number;
}

export interface Channel {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    blurDataURL: string;
  };
  updateTime: string;
  videos: Video[];
}

export interface ChannelWithoutVideos extends Omit<Channel, "videos"> {}
