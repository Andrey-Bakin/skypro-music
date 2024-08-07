const baseUrl = "https://skypro-music-api.skyeng.tech/catalog";

export async function getTracks() {
    const response = await fetch(baseUrl + "/track/all/");
    
    if (!response.ok) {
        throw new Error("Ошибка получения данных");
    }

    return response.json();
}

export async function getPlaylist(id: string) {
    const response = await fetch(baseUrl + "/selection/" + id);
  
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
  
    const data = await response.json();
    return data.items;
  }