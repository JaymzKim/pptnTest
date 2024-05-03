"use server";

export async function fetchItems(api_url: string) {
    try {
        const response = await fetch(api_url);
        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;        
    }
}