import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from "firebase/firestore";

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
           <loc>${`${URL}/channel/${channelDoc.id}/game`}</loc>
       </url>
     `
       )
       .join("")}
   </urlset>
 `;
}

export async function GET() {
  const querySnapshot = (await getDocs(
    collection(db, "channels")
  )) as QuerySnapshot<ChannelData>;

  const sitemap = generateSiteMap(querySnapshot.docs);

  return new Response(sitemap, {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
