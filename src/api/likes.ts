type likeTrackType ={
  access: string | null,
  id: string
}

export async function setLike({access, id}: likeTrackType) {
    const response = await fetch(
      `https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        JSON.stringify({ status: response.status, text: response.statusText })
      );
    }
    const data = await response.json();
    return data;
  }
  
  export async function setDislike({access, id}: likeTrackType) {
    const response = await fetch(
      `https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        JSON.stringify({ status: response.status, text: response.statusText })
      );
    }
    const data = await response.json();
    return data;
  }