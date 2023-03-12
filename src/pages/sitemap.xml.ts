import { ChannelData } from "@/types";
import { db } from "@/utils/firebase";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { GetServerSideProps } from "next";

const URL = "https://www.mylittleyoutuber.com";

function generateSiteMap(channelDocs: QueryDocumentSnapshot<ChannelData>[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${URL}</loc>
     </url>
     ${channelDocs
       .map(
         (channelDoc) => `
       <url>
           <loc>${`${URL}/channel/${channelDoc.id}`}</loc>
       </url>
       <url>
           <loc>${`${URL}/channel/${channelDoc.id}/higher-lower-game`}</loc>
       </url>
     `
       )
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const querySnapshot = (await getDocs(
    collection(db, "channels")
  )) as QuerySnapshot<ChannelData>;

  const sitemap = generateSiteMap(querySnapshot.docs);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default SiteMap;
