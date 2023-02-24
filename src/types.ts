export interface Video {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    blurDataURL: string;
  };
  viewCount: string;
}

export interface ChannelDocumentData {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    blurDataURL: string;
  };
}

export interface ChannelDocumentDataWithCollection extends ChannelDocumentData {
  videos: Video[];
}
