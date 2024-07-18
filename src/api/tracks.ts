const baseUrl = "https://skypro-music-api.skyeng.tech/catalog";

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
  
    const data = await response.json();
    return data.items;
  }

  export async function fetchFavoritesTracks(token: string) {
    const response = await fetch(baseUrl + "/track/favorite/all/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
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