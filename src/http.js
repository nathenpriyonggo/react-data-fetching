export async function fetchAvailableplaces() {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) { // 400, 500
        throw new Error(`Failed to fetch places`);
    }

    return resData.places;
}