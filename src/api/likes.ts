export async function setLike(token: string, id: number) {
    const response = await fetch(
      `https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
  
  export async function setDislike(token: string, id: number) {
    const response = await fetch(
      `https://skypro-music-api.skyeng.tech/catalog/track/${id}/favorite/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
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