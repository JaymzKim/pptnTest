"use server";

export async function fetchItems(page: number, sawonCode: number, filter: any) {
    try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/mobile/member-list?page=${page}&sawonCode=${sawonCode}&product_type=${filter.product_type}`);
        const data = await response.json();
        return data;
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;        
    }
}