import { getPlaylist } from "@/api/tracks";

import CenterBlock from "@/components/CenterBlock/CenterBlock";

type CategoryType = {
  params: { id: string };
};

export default async function CategoryPage({ params }: CategoryType) {
  const tracksData = await getPlaylist(params.id);

  return <CenterBlock tracks={tracksData} playlist={tracksData} />;
}