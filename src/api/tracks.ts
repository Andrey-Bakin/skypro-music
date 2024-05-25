const baseUrl = "https://skypro-music-api.skyeng.tech/catalog";

export async function getTracks() {
    const response = await fetch(baseUrl + "/track/all/");
    
    if (!response.ok) {
        throw new Error("Ошибка получения данных");
    }

    return response.json();
}