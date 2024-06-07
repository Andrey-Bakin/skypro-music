import { TrackType } from "@/types";
import { getTracks } from "@/api/tracks";
import Main from "@/components/Main/Main";

export default async function Home() {
  const tracks: TrackType[] = await getTracks();

  return <Main tracks={tracks} />;
}
