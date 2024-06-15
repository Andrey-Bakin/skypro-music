import { TrackType } from "@/types";
import { getTracks } from "@/api/tracks";
import Main from "@/components/Main/Main";

export default async function Home() {
  let tracks: TrackType[] = [];
  let error: string | null = null;
  try {
    tracks = await getTracks();
  } catch (err: unknown) {
    error = err instanceof Error ? "Ошибка при загрузке трека. "+ err.message : "Неизвестная ошибка"
  }  

    return <Main tracks={tracks} />;
  }
