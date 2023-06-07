interface ScoreData {
  nickname: string;
  score: number;
}

type TagType = "GENERAL" | "DETAIL" | "GROUP";

interface CommonTagData {
  type: TagType;
  id: string;
  label: string;
  priority: number;
  channelIds: string[];
}

interface GeneralTagData extends CommonTagData {
  type: "GENERAL";
}

interface DetailTagData extends CommonTagData {
  type: "DETAIL";
  generalTagId: string;
}

interface GroupTagData extends CommonTagData {
  type: "GROUP";
  generalTagId: string;
}

type TagData = GeneralTagData | DetailTagData | GroupTagData;

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
  thumbnail: {
    blurDataURL: string;
    url: string;
  };
  title: string;
  playCount: {
    general: number;
    timeAttack: number;
  };
  updateDate: string;
  videoCount: number;
  tags: TagData[];
  videos: VideoData[];
}

interface TotalPlayCount {
  totalPlayCount: number;
  formattedTotalPlayCount: string;
}

interface ChannelDataWithTotalPlayCount
  extends Omit<ChannelData, "videos">,
    TotalPlayCount {}

interface ChannelDataForChannelPage
  extends Pick<
      ChannelData,
      "id" | "playCount" | "tags" | "thumbnail" | "title" | "updateDate"
    >,
    TotalPlayCount {}

interface ChannelDataForGamePage
  extends Pick<ChannelData, "id" | "title" | "videos"> {}

interface ChannelDataForGamePage
  extends Pick<ChannelData, "id" | "title" | "videos" | "thumbnail"> {}

// interface Window {
//   adsbygoogle: { [key: string]: unknown }[];
// }

type GameMode = "GENERAL" | "TIME_ATTACK";
