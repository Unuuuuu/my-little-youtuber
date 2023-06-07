// interface Nicknames {
//   [channelId: string]: string | undefined;
// }

// interface ScoreData {
//   userId: string;
//   nickname: string;
//   score: number;
// }

// interface VideoData {
//   id: string;
//   title: string;
//   thumbnail: {
//     url: string;
//     blurDataURL: string;
//   };
//   viewCount: number;
// }

// interface ChannelData {
//   id: string;
//   scoresSize: number;
//   subscriberCount: number;
//   thumbnail: {
//     blurDataURL: string;
//     url: string;
//   };
//   title: string;
//   updateTime: string;
//   videos: VideoData[];
// }

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
  tags?: string[];
  categoryId: string;
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

interface ChannelDataWithTotalPlayCount extends ChannelData {
  totalPlayCount: number;
  formattedTotalPlayCount: string;
}

interface ChannelDataForChannelPage
  extends Pick<
    ChannelData,
    "id" | "playCount" | "tags" | "thumbnail" | "title" | "updateDate"
  > {
  totalPlayCount: number;
  formattedTotalPlayCount: string;
}

interface ChannelDataForGamePage
  extends Pick<ChannelData, "id" | "title" | "videos" | "thumbnail"> {}

// interface Window {
//   adsbygoogle: { [key: string]: unknown }[];
// }
