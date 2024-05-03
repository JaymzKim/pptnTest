"use server";

export async function ClientFetchItems(api_url: string) {
    try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}${api_url}`);
        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;        
    }
}