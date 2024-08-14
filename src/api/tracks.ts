export const baseUrl = "https://skypro-music-api.skyeng.tech/catalog";

export async function getTracks() {
    const response = await fetch(baseUrl + "/track/all/");
    
    if (!response.ok) {
        throw new Error("Ошибка получения данных");
    }

    const data = response.json();
    return data;
}

export async function getPlaylist(id: string) {
    const response = await fetch(baseUrl + "/selection/" + id);
  
    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }
  
    const data = response.json();
    return data;
  }

  export async function fetchFavoritesTracks(access: string) {
    const response = await fetch("https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
  
    if (response.status === 401) {
      throw new Error("Нет авторизации");
    } else if (response.status === 500) {
      throw new Error("Сервер не отвечает")
    }
    const data = response.json();
    return data;
  }